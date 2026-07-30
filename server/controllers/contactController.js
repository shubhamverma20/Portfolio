const { pool } = require('../config/db');
const fs = require('fs');
const path = require('path');

const OFFLINE_CONTACTS = path.join(__dirname, '../config/contacts_offline.json');

// Helper to get offline contacts
const getOfflineContacts = () => {
  if (!fs.existsSync(OFFLINE_CONTACTS)) {
    return [];
  }
  try {
    return JSON.parse(fs.readFileSync(OFFLINE_CONTACTS, 'utf-8'));
  } catch (e) {
    return [];
  }
};

const saveOfflineContact = (contact) => {
  const contacts = getOfflineContacts();
  contacts.unshift(contact);
  fs.writeFileSync(OFFLINE_CONTACTS, JSON.stringify(contacts, null, 2));
};

// SQL query runner with offline detection
const runQuery = async (queryText, params) => {
  try {
    const res = await pool.query(queryText, params);
    return { success: true, rows: res.rows };
  } catch (error) {
    const connectionErrorCodes = ['ECONNREFUSED', 'ENOTFOUND', 'ETIMEDOUT', '28P01', '3D000'];
    if (
      connectionErrorCodes.includes(error.code) || 
      error.message.includes('connect') || 
      error.message.includes('pool') ||
      error.message.includes('SSL')
    ) {
      return { success: false, offline: true, error };
    }
    throw error;
  }
};

// @desc    Submit a contact form
// @route   POST /api/contact
// @access  Public
const createContact = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ success: false, message: 'Please provide name, email, subject, and message' });
    }

    const dbRes = await runQuery('SELECT 1 FROM contacts LIMIT 1');

    if (dbRes.offline) {
      const newContact = {
        _id: 'offline_contact_' + Date.now(),
        name,
        email,
        subject,
        message,
        createdAt: new Date().toISOString(),
        offline: true
      };
      saveOfflineContact(newContact);
      return res.status(201).json({ 
        success: true, 
        message: 'Message sent successfully! (Saved to offline database)',
        data: newContact 
      });
    }

    const insertRes = await pool.query(
      'INSERT INTO contacts (name, email, subject, message) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, email, subject, message]
    );

    const created = insertRes.rows[0];
    res.status(201).json({ 
      success: true, 
      message: 'Message sent successfully! We will get back to you soon.',
      data: {
        _id: created.id,
        name: created.name,
        email: created.email,
        subject: created.subject,
        message: created.message,
        createdAt: created.created_at
      } 
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get all contact messages
// @route   GET /api/contact
// @access  Private/Admin
const getContacts = async (req, res) => {
  try {
    const dbRes = await runQuery('SELECT * FROM contacts ORDER BY created_at DESC');

    if (dbRes.offline) {
      const contacts = getOfflineContacts();
      return res.status(200).json({ success: true, count: contacts.length, data: contacts, offline: true });
    }

    const mappedContacts = dbRes.rows.map(row => ({
      _id: row.id,
      name: row.name,
      email: row.email,
      subject: row.subject,
      message: row.message,
      createdAt: row.created_at
    }));

    res.status(200).json({ success: true, count: mappedContacts.length, data: mappedContacts });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createContact,
  getContacts
};
