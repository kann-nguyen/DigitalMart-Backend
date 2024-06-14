const nodemailer = require('nodemailer');
const config = require('../../configs/config');

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "tann3946@gmail.com",
    pass: config.email.appPassword
  },
})

const sendMail = async (mailDetails, callback) => {
  try {
    const info = await transporter.sendMail(mailDetails)
    callback(info)
  }
  catch (error) {
    console.log(error);
  }
}

module.exports = {
  sendMail
}
