const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const stockreqfarmerSchema = new mongoose.Schema(
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
    postedBy: {
      //type: ObjectId,
      type: String,
      ref: "User",
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
  },
  { timestamps: true }
);
const stockreqfarmerModel=mongoose.model("stockreqfarmer", stockreqfarmerSchema);

module.exports=stockreqfarmerModel;
