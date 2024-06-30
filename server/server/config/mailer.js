const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.USER,
        pass: process.env.PASSWORD,
    },
});

const sendEmail = (to, subject, text) => {
    const info = {
        from: process.env.USER,
        to,
        subject,
        text,
    };
    return transporter.sendMail(info); 
};

module.exports = sendEmail;
