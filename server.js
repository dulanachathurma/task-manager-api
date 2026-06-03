// =============================================
//  server.js - Main Entry Point
//  SESA Mentorship - Task 04
// =============================================

const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware - parse incoming JSON
app.use(express.json());

// ---- Routes ----
app.use('/api/auth',  require('./routes/authRoutes'));
app.use('/api/tasks', require('./routes/taskRoutes'));

// Default route - just to check if server is running
app.get('/', (req, res) => {
  res.json({ message: 'Task Manager API is running!' });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: 'Server Error' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
