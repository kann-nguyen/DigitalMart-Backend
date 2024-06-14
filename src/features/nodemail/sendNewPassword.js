const { sendMail } = require("./mail.service");

const EMAIL_NEW_PASSWORD = (newPassword) => {
    return `
        <!DOCTYPE html>
        <html lang="en">

        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>

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
            </style>
        </head>

        <body>
            <div class="container">
                <div class="email">
                    <p>This is your new password: ${newPassword}</p>
                    <p>Please do not share this email to anyone!</p>
                </div>
            </div>
        </body>

        </html>
    `
}

const sendNewPassword = async (emailAddress, newPassword) => {
    await sendMail(
        {
            from: "phutanle372@gmail.com",
            to: emailAddress,
            subject: `[NEW PASSWORD]`,
            html: EMAIL_NEW_PASSWORD(newPassword)
        },
        (info) => {
            console.log("Email sent successfully!!!");
            console.log("Message ID: ", info.messageId);
        }
    )
}

module.exports = {
    sendNewPassword
}