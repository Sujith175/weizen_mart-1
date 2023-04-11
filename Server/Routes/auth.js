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



router.get("/allcustomers", requireLogin, (req, res) => {
  User.find({usertype:"Customer"})
    .then((customers) => {
      res.json({ customers });
    })
    .catch((err) => {
      console.log(err);
    });
});
router.get("/customer/:id", (req, res) => {
  User.find({_id:mongoose.Types.ObjectId(req.params.id)})
    .then((customer) => {
      res.json({ customer });
    })
    .catch((err) => {
      console.log(err);
    });
});

//Regn mail

function sendRegnEmail({ recipient_email, OTP }) {
  return new Promise((resolve, reject) => {
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "ammuzzdona@gmail.com",
        pass: "suxvyzieyleilacx",
      },
    });

    const mail_configs = {
      from: process.env.MY_EMAIL,
      to: recipient_email,
      subject: "SignUp Successfull",
      html: `<!DOCTYPE html>
<html lang="en" >
<head>
  <meta charset="UTF-8">
  <title>CodePen - OTP Email Template</title>
  
</head>
<body>
<!-- partial:index.partial.html -->
<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
  <div style="margin:50px auto;width:70%;padding:20px 0">
    <div style="border-bottom:1px solid #eee">
      <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Weizen Mart</a>
    </div>
    <p style="font-size:1.1em">Hi,</p>
    <p>Thank you for choosing Weizen Mart. Your SignUp is successfull. Please login using your email and password. Happy Shopping</p>
    <p style="font-size:0.9em;">Regards,<br />Weizen Mart Admin</p>
    <hr style="border:none;border-top:1px solid #eee" />
    <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
   <p> No. 369, 13th Cross, 30th Main,</p>
    <p>Sultanpet 2nd Street</p>
    <p>Banglore - 560070</p>
    <p>Karnataka, India</p>
    </div>
  </div>
</div>
<!-- partial -->
  
</body>
</html>`,
    };
    transporter.sendMail(mail_configs, function (error, info) {
      if (error) {
        console.log(error);
        return reject({ message: `An error has occured` });
      }
      return resolve({ message: "Email sent succesfuly" });
    });
  });
}


router.post("/sendmail", (req, res) => {
  sendRegnEmail(req.body)
    .then((response) => res.send(response.message))
    .catch((error) => res.status(500).send(error.message));
});

//Forget Password

function sendEmail({ recipient_email, OTP }) {
  return new Promise((resolve, reject) => {
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "ammuzzdona@gmail.com",
        pass: "suxvyzieyleilacx",
      },
    });

    const mail_configs = {
      from: process.env.MY_EMAIL,
      to: recipient_email,
      subject: "WEIZEN MART PASSWORD RECOVERY",
      html: `<!DOCTYPE html>
<html lang="en" >
<head>
  <meta charset="UTF-8">
  <title>CodePen - OTP Email Template</title>
  
</head>
<body>
<!-- partial:index.partial.html -->
<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
  <div style="margin:50px auto;width:70%;padding:20px 0">
    <div style="border-bottom:1px solid #eee">
      <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Weizen Mart</a>
    </div>
    <p style="font-size:1.1em">Hi,</p>
    <p>Thank you for choosing Weizen Mart. Use the following OTP to complete your Password Recovery Procedure. OTP is valid for 5 minutes</p>
    <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${OTP}</h2>
    <p style="font-size:0.9em;">Regards,<br />Weizen Mart Admin</p>
    <hr style="border:none;border-top:1px solid #eee" />
    <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
   <p> No. 369, 13th Cross, 30th Main,</p>
    <p>Sultanpet 2nd Street</p>
    <p>Banglore - 560070</p>
    <p>Karnataka, India</p>
    </div>
  </div>
</div>
<!-- partial -->
  
</body>
</html>`,
    };
    transporter.sendMail(mail_configs, function (error, info) {
      if (error) {
        console.log(error);
        return reject({ message: `An error has occured` });
      }
      return resolve({ message: "Email sent succesfuly" });
    });
  });
}


router.post("/send_recovery_email", (req, res) => {
  sendEmail(req.body)
    .then((response) => res.send(response.message))
    .catch((error) => res.status(500).send(error.message));
});

//password reset
router.post('/reset-password', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if email is associated with an existing user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }    

 // Update user password in database
 const saltRounds = 10;
 const hashedPassword = await bcrypt.hash(password, saltRounds);
 await User.updateOne({ _id: user._id }, { password: hashedPassword });

 // Send success response back to client-side
 res.status(200).json({ message: 'Password reset successfully' });
} catch (err) {
 console.error(err);
 res.status(500).json({ message: 'Error resetting password' });
}
});

module.exports = router;
