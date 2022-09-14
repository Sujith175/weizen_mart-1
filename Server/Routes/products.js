const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const Product = mongoose.model("product");
const requireLogin = require("../Middleware/requireLogin");
const { route } = require("./auth");

router.post("/addproduct", requireLogin, (req, res) => {
  const {
    productName,
    productPrice,
    productQuantity,
    productDescription,
    url,
  } = req.body;
  if (
    !productName ||
    !productPrice ||
    !productQuantity ||
    !productDescription ||
    !url
  ) {
    return res.status(422).json({ error: "Please add all the details" });
  }

  const product = new Product({
    productName,
    productPrice,
    productQuantity,
    productDescription,
    photo: url,
  });
  product
    .save()
    .then((result) => {
      res.json({ product: result });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/allproducts", requireLogin, (req, res) => {
  Product.find()
    .populate("postedBy", "_id name")
    .then((products) => {
      res.json({ products });
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
