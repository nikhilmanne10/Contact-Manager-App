const express = require("express");
const router = express.Router();

const {
    getContacts,
    createContact,
    getContact,
    updateContact,
    deleteContact
} = require("../controllers/contactcontroller");  
const validatetoken = require("../middleware/validatetokenhandler");

router.use(validatetoken);
router.get("/", getContacts);       // Get all contacts
router.post("/", createContact);    // Create a new contact
router.get("/:id", getContact);     // Get a specific contact by ID
router.put("/:id", updateContact);  // Update a contact
router.delete("/:id", deleteContact); // Delete a contact

module.exports = router;
