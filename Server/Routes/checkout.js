const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const Checkout = mongoose.model("Checkout");
const cart=require('../models/Cart');
const product=require('../models/Products');
const checkout=require('../models/Checkout');
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

    let photo=req.body.photo;
    // if (

    //   !userDetails.address 
      
    // ) {
    //   return res.status(422).json({ error: "Please add  the address" });
    // }
    let cartproducts=await cart.find({
      UserId:userId,
      status:true
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
      prodId:prod.productId,
      productName:prod.productName,
      cartQuantity:prod.productQuantity,
      productPrice:prod.productPrice,
     // photo:photo
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
  
  router.get("/checkoutlist/:id",async (req,res)=>{
    let userId=req.params.id;
    let cartproducts=await cart.find({
      UserId:userId,
      status:true
    });

    let cartDetails=await cart.aggregate([
      {$match:{
        UserId:userId,
        status:true
      },
    },
    {
      $addFields:{
        productId:{$toObjectId:'$productId'}
      }
    },
    {
      $lookup:{
        from:'products',
        localField:'productId',
        foreignField:'_id',
        as:'productDetails'
      }
    },
    {
      $unwind:'$productDetails'
    },
    {
      $addFields:{
        cartQuantity:'$productQuantity',
        productQuantity:'$productDetails.productQuantity',
        productDescription:'$productDetails.productDescription',
        photo:'$productDetails.photo'
      }
    },
    {$unset:'productDetails'}
    ]);

    res.status(200).send({cart:cartDetails});
  })
  
  router.get("/checkout/:id",async (req,res)=>{
    let userId=req.params.id;
    let orders=await checkout.find({
      UserId:userId,
      status:true
    });
    res.status(200).send({orders:orders});
    
  })
  
  
  
  module.exports = router;
  