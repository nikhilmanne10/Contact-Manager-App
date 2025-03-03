const express = require("express");
const dotenv = require("dotenv").config();
const errorhandler = require("./middleware/errorhandler");
const connectdb = require("./config/dbconnection");
const app = express();

// Connect to MongoDB database
connectdb();

// Ensure dotenv successfully loaded the .env file
if (dotenv.error) {
    console.error("Error loading .env file", dotenv.error);
    process.exit(1);
}

// Read the port from the environment variable or default to 5000
const Port = process.env.PORT || 5000;  

// Log the Port to make sure it's being read correctly
console.log(`Server will run on port: ${Port}`);

// Middleware to parse JSON request bodies
app.use(express.json());  

// Routes for handling contacts-related requests
app.use("/api/contacts", require("./routes/contactroutes"));

// Routes for handling user authentication and management
app.use("/api/users", require("./routes/userroutes"));

// Custom error handler middleware
app.use(errorhandler); 

// Start the server and listen on the specified port
app.listen(Port, () => {
    console.log(`Server is running on port ${Port}`);
});

// Confirmation that routes have been successfully loaded
console.log("Routes loaded successfully");
