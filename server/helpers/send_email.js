const nodemailer = require("nodemailer");
const emailUser = process.env.EMAIL_USER;
const emailPassword = process.env.EMAIL_PASSOWORD;

const transporter = nodemailer.createTransport({
  host: "mail.chaiyopaiyo.com",
  port: 465,
  secure: true,
  auth: {
    user: emailUser,
    pass: paemailPasswordssword,
  },
});

async function main() {
  const info = await transporter.sendMail({
    from: emailUser,
    to: "",
    subject: "Hello ✔",
    text: "Hello world?",
    html: "<b>Hello world?</b>",
  });

  console.log("Message sent: %s", info.messageId);
}

main().catch(console.error);
