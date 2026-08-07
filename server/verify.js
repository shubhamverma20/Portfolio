require('dotenv').config({ path: __dirname + '/.env' });
process.env.NODE_ENV = 'production';

const { pool } = require('./config/db');

async function checkProjects() {
  try {
    const res = await pool.query('SELECT id, title FROM projects');
    console.log('Projects in DB:');
    res.rows.forEach(r => console.log(`- ${r.id}: ${r.title}`));
  } catch (err) {
    console.error(err);
  } finally {
    process.exit(0);
  }
}
checkProjects();
