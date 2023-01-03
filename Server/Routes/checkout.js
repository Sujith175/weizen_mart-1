const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const Checkout = mongoose.model("Checkout");
const cart=require('../models/Cart');
const product=require('../models/Products');
//const requireLogin = require("../Middleware/requireLogin");
//const { route } = require("./auth");

router.post("/checkout",async (req, res) => {
    // const {
    //   id,
    //   firstName,
    //   email,
    //   phone,
    //   address,
    //   prodId,
    //   productName,
    //   cartQuantity,
    //   productPrice
    // } = req.body;

  
    // const checkout = new Checkout({
    //   id,
    //   firstName,
    //   email,
    //   phone,
    //   address,
    //   prodId,
    //   productName,
    //   cartQuantity,
    //   productPrice
    // });
    // checkout
    //   .save()
    //   .then((result) => {
    //     res.json({ checkout: result });
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    let userId=req.body.userId;
    let userDetails=req.body.address;
    // if (

    //   !userDetails.address 
      
    // ) {
    //   return res.status(422).json({ error: "Please add  the address" });
    // }
    let cartproducts=await cart.find({
      UserId:userId
    });
   cartproducts.forEach(async(prod)=>{
      let updateProductStock=await product.update({
        _id:mongoose.Types.ObjectId(prod.productId)
      },
      {
        $inc:{
          productQuantity:-prod.productQuantity
        }
      });
      const checkout = new Checkout({
       id:userDetails.id,
      firstName:userDetails.firstName,
      email:userDetails.email,
      phone:userDetails.phone,
      address:userDetails.address,
      prodId:prod.productId,
      productName:prod.productName,
      cartQuantity:prod.productQuantity,
      productPrice:prod.productQuantity
    });
    checkout
      .save();

    });
    let updateCart=await cart.update({
      UserId:userId
    },
    {
      $set:{
        status:false
      }
    });
    res.json({ message:'Success'});

  });
  
  
  
  module.exports = router;
  