const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const user = mongoose.model("User");


router.put("/updateprofile/:id", async (req, res) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const phone = req.body.phone;
  const id = req.params.id;

  try {
    const result = await user.updateOne(
      { _id: ObjectId(id) },
      { $set: { firstName, lastName,phone } }
    );

    if (result.modifiedCount === 1) {
      res.json({ message: 'Profile updated successfully' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
  });
  
  module.exports = router;
  

  