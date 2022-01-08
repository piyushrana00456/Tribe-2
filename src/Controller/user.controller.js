const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");

const sendMail = require("../utils/mail");

const User = require("../Model/user.model");

router.post(
  "/",
  // validation of email & password
  body("email")
    .isEmail()
    .withMessage("email is required and must be a valid email address"),
  body("password")
    .custom((value) => {
      if (
        (value.length >= 5 && value.length <= 8 && value.includes("#")) ||
        value.includes("@") ||
        value.includes("$") ||
        value.includes("&")
      ) {
        return true;
      }
      return false;
    })
    .withMessage(
      "Your password should be min length of 5 and must contain special character"
    ),
  async (req, res) => {
    try {
      const error = validationResult(req);
      if (!error.isEmpty()) {
        return res.status(400).json({ data: error.array() });
      }
      //checking for user is it alraedy exit or not

      //   let user = await User.findOne({
      //     email: req.body.email,
      //   }).exec();
      //   if (user) {
      //     return res.statusCode(400).json({
      //       status: "error",
      //       message: "User already exist",
      //     });
      //   }

      //otherwise create a user and then hash the password

      let user = await User.create({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: req.body.password,
      });
      if (user) {
        sendMail(req.body.email);
      }
      return res.status(201).json({ user });
    } catch (error) {
      return res.status(400).json({ error });
    }
  }
);

module.exports = router;
