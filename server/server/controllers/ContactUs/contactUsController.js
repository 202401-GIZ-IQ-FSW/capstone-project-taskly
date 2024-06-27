const Contact = require('../../models/ContactUsModel');

   exports.submitForm = async (req, res) => {
       try {
           const { name, email, message } = req.body;

           // Basic validations
           if (!name || !email || !message) {
               return res.status(400).json({ message: 'Name, email, and message are required fields' });
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
   