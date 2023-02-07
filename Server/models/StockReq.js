const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const stockreqSchema = new mongoose.Schema(
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
      type: ObjectId,
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
const stockreqModel=mongoose.model("stockreq", stockreqSchema);

module.exports=stockreqModel;
