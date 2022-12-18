const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();


const Cart = mongoose.model("cart");
const requireLogin = require("../Middleware/requireLogin");
const { route } = require("./auth");

router.post("/cart", (req, res) => {
  const {
    productName,
   
  } = req.body;
  if (
    !productName 
  ) {
    return res.status(422).json({ error: "Please add all the details" });
  }

  const cart = new Cart({
    productName,
    
  });
  cart
    .save()
    .then((result) => {
      res.json({ cart: result });
    })
    .catch((err) => {
      console.log(err);
    });
});


module.exports = router;
