const nodemailer = require("nodemailer");
const emailUser = process.env.EMAIL_USER;
const emailPassword = process.env.EMAIL_PASSOWORD;

const transporter = nodemailer.createTransport({
  host: "mail.chaiyopaiyo.com",
  port: 465,
  secure: true,
  auth: {
    user: emailUser,
    pass: emailPassword,
  },
});

async function mailSender(recepients, subject, message) {
  const info = await transporter.sendMail({
    from: emailUser,
    to: recepients,
    subject: subject,
    text: message,
    // html: "<b>Hello world?</b>",
  });

  //   console.log("Message sent: %s", info.messageId);
}

module.exports = mailSender;
