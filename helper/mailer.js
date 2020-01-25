const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'bintangmaulanahabib@gmail.com',
        pass: 'lhbhvhcaxeqlxwsh'
    }
});




module.exports = {
    transporter
}