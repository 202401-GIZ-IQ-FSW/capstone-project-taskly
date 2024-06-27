const express = require('express');
   const router = express.Router();
   const contactsController = require('../../controllers/ContactUs/contactUsController');

   router.post('/contact', contactsController.submitForm);

   module.exports = router;