const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const Cart = mongoose.model("cart");
const requireLogin = require("../Middleware/requireLogin");
const { route } = require("./auth");

router.post("/cart", requireLogin, (req, res) => {
  const {
    productName,
    productQuantity,
    productPrice,
  } = req.body;
  if (
    !productName ||
    !productQuantity ||
    !productPrice
  ) {
    return res.status(422).json({ error: "Please add all the details" });
  }

  const cart = new Cart({
    productName,
    productQuantity,
    productPrice,
    postedBy: req.user,
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
