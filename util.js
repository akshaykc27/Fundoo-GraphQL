const nodemailer = require('nodemailer');
require('dotenv').config();


/*
function to send the email  
*/
exports.sendEmailFunction = (url,email) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.USERNAME,
            pass: process.env.PASSWORD
        },
    });
    const mailOptions = {
        from: process.env.USERNAME,
        to: email,
        subject: 'Chat-app password reset link ',
        text: 'Click on the link provided to reset your password:\n\n' + url
    };
    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.log("Invalid username or password");
            console.log("ERROR: while sending the mail", err)
        }
        else
            console.log('Information regarding the mail sent', info);
    });
}