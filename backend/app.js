const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const webhookRoutes = require('./src/routes/webhookRoutes');
const prRoutes = require('./src/routes/prRoutes');

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json()); // For parsing application/json
app.use(morgan('dev'));

// Routes
app.use('/webhook', webhookRoutes);
app.use('/api', prRoutes);

// Health check
app.get('/', (req, res) => {
  res.status(200).json({ message: 'AI Code Reviewer API is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

module.exports = app;
