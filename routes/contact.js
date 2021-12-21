const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");

//insures that the .env file is only run in a development environment and not a production environment
if (process.env.NODE_ENV !== "production") {
  //requires the the .env file configuration be run first hiding all info hidden via the .env file
  require("dotenv").config();
}

//Send an email to me
router.post("/contact", async (req, res) => {
  const output = `
    <h3>Message Details:</h3>
    <ul>
        <li>Name: ${req.body.name}</li>
        <li>Email: ${req.body.email}</li>
        <li>Message: ${req.body.message}</li>
    </ul>`;

  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAILPASSWORD,
    },
  });

  let mailOptions = {
    from: req.body.email,
    to: process.env.EMAIL,
    subject: req.body.subject,
    html: output,
  };

  transporter
    .sendMail(mailOptions)
    .then(function () {
      console.log("Email sent");
      res.sendStatus(201);
    })
    .catch(function (error) {
      console.log("Error", error);
    });
});

module.exports = router;
