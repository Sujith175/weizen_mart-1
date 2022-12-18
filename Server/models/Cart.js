const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const cartSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
     
    },
    
  },
  { timestamps: true }
);
mongoose.model("cart", cartSchema);
