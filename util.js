const nodemailer = require('nodemailer');
require('dotenv').config();


/*
function to send the email  
*/
exports.sendEmailFunction = (url,email) => {
    console.log(process.env.USERNAME,process.env.PASSWORD)
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD

        },
    });
    const mailOptions = {
        from: "FUNDOO HELP",
        to: email,
        subject: 'Fundoo password reset link ',
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