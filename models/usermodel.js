const mongoose = require("mongoose");

// Define the schema for storing user details
const userSchema = mongoose.Schema(
    {
        username: {
            type: String, // Stores the username as a string
            required: [true, "Please add the username"], // Ensures the username is provided
        },
        email: {
            type: String, // Stores the user's email as a string
            required: [true, "Please add the email address"], // Ensures the email is provided
            unique: true, // Ensures each email is unique in the database
        },
        password: {
            type: String, // Stores the hashed password as a string
            required: [true, "Please add the user password"], // Ensures the password is provided
        },
    },
    {
        timestamps: true, // Automatically adds createdAt and updatedAt timestamps
    }
);

// Export the user model for use in other parts of the application
module.exports = mongoose.model("User", userSchema);
