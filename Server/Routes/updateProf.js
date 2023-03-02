const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const user = mongoose.model("User");


router.patch("/updateprofile/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const updateprofile = await user.findByIdAndUpdate(id, 
        {firstName:req.body.firstName,
            lastName:req.body.lastName,
            phone:req.body.phone}, {
        new: true,
      });      
      console.log(updateprofile);
      //console.log(updatedquantity);
      res.status(201).json(updateprofile);
    } catch (error) {
      res.status(422).json(error);
    }
  });
  
  module.exports = router;
  