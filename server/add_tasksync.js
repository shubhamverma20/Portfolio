require('dotenv').config({ path: __dirname + '/.env' });
const { pool } = require('./config/db');

async function addTaskSync() {
  try {
    const title = 'TaskSync - Full Stack Task Management Application';
    const description = 'A modern Full Stack Task Management Application built with the MERN Stack.';
    const technologies = ['MongoDB', 'Express.js', 'React', 'Node.js'];
    const github = 'https://github.com/shubhamverma20/Task-mangement-project';
    const liveDemo = 'https://task-management-project.vercel.app';
    const image = 'https://images.unsplash.com/photo-1542621334-a254cf47733d?q=80&w=600';

    const check = await pool.query('SELECT * FROM projects WHERE title = $1', [title]);

    if (check.rows.length > 0) {
      console.log('Project exists. Updating URLs...');
      await pool.query(
        'UPDATE projects SET github = $1, live_demo = $2 WHERE title = $3',
        [github, liveDemo, title]
      );
      console.log('Project updated!');
    } else {
      console.log('Inserting new project...');
      await pool.query(
        'INSERT INTO projects (title, description, technologies, github, live_demo, image) VALUES ($1, $2, $3, $4, $5, $6)',
        [title, description, technologies, github, liveDemo, image]
      );
      console.log('Project added!');
    }
  } catch (err) {
    console.error('Error adding project:', err);
  } finally {
    process.exit(0);
  }
}

addTaskSync();
