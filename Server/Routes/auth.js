const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = mongoose.model("User");
const { JWT_SECRET } = require("../keys");
const nodemailer = require('nodemailer');
const requireLogin = require("../Middleware/requireLogin");
const app = express();
const moment = require('moment');

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
          phone:"+91"+phone,
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

router.get("/allfarmers", requireLogin, (req, res) => {
  User.find({usertype:"Farmer"})
    .then((farmers) => {
      res.json({ farmers });
    })
    .catch((err) => {
      console.log(err);
    });
});

//Regns of farmer and customer
router.get('/api/data/:year', async (req, res) => {
  const { year } = req.params;
  const start = new Date(`${year}-01-01T00:00:00.000Z`);
  const end = new Date(`${Number(year) + 1}-01-01T00:00:00.000Z`);
  const data = [];
  for (let i = 1; i <= 12; i++) {
    const startOfMonth = new Date(`${year}-${i.toString().padStart(2, '0')}-01T00:00:00.000Z`);
    const endOfMonth = new Date(`${year}-${i.toString().padStart(2, '0')}-${new Date(year, i, 0).getDate()}T23:59:59.999Z`);
    const users = await User.find({ createdAt: { $gte: startOfMonth, $lte: endOfMonth } }).exec();
    const customersCount = users.filter(user => user.usertype === 'Customer').length;
    const farmersCount = users.filter(user => user.usertype === 'Farmer').length;
    data.push({ month: new Date(year, i - 1, 1).toLocaleString('default', { month: 'long' }), Customers: customersCount, Farmers: farmersCount });
  }
 
  res.json(data);
});


// const months = ["january","February","March","April","May","June","July","August","September","October",
//                 "November","December"
// ]

// router.get("/total-registered-users-per-month", (req, res) => {
//   try {
//     const year = parseInt(req.query.year);
//     const start = new Date(year, 0, 1);
//     const end = new Date(year + 1, 0, 1);
//     const users =  User.aggregate([
//       {
//         $match: {
//           createdAt: { $gte: start, $lt: end }
//         }
//       },
//       {
//         $group: {
//           _id: {
//             month: { $month: "$createdAt" },
//           },
//           count: { $sum: 1 },
//         },
//       },
//       {
//         $sort: { "_id.month": 1 },
//       },
//     ]);

//     const usersWithMonthName = users.map((user) => ({
//       month: months[user._id.month - 1],
//       year: year,
//       count: user.count,
//     }));
   
//     res.status(200).json({ users: usersWithMonthName });
//   } catch (error) {
//     res.status(500).json({ message: "Internal Server Error" });
//     console.error(error);
//   }
// });

router.get("/allcustomers", requireLogin, (req, res) => {
  User.find({usertype:"Customer"})
    .then((customers) => {
      res.json({ customers });
    })
    .catch((err) => {
      console.log(err);
    });
});

//Forget Password

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
       return res.send({code:200, message:'otp send'});
        console.log("success===========",result)
      }).catch((err)=>{
       return res.send({code:500,message:"server error"});
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

router.put("/sendmail" ,async (req,res)=>{
  console.log(req.body)

  // const user = await User.findOne({email: req.body.email});
    
    //send to user mail
    // if(!user){
    //   res.send({code:500,message:'User not found'})
    // }

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
      subject: "Thankyou for Signing Up", //subject line
      text: "Hi,You have successfully signed up to Weizen Mart. Thankyou for Signing Up.Happy Shopping",
    })

    if(info.messageId){
      console.log(info,84)
      // User.updateOne({email:req.body.email})
      .then((result)=>{
        res.send({code:200, message:'mail send'});
        console.log(result)
      }).catch((err)=>{
        res.send({code:500,message:"server error"});
        console.log(err);
      });
      
    }else{
      res.send({code:500,message:'server error'})
    }
    
});

module.exports = router;
