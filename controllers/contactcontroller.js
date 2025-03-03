const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactmodel");

//@desc Get all contacts
//@route GET /api/contacts
//@access Public
const getContacts = asyncHandler(async (req, res) => {
    // Fetch all contacts associated with the logged-in user
    const contacts = await Contact.find({ user_id: req.user.id });

    // Respond with the retrieved contacts
    res.status(200).json({ contacts });
});

//@desc Create a new contact
//@route POST /api/contacts
//@access Private
const createContact = asyncHandler(async (req, res) => {
    console.log("The request body is ", req.body);
    const { name, email, phone } = req.body;

    // Ensure all required fields are provided
    if (!name || !email || !phone) {
        res.status(400);
        throw new Error("All fields are mandatory");
    }

    // Create a new contact with the provided details
    const newContact = await Contact.create({
        name,
        email,
        phone,
        user_id: req.user.id // Associate the contact with the logged-in user
    });

    // Respond with the created contact
    res.status(201).json(newContact);
});

//@desc Get a single contact by ID
//@route GET /api/contacts/:id
//@access Private
const getContact = asyncHandler(async (req, res) => {
    // Find the contact by its ID, excluding the "__v" field
    const contact = await Contact.findById(req.params.id).select("-__v"); 

    // Check if the contact exists
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }

    // Respond with the retrieved contact
    res.status(200).json(contact);
});

//@desc Update a contact by ID
//@route PUT /api/contacts/:id
//@access Private
const updateContact = asyncHandler(async (req, res) => {
    // Find the contact by ID
    const contactData = await Contact.findById(req.params.id);

    // Check if the contact exists
    if (!contactData) {
        res.status(404);
        throw new Error("Contact not found");
    }

    // Ensure the logged-in user is authorized to update the contact
    if (contact.user_id.toString() !== req.user_id) {
        res.status(403);
        throw new Error("User does not have permission to update other users' contacts");
    }

    // Update the contact and return the updated contact
    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true } // Return the updated contact
    );

    // Respond with the updated contact
    res.status(200).json(updatedContact);
});

//@desc Delete a contact by ID
//@route DELETE /api/contacts/:id
//@access Private
const deleteContact = asyncHandler(async (req, res) => {
    // Find the contact by ID
    const contactData = await Contact.findById(req.params.id);

    // Check if the contact exists
    if (!contactData) {
        res.status(404);
        throw new Error("Contact not found");
    }

    // Ensure the logged-in user is authorized to delete the contact
    if (contact.user_id.toString() !== req.user_id) {
        res.status(403);
        throw new Error("User does not have permission to delete other users' contacts");
    }

    // Delete the contact from the database
    await Contact.deleteOne({ _id: req.params.id });

    // Respond with a success message
    res.status(200).json({ message: `Deleted contact with ID: ${req.params.id}` });
});

// ✅ Correctly export all functions for use in routes
module.exports = {
    getContacts,
    createContact,
    getContact,
    updateContact,
    deleteContact,
};
