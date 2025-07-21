const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Optional: to enable population later
    required: true,
  },
  items: {
    type: Array,
    required: true,
  },
  totalAmount: {
    type: Number,
    required: true,
  },
  paymentMethod: {
    type: String,
    enum: ["cod", "upi", "card"],
    required: true,
  },
  upiId: {
    type: String,
    default: null,
  },
  cardLast4: {
    type: String,
    default: null,
  },
  shippingInfo: {
    fullName: String,
    email: String,
    phone: String,
    address1: String,
    address2: String,
    city: String,
    state: String,
    pin: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Order", OrderSchema);
