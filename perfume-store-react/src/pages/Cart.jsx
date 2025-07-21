import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getCart, updateCartItem, removeFromCart, getLoggedInUser } from '../utils';
import { Modal, Button } from 'react-bootstrap';
import LoginModal from '../components/LoginModal';
import '../styles.css';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const user = getLoggedInUser();
  const navigate = useNavigate();

  useEffect(() => {
    const items = getCart();
    setCartItems(items);
  }, []);

  const handleQuantityChange = (index, newQuantity) => {
    const updatedItems = updateCartItem(index, parseInt(newQuantity));
    setCartItems(updatedItems);
  };

  const handleRemoveItem = (index) => {
    const updatedItems = removeFromCart(index);
    setCartItems(updatedItems);
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      const numericPrice = parseInt(item.price.replace(/[₹,]/g, ''));
      return total + (numericPrice * item.quantity);
    }, 0);
  };
const proceedToCheckout = async () => {
  if (!user) {
    setShowLoginModal(true);
    return;
  }

  // Save each cart item to backend
  for (const item of cartItems) {
    try {
      const response = await fetch("http://localhost:5000/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          userId: user._id,
          productId: item.id || item.productId || "dummy-id",  // use actual ID if available
          name: item.name,
          price: parseInt(item.price.replace(/[₹,]/g, '')),
          quantity: item.quantity
        })
      });

      const data = await response.json();
      console.log("✅ Cart saved:", data);
    } catch (err) {
      console.error("❌ Error saving to cart:", err);
    }
  }

  // Proceed to checkout page after saving
  navigate('/checkout');
};

  return (
    <div className="cart-page">
      <div className="container mt-5">
        <h2 className="cart-title">
          <i className="fa-solid fa-cart-shopping me-2"></i>Your Shopping Cart
        </h2>
        
        {cartItems.length === 0 ? (
          <div className="col-12 text-center mt-5 empty-cart">
            <i className="fa-solid fa-box-open mb-3"></i>
            <h5>Your cart is empty.</h5>
            <Link to="/home" className="btn btn-primary mt-3">
              <i className="fa-solid fa-arrow-left me-2"></i>Continue Shopping
            </Link>
          </div>
        ) : (
          <>
            <div id="cartItems" className="row">
              {cartItems.map((item, index) => (
                <div key={index} className="col-md-12 mb-3 cart-card p-3 d-flex align-items-center">
                  <img src={item.image} alt={item.name} className="cart-img me-3" />
                  <div className="flex-grow-1">
                    <h5 className="mb-1">{item.name}</h5>
                    <p className="mb-2">Price: <strong>{item.price}</strong></p>
                    <div className="d-flex align-items-center">
                      <label className="me-2">Qty:</label>
                      <input 
                        type="number" 
                        min="1" 
                        value={item.quantity} 
                        onChange={(e) => handleQuantityChange(index, e.target.value)} 
                        className="form-control form-control-sm qty-input me-3" 
                      />
                      <button 
                        className="btn btn-outline-danger btn-sm" 
                        onClick={() => handleRemoveItem(index)}
                      >
                        <i className="fa-solid fa-trash"></i> Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="col-12 text-center mt-4">
              <h4>Total: ₹<span id="cartTotal">{calculateTotal().toLocaleString()}</span></h4>
              <div className="action-buttons d-flex flex-column gap-3 align-items-center mt-3">
                <Link to="/home" className="btn btn-outline-secondary">
                  <i className="fa-solid fa-arrow-left me-2"></i>Continue Shopping
                </Link>
                <button className="btn btn-success" onClick={proceedToCheckout}>
                  <i className="fa-solid fa-money-check-dollar me-2"></i>Buy Now
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      <LoginModal 
        show={showLoginModal} 
        onHide={() => setShowLoginModal(false)} 
        onLoginSuccess={() => {
          setShowLoginModal(false);
          navigate('/checkout');
        }} 
      />
    </div>
  );
};

export default Cart;