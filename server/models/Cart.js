const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  items: [
    {
      productId: String, // or use ObjectId if you store products
      name: String,
      price: Number,
      quantity: Number
    }
  ]
});

module.exports = mongoose.model("Cart", CartSchema);
