const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = mongoose.model("User");
const { JWT_SECRET } = require("../keys");
const nodemailer = require('nodemailer');
const app = express();
app.use(express.json());

app.set('view engine','ejs');


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
          const { _id, firstName,lastName, email, usertype ,phone} = savedUser;
          res.json({ token, user: { _id, firstName,lastName, email, usertype, phone } });
        } else {
          return res.status(422).json({ error: "Invalid Credentials" });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  });
});

router.put("/sendotp" ,async (req,res)=>{
  console.log(req.body)

  const _otp = Math.floor(100000 + Math.random() * 900000);
  console.log(_otp)

  const user = await User.findOne({email: req.body.email});
    
    //send to user mail
    if(!user){
      res.send({code:500,message:'User not found'})
    }

    let testAccount = await nodemailer.createTestAccount()

    let transporter = nodemailer.createTransport({
      service:"gmail",

      auth:{
        user: "ammuzzdona@gmail.com",
        pass: "suxvyzieyleilacx",
      },
      tls: {
        // do not fail on invalid certs
        rejectUnauthorized: false
    },
    });

    let info = await transporter.sendMail({
      from:'ammuzzdona@gmail.com', //sender address
      to: req.body.email, //list of recievers
      subject: "OTP", //subject line
      text: String(_otp),
    })

    if(info.messageId){
      console.log(info,84)
      User.updateOne({email:req.body.email},{otp:_otp})
      .then((result)=>{
        res.send({code:200, message:'otp send'});
        console.log(result)
      }).catch((err)=>{
        res.send({code:500,message:"server error"});
        console.log(err);
      });
      
    }else{
      res.send({code:500,message:'server error'})
    }
    
});

router.put("/submitotp",async(req,res)=>{
  console.log(req.body)
  const salt = await bcrypt.genSalt(10);
    hashedpassword = await bcrypt.hash(req.body.password,salt);
  
  User.findOne({otp: req.body.otp}).then(result=>{
    
    //update the password
    User.updateOne({email:result.email},{password:hashedpassword})
    .then((result)=>{
      res.send({code:200,message:'password updated'})
    })
  }).catch(err=>{
    res.send({code:500,message:"user not found"})
  })
});

module.exports = router;
