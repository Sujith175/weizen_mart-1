const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      
    },
    phone: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      
    },
    usertype: {
      type: String,
     
    },
    otp:{
      type: Number,
    },
  },
  { timestamps: true }
);
let userModel=mongoose.model("User", UserSchema);
module.exports=userModel;