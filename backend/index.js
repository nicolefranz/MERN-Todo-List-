// Import required modules
require("dotenv").config(); // Load environment variables from .env file
const cors = require('cors');
const express = require("express");
const { connectToMongoDB } = require("./database");
const path = require("path");

// Create Express application
const app = express();

// Configure CORS
const allowedOrigins = process.env.FRONTEND_URL || 'http://localhost:3000';
const corsOptions = {
  origin: allowedOrigins,
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "build")));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "build/index.html"));
})

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
