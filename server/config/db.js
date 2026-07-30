const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.PG_URI || 'postgresql://postgres:admin123@localhost:5432/portfolio',
  // Enable SSL in production (required for hosting services like Render)
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

const connectDB = async () => {
  try {
    const client = await pool.connect();
    console.log('PostgreSQL Connected Successfully!');
    client.release();
    return true;
  } catch (error) {
    console.error(`PostgreSQL Connection Error: ${error.message}`);
    console.log('Server is running in OFFLINE database mode.');
    return false;
  }
};

module.exports = {
  pool,
  connectDB
};
