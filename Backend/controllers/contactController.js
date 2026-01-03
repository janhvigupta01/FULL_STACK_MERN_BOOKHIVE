import Contact from "../models/Contact.js";

// POST: Submit contact form
export const submitContact = async (req, res) => {
  try {
    console.log("BODY:", req.body);
    const { firstName, lastName, email, phone, message } = req.body;

    // Basic validation
    if (!firstName || !lastName || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "All required fields must be filled",
      });
    }

    const contact = await Contact.create({
      firstName,
      lastName,
      email,
      phone,
      message,
    });

    res.status(201).json({
      success: true,
      message: "Contact form submitted successfully",
      data: contact,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error while submitting contact form",
      error: error.message,
    });
  }
};

// GET: Fetch all contact messages (Admin use)
export const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      total: contacts.length,
      data: contacts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch contacts",
      error: error.message,
    });
  }
};
