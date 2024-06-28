const express = require('express');
const router = express.Router();
const verifyJWT = require('../../middleware/verifyJWT');

const contactsController = require('../../controllers/ContactUs/contactUsController');

router.post('/contact', contactsController.submitForm);
router.get('/contact', verifyJWT, contactsController.getAllMsgs);

module.exports = router;
