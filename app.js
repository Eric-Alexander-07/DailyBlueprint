// app.js

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors'); // Import CORS middleware
const userRoutes = require('./routes/userRoutes'); // Adjust path as per your project structure

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors()); // Use CORS middleware to handle Cross-Origin Resource Sharing
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/api/users', userRoutes);

// Error handling middleware (optional but recommended)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
