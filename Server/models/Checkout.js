const mongoose = require("mongoose");

const CheckoutSchema = new mongoose.Schema(
  {
    id:{
      type:String,
    },
    firstName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    prodId:{
      type:String,
      
    },
    productName: {
      type: String,
      
    },
    cartQuantity: {
      type: Number,
     
    },
     productPrice:{
        type: Number,
        
    },
  },
  { timestamps: true }
);
const checkoutModel=mongoose.model("Checkout", CheckoutSchema);
module.exports=checkoutModel;
