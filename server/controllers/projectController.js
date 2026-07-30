const { pool } = require('../config/db');
const fs = require('fs');
const path = require('path');

const OFFLINE_FILE = path.join(__dirname, '../config/projects_offline.json');

// Ensure config directory exists
const configDir = path.join(__dirname, '../config');
if (!fs.existsSync(configDir)) {
  fs.mkdirSync(configDir, { recursive: true });
}

// Helper to get offline projects
const getOfflineProjects = () => {
  if (!fs.existsSync(OFFLINE_FILE)) {
    const defaults = [
      {
        _id: 'offline_1',
        title: 'AI Interview System',
        technologies: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Firebase'],
        description: 'AI-powered interview preparation platform with authentication, AI-generated interview questions, dashboard, and responsive design.',
        github: 'https://github.com/shubhamverma20/ai-interview-system',
        liveDemo: 'https://ai-interview-prep-system.vercel.app',
        image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=600'
      },
      {
        _id: 'offline_2',
        title: 'FreshCart',
        technologies: ['HTML', 'CSS', 'JavaScript'],
        description: 'Responsive e-commerce shopping website with clean UI.',
        github: 'https://github.com/shubhamverma20/FreshCart',
        liveDemo: 'https://freshcart-grocery-delivery.vercel.app/',
        image: 'https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=600'
      },
      {
        _id: 'offline_3',
        title: 'Amul Kool Website',
        technologies: ['HTML', 'CSS', 'JavaScript'],
        description: 'Modern landing page with responsive design.',
        github: 'https://github.com/shubhamverma20/amul-kool-rose-website',
        liveDemo: 'https://amul-kool-rose-website-chi.vercel.app/',
        image: 'https://images.unsplash.com/photo-1563227812-0ea4c22e6cc8?q=80&w=600'
      },
      {
        _id: 'offline_4',
        title: 'Fake Headline Generator',
        technologies: ['Python'],
        description: 'Python application that generates random funny headlines.',
        github: 'https://github.com/shubhamverma20/fake-headline-generator',
        liveDemo: '',
        image: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=600'
      },
      {
        _id: 'offline_5',
        title: 'Hotel Menu Project',
        technologies: ['Python'],
        description: 'Console-based Hotel Billing and Menu Management System.',
        github: 'https://github.com/shubhamverma20/hotel-menu',
        liveDemo: '',
        image: 'https://images.unsplash.com/photo-1543007630-9710e4a00a20?q=80&w=600'
      }
    ];
    fs.writeFileSync(OFFLINE_FILE, JSON.stringify(defaults, null, 2));
    return defaults;
  }
  try {
    return JSON.parse(fs.readFileSync(OFFLINE_FILE, 'utf-8'));
  } catch (e) {
    return [];
  }
};

const saveOfflineProjects = (projects) => {
  fs.writeFileSync(OFFLINE_FILE, JSON.stringify(projects, null, 2));
};

// PostgreSQL query wrapper with automatic offline fallback trigger
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

