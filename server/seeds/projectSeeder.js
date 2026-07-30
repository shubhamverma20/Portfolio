const { pool } = require('../config/db');

const defaultProjects = [

  {
    title: 'FreshCart',
    technologies: ['HTML', 'CSS', 'JavaScript'],
    description: 'Responsive e-commerce shopping website with clean UI.',
    github: 'https://github.com/shubhamverma20/FreshCart',
    liveDemo: 'https://freshcart-grocery-delivery.vercel.app/',
    image: 'https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=600'
  },
  {
    title: 'Amul Kool Website',
    technologies: ['HTML', 'CSS', 'JavaScript'],
    description: 'Modern landing page with responsive design.',
    github: 'https://github.com/shubhamverma20/amul-kool-rose-website',
    liveDemo: 'https://amul-kool-rose-website-chi.vercel.app/',
    image: 'https://images.unsplash.com/photo-1563227812-0ea4c22e6cc8?q=80&w=600'
  },
  {
    title: 'Fake Headline Generator',
    technologies: ['Python'],
    description: 'Python application that generates random funny headlines.',
    github: 'https://github.com/shubhamverma20/fake-headline-generator',
    liveDemo: '',
    image: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=600'
  },
  {
    title: 'Hotel Menu Project',
    technologies: ['Python'],
    description: 'Console-based Hotel Billing and Menu Management System.',
    github: 'https://github.com/shubhamverma20/hotel-menu',
    liveDemo: '',
    image: 'https://images.unsplash.com/photo-1543007630-9710e4a00a20?q=80&w=600'
  }
];

const seedProjects = async () => {
  try {
    // 1. Create Projects and Contacts Tables if they don't exist
    await pool.query(`
      CREATE TABLE IF NOT EXISTS projects (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        technologies TEXT[] NOT NULL,
        github VARCHAR(255),
        live_demo VARCHAR(255),
        image TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS contacts (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        subject VARCHAR(255) NOT NULL,
        message TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Clean up any existing AI Interview System projects
    await pool.query("DELETE FROM projects WHERE title = 'AI Interview System'");

    // 2. Check if table is empty
    const res = await pool.query('SELECT COUNT(*) FROM projects');
    const count = parseInt(res.rows[0].count, 10);

    if (count === 0) {
      console.log('PostgreSQL projects table is empty. Seeding default projects...');
      for (const p of defaultProjects) {
        await pool.query(
          'INSERT INTO projects (title, description, technologies, github, live_demo, image) VALUES ($1, $2, $3, $4, $5, $6)',
          [p.title, p.description, p.technologies, p.github, p.liveDemo, p.image]
        );
      }
      console.log('PostgreSQL database successfully seeded!');
    } else {
      console.log('PostgreSQL database already initialized.');
    }
  } catch (error) {
    console.error(`PostgreSQL seeding bypassed/failed: ${error.message}`);
  }
};

module.exports = seedProjects;
