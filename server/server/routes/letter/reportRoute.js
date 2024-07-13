const express = require('express');
const router = express.Router();

const sendEmail = require('../../config/mailer');

const Report = require('../../models/reportModel');

router.post('/send', async(req, res) => {
    const { email, subject, message } = req.body;

    try {
        // Save the report into the database
        const newReport = new Report({ email, subject, message });
        await newReport.save();

        // Send the information to the developers
        const adminEmail = process.env.USER;
        const userSubject = `Report: ${subject}`;
        const userMessage = `From: ${email}\n\nMessage:\n${message}`;

        await sendEmail(adminEmail, userSubject, userMessage);

        res.status(200).send('Report sent successfully');
    } catch (error) {
        res.status(500).send('Error handling report');
    }
});

module.exports = router;
