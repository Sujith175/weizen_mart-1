const express = require("express");
const mongoose = require("mongoose");
const cart = require("../models/Cart");
const router = express.Router();


const Cart = require('../models/Cart');
const Product=require('../models/Products');


router.post("/cart", async (req, res) => {
  // const {
  //   productId,
  //   productName,
  //   productPrice,
  //   productQuantity,
  //   productState,
  //   postedBy,
  //   UserId,
  //   firstName,
  //   email,
  //   phone
  // } = req.body;
  // if (
  //   !productId||
  //   !productName ||
  //   !productPrice ||
  //   !productQuantity ||
  //   !productState ||
  //   !postedBy ||
  //   !UserId||
  //   !firstName||
  //   !email||
  //   !phone
  // ) {
  //   return res.status(422).json({ error: "Please add all the details" });
  // }

  // const cart = new Cart({
  //   productId,
  //   productName,
  //   productPrice,
  //   productQuantity,
  //   productState,
  //   postedBy,
  //   UserId,
  //   firstName,
  //   email,
  //   phone,
  //   status:true
  // });
  // cart
  //   .save()
  //   .then((result) => {
  //     res.json({ cart: result });
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
  let isExist=await cart.find({
    productId:req.body.productId,
    UserId:req.body.UserId,
    status:true
  });

  if(isExist.length>0){
    let updatecart=await cart.update({
      productId:req.body.productId,
      UserId:req.body.UserId,
      status:true
    },
    {
      $inc:{
        productQuantity:+1
      }
    });
  }else{
    let addNewCart=await new cart({
      productId:req.body.productId,
        productName:req.body.productName,
        productPrice:req.body.productPrice,
        productQuantity:Number(req.body.productQuantity,10),
        productState:req.body.productState,
        postedBy:req.body.postedBy,
        UserId:req.body.UserId,
        firstName:req.body.firstName,
        email:req.body.email,
        phone:req.body.phone,
        status:true
    }).save();
  }
});

router.post("/updatequantity",async(req,res)=>{
  let update=await Cart.update({
    _id:mongoose.Types.ObjectId(req.body.cartId),
    productId:req.body.productId,
    UserId:req.body.userId,
    status:true
  },
  {
    $set:{
      productQuantity:req.body.productQuantity
    }
  });
  res.json({message:'updated', code: 200});
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