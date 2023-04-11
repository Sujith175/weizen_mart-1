const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const Product = mongoose.model("product");
const Stockreq = mongoose.model("stockreq")
const StockReqFarmer = mongoose.model("stockreqfarmer")
const user = mongoose.model("User");
const requireLogin = require("../Middleware/requireLogin");
const { route } = require("./auth");

router.post("/addproduct", requireLogin, (req, res) => {
  const {
    productName,
    productPrice,
    productState,
    productQuantity,
    productDescription,
    url,
  } = req.body;
  if (
    !productName ||
    !productPrice ||
    !productState||
    !productQuantity ||
    !productDescription ||
    !url
  ) {
    return res.status(422).json({ error: "Please add all the details" });
  }
  

  const product = new Product({
    productName,
    productPrice,
    productState,
    productQuantity,
    productDescription,
    photo: url,
    postedBy: req.user,
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
    .populate("postedBy", "_id firstName lastName")
    .then((products) => {
      res.json({ products });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/getproduct/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const singleProduct = await Product.findById({ _id: id }).populate(
      "postedBy",
      "_id firstName"
    );

    res.status(201).json(singleProduct);
  } catch (error) {
    res.status(422).json(error);
  }

});

router.get("/myprods/:id", async (req, res) => {
 
    const { id } = req.params;
    Product.find({postedBy:(id)})
    .then((myproduct) => {
      res.json({ myproduct });
    })
    .catch((err) => {
      console.log(err);
    });
 
});

router.patch("/updateproduct/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedproduct = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
    });      
    const updatedquantity = await Stockreq.find({$or:[{productId:id}]}).update(
      productQuantity=req.body
    )
    const quantityupdate = await StockReqFarmer.find({$or:[{productId:id}]}).update(
      productQuantity=req.body
    )
    console.log(updatedproduct);
    //console.log(updatedquantity);
    res.status(201).json(updatedproduct);
  } catch (error) {
    res.status(422).json(error);
  }
});



module.exports = router;
