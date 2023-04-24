const nodemailer = require('nodemailer');
require("dotenv").config()

const createTransport = () => {
    const transporter = nodemailer.createTransport(process.env.SMTP);

    return transporter
}

module.exports = { 
    createTransport
}