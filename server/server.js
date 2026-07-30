const dotenv = require('dotenv');
// Load environment variables
dotenv.config();

const express = require('express');
const cors = require('cors');
const { connectDB } = require('./config/db');
const seedProjects = require('./seeds/projectSeeder');

// Connect to PostgreSQL Database
connectDB().then(() => {
  // Seed initial projects
  seedProjects();
});

const app = express();

// Middlewares
app.use(cors({
  origin: '*', // In production, replace with actual frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// API Routes
app.use('/api/projects', require('./routes/projectRoutes'));
app.use('/api/contact', require('./routes/contactRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));

// Root Endpoint
app.get('/', (req, res) => {
  res.status(200).json({ 
    message: "Welcome to Shubham Kumar's Portfolio API", 
    status: "Healthy", 
    timestamp: new Date() 
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    success: false,
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
