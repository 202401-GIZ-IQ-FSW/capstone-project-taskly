const Contact = require('../../models/ContactUsModel');

const submitForm = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Basic validations
    if (!name || !email || !message) {
      return res
        .status(400)
        .json({ message: 'Name, email, and message are required fields' });
    }

    // Create a new contact instance
    const newContact = new Contact({
      name: name,
      email: email,
      message: message,
    });

    // Save the contact to the database
    await newContact.save();

    res.status(201).json({ message: 'Contact form submitted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

async function getAllMsgs(req, res) {
  try {
    const Msgs = await Contact.find();

    res.json(Msgs);
  } catch (error) {
    res
      .status(500)
      .json({
        error: 'An error occurred while getting the projects',
        message: error.message,
      });
  }
}

module.exports = { submitForm, getAllMsgs };
