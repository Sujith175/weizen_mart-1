const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const stockSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: true,
    },
    productQuantity: {
      type: Number,
      required: true,
    },
    photo: {
      type: String,
      required: true,
    },
    postedBy: {
      type: ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);
mongoose.model("stock", stockSchema);
