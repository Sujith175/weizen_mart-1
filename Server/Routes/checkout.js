const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const Checkout = mongoose.model("Checkout");
//const requireLogin = require("../Middleware/requireLogin");
//const { route } = require("./auth");

router.post("/checkout", (req, res) => {
    const {
      id,
      firstName,
      email,
      phone,
      address,
      prodId,
      productName,
      cartQuantity,
      productPrice
    } = req.body;
    if (

      !address 
      
    ) {
      return res.status(422).json({ error: "Please add  the address" });
    }
  
    const checkout = new Checkout({
      id,
      firstName,
      email,
      phone,
      address,
      prodId,
      productName,
      cartQuantity,
      productPrice
    });
    checkout
      .save()
      .then((result) => {
        res.json({ checkout: result });
      })
      .catch((err) => {
        console.log(err);
      });
  });
  
  
  
  module.exports = router;
  