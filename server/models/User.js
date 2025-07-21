const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  phone: { type: String, unique: true },
  password: String  // Optional for OTP
});

module.exports = mongoose.model("User", userSchema);
