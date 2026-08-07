require('dotenv').config({ path: __dirname + '/.env' });
const { pool } = require('./config/db');

async function revertTaskSync() {
  try {
    const title = 'TaskSync - Full Stack Task Management Application';
    const liveDemo = 'https://task-mangement-project.vercel.app';

    await pool.query(
      'UPDATE projects SET live_demo = $1 WHERE title = $2',
      [liveDemo, title]
    );
    console.log('Project URL reverted!');
  } catch (err) {
    console.error('Error reverting project:', err);
  } finally {
    process.exit(0);
  }
}

revertTaskSync();
