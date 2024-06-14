const { sendMail } = require('./mail.service');

const EMAIL_VERIFICATION_TEMPLATE = (link) => {
    return `
    <!DOCTYPE html>
    <html>

    <head>
        <meta charset="utf-8">
        <title>NodeMailer Email Template</title>
        <style>
            .container {
                width: 100%;
                height: 100%;
                padding: 20px;
                background-color: #f4f4f4;
            }

            .email {
                width: 80%;
                margin: 0 auto;
                background-color: #fff;
                padding: 5px 20px;
                border-top: 2px solid #333;
            }

            .confirm-btn {
                background-color: #98C0D9;
                padding: 10px 36px;
                border-radius: 30px;
                border-width: 1px;
                text-decoration: none;
                text-align: center;
                border: 1px solid #98C0D9;
                cursor: pointer;
                display: inline-block
            }
        </style>
    </head>

    <body>
        <div class="container">
            <div class="email">
                <h4>Dear Customer,</h4>
                <p>Thank you for registering your account at Digital Mart. Please click the button below to complete
                    your account registration:</p>
                <a class="confirm-btn" href="${link}">CONFIRM MY EMAIL</a>
                <p>Please do not share this email to anyone!</p>
                <p>Wish you have the best time to enjoy shopping.</p>
                <p>Best regard,</p>
                <p>DigitalMart Administrator.</p>
            </div>
        </div>
    </body>

    </html>
  `
}

const sendVerificationRequest = async (emailAddress, token) => {
    await sendMail(
        {
            from: "phutanle372@gmail.com",
            to: emailAddress,
            subject: "[Digital Mart] Account registration confirmation",
            html: EMAIL_VERIFICATION_TEMPLATE(`http://localhost:8000/api/user/verify/${token}`)
        }, (info) => {
            console.log("Email sent successfully!!!");
            console.log("Message ID: ", info.messageId);
        })
}

module.exports = {
    sendVerificationRequest
}