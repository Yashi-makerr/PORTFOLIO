const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const messageRoutes = require('./routes/messageRoutes');
const projectRoutes = require('./routes/projectRoutes');

const app = express();
const PORT = 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Database connect
connectDB();

// Test route
app.get('/', (req, res) => {
  res.send('Portfolio backend running ✅');
});

// Routes
app.use('/api/messages', messageRoutes);
app.use('/api/projects', projectRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
