const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = mongoose.model("User");
const { JWT_SECRET } = require("../keys");
router.post("/signup", (req, res) => {
  const { firstName, lastName, email, phone, password, usertype } = req.body;

  if (!email || !password || !firstName || !lastName || !phone || !usertype) {
    return res
      .status(422)
      .json({ error: "Please add all the required fields" });
  }
  User.findOne({ email: email })
    .then((savedUser) => {
      if (savedUser) {
        return res
          .status(422)
          .json({ error: "User Already exists with that email" });
      }
      bcrypt.hash(password, 15).then((hashedpassword) => {
        const user = new User({
          email,
          password: hashedpassword,
          firstName,
          lastName,
          phone,
          usertype,
        });
        user
          .save()
          .then((user) => {
            res.json({ message: " Signed Up successfully" });
          })
          .catch((err) => {
            console.log(err);
          });
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/signin", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(422).json({ error: " Please Provide Email or Password" });
  }
  User.findOne({ email: email }).then((savedUser) => {
    if (!savedUser) {
      return res.status(422).json({ error: " Invaild Credentials" });
    }
    bcrypt
      .compare(password, savedUser.password)
      .then((doMatch) => {
        if (doMatch) {
          const token = jwt.sign({ _id: savedUser._id }, JWT_SECRET);
          const { _id, name, email, usertype } = savedUser;
          res.json({ token, user: { _id, name, email, usertype } });
        } else {
          return res.status(422).json({ error: "Invalid Credentials" });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  });
});
module.exports = router;
