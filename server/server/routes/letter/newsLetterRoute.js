const express = require('express');
const router = express.Router();

const sendEmail = require('../../config/mailer');

const NewsLetter = require('../../models/newsLetterModel');

router.post('/send', async(req, res) => {
    const {email, subject, message} = req.body;

    try{
        // save the message into the database
        const newLetter = new NewsLetter ({email, subject, message});
        await newRequest.save();

        //send the information to us as developers
        const adminEmail = process.env.USER;
        const userSubject = `Newsletter Request: ${subject}`;
        const userMessage = `From: ${email}\n\nMessage:\n${message}`;

        await sendEmail(adminEmail, userSubject, userMessage);

        res.status(200).send('Newsletter request sent successfully');
    }
    catch (error) {
        res.status(500).send('Error handling newsletter request');
      }
});

module.exports = router;