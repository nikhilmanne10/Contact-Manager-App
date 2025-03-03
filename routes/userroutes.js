const express = require("express");
const { register, login, current } = require("../controllers/usercontroller");
const validateToken = require("../middleware/validatetokenhandler"); // ✅ Middleware to protect routes

const route = express.Router(); // ✅ Create an instance of an Express router

// Route to register a new user
// @route   POST /api/users/register
// @access  Public
route.post("/register", register);

// Route to log in an existing user
// @route   POST /api/users/login
// @access  Public
route.post("/login", login);

// Route to get current logged-in user details
// @route   GET /api/users/current
// @access  Private (Requires Authentication)
route.get("/current", validateToken, current); // ✅ Uses validateToken to protect the route

module.exports = route; // ✅ Export the router for use in other parts of the application
