const express = require('express');
const router = express.Router();
const { createContact, getContacts } = require('../controllers/contactController');
const { protectAdmin } = require('../middleware/authMiddleware');

router.route('/')
  .post(createContact)
  .get(protectAdmin, getContacts);

module.exports = router;
