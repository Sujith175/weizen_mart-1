const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = mongoose.model("User");
const { JWT_SECRET } = require("../keys");
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

router.post("/forget-password",async(req,res)=>{
  const{email} =req.body;
  try{
    const oldUser = await User.findOne({email});
    if(!oldUser){
      return res.json({status:"User Not Exists!!"});
    }
    const secret = JWT_SECRET + oldUser.password;
    const token = jwt.sign({email:oldUser.email,id:oldUser._id},secret,{expiresIn:'5m'});
  
  const link =`http://localhost:5000/reset-password/${oldUser._id}/${token}`;
  console.log(link);
  }catch(error){}
});

router.get('/reset-password/:id/:token',async(req,res)=>{
  const{id,token} = req.params;
  console.log(req.params);
  const oldUser = await User.findOne({_id:id});
  if(!oldUser){
    return res.json({status:"User Not Exists!!"});
  }
  const secret = JWT_SECRET + oldUser.password;
try{
  const verify=jwt.verify(token,secret);
  res.render("index",{email:verify.email});
}catch(error){
  console.log(error);
  res.send("Not verified");
}
 
})

module.exports = router;
