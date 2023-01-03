const express = require("express");
const mongoose = require("mongoose");
const cart = require("../models/Cart");
const router = express.Router();


const Cart = require('../models/Cart');
const Product=require('../models/Products');


router.post("/cart", (req, res) => {
  const {
    productId,
    productName,
    productPrice,
    productQuantity,
    productState,
    postedBy,
    UserId,
    firstName,
    email,
    phone
   
  } = req.body;
  if (
    !productId||
    !productName ||
    !productPrice ||
    !productQuantity ||
    !productState ||
    !postedBy ||
    !UserId||
    !firstName||
    !email||
    !phone
  ) {
    return res.status(422).json({ error: "Please add all the details" });
  }

  const cart = new Cart({
    productId,
    productName,
    productPrice,
    productQuantity,
    productState,
    postedBy,
    UserId,
    firstName,
    email,
    phone,
    status:true
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

router.post("/updatequantity",async(req,res)=>{
  let update=await Cart.update({
    _id:mongoose.Types.ObjectId(req.body.cartId),
    productId:req.body.productId,
    UserId:req.body.userId
  },
  {
    $set:{
      productQuantity:req.body.productQuantity
    }
  });
});


router.get('/getcartdetails/:userId',async (req,res)=>{
  let userId=req.params.userId;
  let cartDetails=await Cart.aggregate([
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
});

router.delete('/clearcart/:id',async(req,res)=>{
  let clearcart=await cart.deleteMany({
    UserId:req.params.id
  });
  res.json({message:'cart cleared successfully'});
});

router.delete('/remove/:id',async(req,res)=>{
  let clearcart=await cart.deleteOne({
    _id:mongoose.Types.ObjectId(req.params.id)
  });
  res.json({message:'Product removed successfully'});
})
module.exports = router;
