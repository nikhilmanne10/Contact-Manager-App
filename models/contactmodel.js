const mongoose = require("mongoose");

// Define the schema for storing contact details
const contactSchema = mongoose.Schema(
    {
        user_id: {
            type: mongoose.Schema.Types.ObjectId, // Reference to the user who owns this contact
            required: true, // Ensures a contact must belong to a user
            ref: "user", // Establishes a relationship with the "user" model
        },
        name: {
            type: String, // Contact's name as a string
            required: [true, "Please add the contact name"], // Validation to ensure the name is provided
        },
        email: {
            type: String, // Contact's email as a string
            required: [true, "Please add the contact email"], // Validation to ensure the email is provided
        },
        phone: {
            type: String, // Contact's phone number as a string
            required: [true, "Please add the contact phone"], // Validation to ensure the phone is provided
        },
    },
    {
        timestamps: true, // Automatically adds createdAt and updatedAt timestamps
    }
);

// Export the contact model for use in other parts of the application
module.exports = mongoose.model("Contact", contactSchema);
