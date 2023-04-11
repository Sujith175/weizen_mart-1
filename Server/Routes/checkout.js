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

    let subtotal=req.body.subtotal;

    
    // if (

    //   !userDetails.address 
      
    // ) {
    //   return res.status(422).json({ error: "Please add  the address" });
    // }

    // if (
    //   !userDetails.address ||
    //   !userDetails.locality ||
    //   !userDetails.pincode||
    //   !userDetails.city||
    //   !userDetails.state
    // ) {
    //   return res.status(422).json({ error: "Please add all the details" });
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
      userId:userId,
      firstName:userDetails.firstName,
      lastName:userDetails.lastName,
      email:userDetails.email,
      phone:userDetails.phone,
      address:userDetails.address,
      locality:userDetails.locality,
      pincode:userDetails.pincode,
      city:userDetails.city,
      State:userDetails.State,
      landmark:userDetails.landmark,
      prodId:prod.productId,
      productName:prod.productName,
      cartQuantity:prod.productQuantity,
      productPrice:prod.productPrice,
      subtotal:subtotal,
      //photo:prod.photo
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
      userId:userId,
    });
    res.status(200).send({orders:orders});
    
  })

  router.get("/reciept/:id",async (req,res)=>{
    let orderId=req.params.id;
    let reciept=await checkout.find({
      _id:orderId,
      status:true
    });
    res.status(200).send({reciept:reciept});
    
  })
  
  router.get('/income/:year', async (req, res) => {
    const selectedYear = parseInt(req.params.year);
  
    // Find all income data for the selected year
    const incomes = await Checkout.find({
      createdAt: {
        $gte: new Date(selectedYear, 0, 1),
        $lte: new Date(selectedYear, 11, 31)
      }
    });
// Create an object to store income data per month
const incomePerMonth = {
  January: 0,
  February: 0,
  March: 0,
  April: 0,
  May: 0,
  June: 0,
  July: 0,
  August: 0,
  September: 0,
  October: 0,
  November: 0,
  December: 0
};
// Iterate through the income data and update incomePerMonth object
incomes.forEach(income => {
  const incomeMonth = new Date(income.createdAt).toLocaleString('default', { month: 'long' });
  incomePerMonth[incomeMonth] += income.subtotal;
});

res.json({ incomePerMonth });
});


  module.exports = router;
  