// @desc    Get all projects
// @route   GET /api/projects
// @access  Public
const getProjects = async (req, res) => {
  try {
    const dbRes = await runQuery('SELECT * FROM projects ORDER BY created_at DESC');
    
    if (dbRes.offline) {
      const projects = getOfflineProjects();
      return res.status(200).json({ success: true, count: projects.length, data: projects, offline: true });
    }

    const mappedProjects = dbRes.rows.map(row => ({
      _id: row.id,
      title: row.title,
      description: row.description,
      technologies: row.technologies,
      github: row.github || '',
      liveDemo: row.live_demo || '',
      image: row.image || '',
      createdAt: row.created_at
    }));

    res.status(200).json({ success: true, count: mappedProjects.length, data: mappedProjects });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create a project
// @route   POST /api/projects
// @access  Private/Admin
const createProject = async (req, res) => {
  try {
    const { title, description, technologies, github, liveDemo, image } = req.body;

    if (!title || !description || !technologies) {
      return res.status(400).json({ success: false, message: 'Please provide title, description, and technologies' });
    }

    const techArray = Array.isArray(technologies) 
      ? technologies 
      : technologies.split(',').map(tech => tech.trim()).filter(Boolean);

    const dbRes = await runQuery(
      'SELECT 1 FROM projects LIMIT 1'
    );

    if (dbRes.offline) {
      const projects = getOfflineProjects();
      const newProj = {
        _id: 'offline_' + Date.now(),
        title,
        description,
        technologies: techArray,
        github: github || '',
        liveDemo: liveDemo || '',
        image: image || '',
        createdAt: new Date().toISOString()
      };
      projects.unshift(newProj);
      saveOfflineProjects(projects);
      return res.status(201).json({ success: true, data: newProj, offline: true });
    }

    const insertRes = await pool.query(
      'INSERT INTO projects (title, description, technologies, github, live_demo, image) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [title, description, techArray, github || '', liveDemo || '', image || '']
    );

    const created = insertRes.rows[0];
    res.status(201).json({
      success: true,
      data: {
        _id: created.id,
        title: created.title,
        description: created.description,
        technologies: created.technologies,
        github: created.github,
        liveDemo: created.live_demo,
        image: created.image,
        createdAt: created.created_at
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update a project
// @route   PUT /api/projects/:id
// @access  Private/Admin
const updateProject = async (req, res) => {
  try {
    const { title, description, technologies, github, liveDemo, image } = req.body;
    const isOfflineId = req.params.id.startsWith('offline_');

    if (isOfflineId) {
      const projects = getOfflineProjects();
      const idx = projects.findIndex(p => p._id === req.params.id);
      if (idx === -1) {
        return res.status(404).json({ success: false, message: 'Project not found' });
      }
      
      const techArray = technologies !== undefined 
        ? (Array.isArray(technologies) ? technologies : technologies.split(',').map(t => t.trim()).filter(Boolean))
        : projects[idx].technologies;

      const updated = {
        ...projects[idx],
        title: title !== undefined ? title : projects[idx].title,
        description: description !== undefined ? description : projects[idx].description,
        technologies: techArray,
        github: github !== undefined ? github : projects[idx].github,
        liveDemo: liveDemo !== undefined ? liveDemo : projects[idx].liveDemo,
        image: image !== undefined ? image : projects[idx].image,
        updatedAt: new Date().toISOString()
      };
      
      projects[idx] = updated;
      saveOfflineProjects(projects);
      return res.status(200).json({ success: true, data: updated, offline: true });
    }

    // Live SQL update
    const projRes = await pool.query('SELECT * FROM projects WHERE id = $1', [req.params.id]);
    if (projRes.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }

    const current = projRes.rows[0];
    const techArray = technologies !== undefined 
      ? (Array.isArray(technologies) ? technologies : technologies.split(',').map(tech => tech.trim()).filter(Boolean))
      : current.technologies;

    const updateRes = await pool.query(
      'UPDATE projects SET title = $1, description = $2, technologies = $3, github = $4, live_demo = $5, image = $6 WHERE id = $7 RETURNING *',
      [
        title !== undefined ? title : current.title,
        description !== undefined ? description : current.description,
        techArray,
        github !== undefined ? github : current.github,
        liveDemo !== undefined ? liveDemo : current.live_demo,
        image !== undefined ? image : current.image,
        req.params.id
      ]
    );

    const updated = updateRes.rows[0];
    res.status(200).json({
      success: true,
      data: {
        _id: updated.id,
        title: updated.title,
        description: updated.description,
        technologies: updated.technologies,
        github: updated.github,
        liveDemo: updated.live_demo,
        image: updated.image,
        createdAt: updated.created_at
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete a project
// @route   DELETE /api/projects/:id
// @access  Private/Admin
const deleteProject = async (req, res) => {
  try {
    const isOfflineId = req.params.id.startsWith('offline_');

    if (isOfflineId) {
      let projects = getOfflineProjects();
      const idx = projects.findIndex(p => p._id === req.params.id);
      if (idx === -1) {
        return res.status(404).json({ success: false, message: 'Project not found' });
      }
      projects.splice(idx, 1);
      saveOfflineProjects(projects);
      return res.status(200).json({ success: true, message: 'Project removed successfully (offline)' });
    }

    const projRes = await pool.query('SELECT 1 FROM projects WHERE id = $1', [req.params.id]);
    if (projRes.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }

    await pool.query('DELETE FROM projects WHERE id = $1', [req.params.id]);
    res.status(200).json({ success: true, message: 'Project removed successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getProjects,
  createProject,
  updateProject,
  deleteProject
};
