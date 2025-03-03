const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/usermodel");

// @desc    Register a user
// @route   POST /api/auth/register
// @access  Public
const register = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;

    // Ensure all required fields are provided
    if (!username || !email || !password) {
        res.status(400);
        throw new Error("All fields are mandatory!");
    }

    // Check if a user with the same email already exists
    const userAvailable = await User.findOne({ email });
    if (userAvailable) {
        res.status(400);
        throw new Error("User already registered");
    }

    // Hash the user's password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Hashed Password:", hashedPassword);

    // Create a new user with the provided data
    const newUser = await User.create({
        username,
        email,
        password: hashedPassword, // Store the hashed password
    });

    console.log(`User created: ${newUser}`);

    // Respond with the new user's ID and email if created successfully
    if (newUser) {
        res.status(201).json({ _id: newUser.id, email: newUser.email });
    } else {
        res.status(400);
        throw new Error("User data is not valid");
    }
});

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
const login = asyncHandler(async (req, res) => {
    console.log("Login route hit"); // Debugging log to track login attempts

    const { email, password } = req.body;

    // Ensure email and password are provided
    if (!email || !password) {
        console.log("Missing fields");
        res.status(400);
        throw new Error("All fields are mandatory!");
    }

    // Find user by email in the database
    const user = await User.findOne({ email });

    // Check if the user exists
    if (!user) {
        console.log("User not found");
        res.status(401);
        throw new Error("Email or password is not valid");
    }

    // Compare the provided password with the hashed password stored in the database
    const passwordMatch = await bcrypt.compare(password, user.password);
    console.log("Password match:", passwordMatch); // Debugging log for password check

    // If password matches, generate and send an access token
    if (passwordMatch) {
        const accessToken = jwt.sign(
            { user: { username: user.username, email: user.email, id: user.id } }, // Payload data
            process.env.ACCESS_TOKEN_SECRET, // Secret key from environment variables
            { expiresIn: "15m" } // Token expiry time
        );
        console.log("Generated token:", accessToken); // Debugging log for token generation
        res.status(200).json({ accessToken });
    } else {
        console.log("Incorrect password");
        res.status(401);
        throw new Error("Email or password is not valid");
    }
});

// @desc    Get current user info
// @route   GET /api/auth/current
// @access  Private
const current = asyncHandler(async (req, res) => {
    // Return user data from the request (set by authentication middleware)
    res.json(req.user);
});

// ✅ Export all functions for use in routes
module.exports = {
    register,
    login,
    current
};
