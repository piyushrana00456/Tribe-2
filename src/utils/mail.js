const nodemailer = require("nodemailer");
require("dotenv").config();
const email = process.env.EMAIL;
const password = process.env.PASSWORD;

module.exports = (to) => {
  console.log(to);
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
      user: email,
      pass: password,
    },
  });

  const mailing = {
    from: "piyushrana979@gmail.com",
    to: to,
    subject: "SignUp Message",
    text: "Welcome",
  };

  transporter.sendMail(mailing, function (error, info) {
    if (error) console.log(error);
    else console.log("Email has been sent", info.response);
  });
};
