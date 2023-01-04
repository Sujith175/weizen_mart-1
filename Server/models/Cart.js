const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const cartSchema = new mongoose.Schema(
  {
    productId: {
      type: String,
      required:true
    },
    productName: {
      type: String,
      required:true
    },
    productPrice:{
      type: String,
      required:true
    },
    productQuantity:{
      type: Number,
      required:true
    },
    productState:{
      type: String,
      required:true
    },
    postedBy:{
      type: String,
    },
    UserId:{
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
    status:{
      type:Boolean
    }
  },
  { timestamps: true }
);
const cart=mongoose.model("cart", cartSchema);

module.exports=cart;
