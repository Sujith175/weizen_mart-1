const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const Stock = mongoose.model("stock");
const requireLogin = require("../Middleware/requireLogin");
const { route } = require("./auth");

router.post("/stock", requireLogin, (req, res) => {
  const {
    productName,
    productQuantity,
    url,
  } = req.body;
  if (
    !productName ||
    !productQuantity ||
    !url
  ) {
    return res.status(422).json({ error: "Please add all the details" });
  }

  const stock = new Stock({
    productName,
    productQuantity,
    photo: url,
    postedBy: req.user,
  });
  stock
    .save()
    .then((result) => {
      res.json({ stock: result });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/stockdetails", requireLogin, (req, res) => {
    Stock.find()
      .populate("postedBy", "_id productName")
      .then((stocks) => {
        res.json({ stocks });
      })
      .catch((err) => {
        console.log(err);
      });
  });

module.exports = router;
