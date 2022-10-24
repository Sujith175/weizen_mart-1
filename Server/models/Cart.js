const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const cartSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: true,
    },
    productPrice:{
        type: Number,
        required:true,
    },
    productQuantity: {
      type: Number,
      required: true,
    },
    postedBy: {
      type: ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);
mongoose.model("cart", cartSchema);
