// Import required modules
require("dotenv").config(); // Load environment variables from .env file
const express = require("express");
const cors = require("cors");
const { connectToMongoDB } = require("./database");

// Create Express application
const app = express();

// Middleware
app.use(cors()); // Enable CORS for all requests
app.use(express.json()); // Parse JSON request bodies

// Routes
const router = require("./routes");
app.use("/api", router); // Mount routes under /api base path

// Error handling middleware (must be defined after routes)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Port configuration
const port = process.env.PORT || 5000;

// Start server
async function startServer() {
  try {
    await connectToMongoDB(); // Connect to MongoDB
    app.listen(port, () => {
      console.log(`Server is listening on http://localhost:${port}`);
    });
  } catch (error) {
    console.error('Error starting server:', error);
  }
}

// Call startServer function to start the server
startServer();

