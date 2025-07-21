const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;
const User = require("./models/User");
const Cart = require("./models/Cart");
const Order = require("./models/Order");
app.use(cors());
app.use(express.json());


// MongoDB connection
console.log("MONGO_URI =", process.env.MONGO_URI);

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.error("MongoDB Error:", err));




app.get("/", (req, res) => {
  res.send("Backend Running!");
});


// Signup
app.post("/api/signup", async (req, res) => {
  const { name, email, phone, password } = req.body;

  try {
    const existingUser = await User.findOne({ phone });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists. Please login instead." });
    }

    const newUser = new User({ name, email, phone, password });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ message: "Signup failed." });
  }
});

// Login
// Login with phone (only if signed up already)
app.post("/api/login", async (req, res) => {
  const { phone } = req.body;

  try {
    const user = await User.findOne({ phone });
    if (!user) {
      return res.status(404).json({ message: "User not found. Please sign up first." });
    }

    res.status(200).json(user);
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error" });
  }
});




// Add to Cart
app.post("/api/cart", async (req, res) => {
  console.log("Cart API called:", req.body); 
  const { userId, productId, name, price, quantity } = req.body;
  let cart = await Cart.findOne({ userId });

  if (!cart) {
    cart = new Cart({ userId, items: [] });
  }

  const existingItem = cart.items.find(item => item.productId === productId);
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.items.push({ productId, name, price, quantity });
  }

  await cart.save();
  res.json(cart);
});

// Checkout
app.post("/api/checkout", async (req, res) => {
  try {
    const {
      userId,
      shippingInfo,
      paymentMethod,
      cartItems,
      totalAmount,
      paymentDetails,
    } = req.body;

    if (!cartItems || cartItems.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    // Safely extract UPI or card details
    const upiId =
      paymentMethod === "upi" ? paymentDetails?.upiId || null : null;
    const cardLast4 =
      paymentMethod === "card"
        ? paymentDetails?.cardNumber?.slice(-4) || null
        : null;

    // Create new order
    const newOrder = new Order({
      userId,
      items: cartItems,
      totalAmount,
      paymentMethod,
      upiId,
      cardLast4,
      shippingInfo, // Save full shipping info
    });

    const savedOrder = await newOrder.save();

    res.status(201).json({
      message: "✅ Order placed successfully!",
      order: savedOrder,
    });
  } catch (err) {
    console.error("❌ Checkout error:", err);
    res.status(500).json({ message: "Something went wrong while placing order." });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});


// subscriber
const Subscriber = require("./models/Subscriber");

app.post("/api/subscribe", async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required." });
  }

  try {
    const existing = await Subscriber.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "You are already subscribed!" });
    }

    const subscriber = new Subscriber({ email });
    await subscriber.save();

    res.status(201).json({ message: "Subscribed successfully!" });
  } catch (err) {
    console.error("Subscription error:", err);
    res.status(500).json({ message: "Internal server error." });
  }
});
