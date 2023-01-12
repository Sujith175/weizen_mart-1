const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const user = require('../models/User');


router.patch("/updateprofile/:id", async (req, res) => {
  let userId=req.params.id;
  let update=await user.findByIdAndUpdate(userId,{
    firstName:req.body.firstName,
    lastName:req.body.lastName,
    phone:req.body.phone,
    
  },);
  res.json({message:'updated', code: 200});
  });
  module.exports = router;
  