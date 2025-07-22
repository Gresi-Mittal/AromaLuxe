
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCart, clearCart } from '../utils';
import { Modal, Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';


const Checkout = () => {
  const [cartItems, setCartItems] = useState([]);
  const [showOrderSummary, setShowOrderSummary] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('');
  const navigate = useNavigate();

  // Form fields
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [pin, setPin] = useState('');
  const [upiId, setUpiId] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');

  useEffect(() => {
    const items = getCart();
    setCartItems(items);
  }, []);

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      const numericPrice = parseInt(item.price.replace(/[₹,]/g, ''));
      return total + (numericPrice * item.quantity);
    }, 0);
  };

  const togglePaymentFields = () => {
    // This is handled by the paymentMethod state change
  };

  const validateCheckoutForm = () => {
    // Validate payment method-specific fields
    if (paymentMethod === "upi") {
      const upiRegex = /^[\w.-]+@(?:okaxis|oksbi|ybl|paytm|upi|okhdfcbank)$/;
      if (!upiRegex.test(upiId)) {
        alert("Please enter a valid UPI ID.");
        return false;
      }
    }

    if (paymentMethod === "card") {
      if (!/^\d{16}$/.test(cardNumber)) {
        alert("Please enter a valid 16-digit card number.");
        return false;
      }

      if (!/^\d{2}\/\d{2}$/.test(expiry)) {
        alert("Please enter a valid expiry date in MM/YY format.");
        return false;
      }

      if (!/^\d{3}$/.test(cvv)) {
        alert("Please enter a valid 3-digit CVV.");
        return false;
      }
    }

    // Validate general fields
    if (!fullName.trim()) {
      alert("Please enter your full name.");
      return false;
    }

    if (!email.trim()) {
      alert("Please enter your email address.");
      return false;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      alert("Please enter a valid email address.");
      return false;
    }

    if (!phone.trim()) {
      alert("Please enter your phone number.");
      return false;
    }

    if (!/^\d{10}$/.test(phone)) {
      alert("Please enter a valid 10-digit phone number.");
      return false;
    }

    if (!address1.trim()) {
      alert("Please enter your address.");
      return false;
    }

    if (!city.trim()) {
      alert("Please enter your city.");
      return false;
    }

    if (!state.trim()) {
      alert("Please enter your state.");
      return false;
    }

    if (!pin.trim()) {
      alert("Please enter your PIN code.");
      return false;
    }

    if (!/^\d{6}$/.test(pin)) {
      alert("Please enter a valid 6-digit PIN code.");
      return false;
    }

    if (!paymentMethod) {
      alert("Please select a payment method.");
      return false;
    }

    return true;
  };

  const handlePlaceOrder = () => {
    if (validateCheckoutForm()) {
      setShowOrderSummary(true);
    }
  };

  const confirmOrder = async () => {
  const user = JSON.parse(localStorage.getItem("loggedInUser"));
  if (!user || !user._id) {
    alert("User not logged in.");
    return;
  }

const orderPayload = {
  userId: user._id,
  shippingInfo: {
    fullName,
    email,
    phone,
    address1,
    address2,
    city,
    state,
    pin,
  },
  paymentMethod,
  paymentDetails: paymentMethod === "upi"
    ? { upiId }
    : paymentMethod === "card"
    ? { cardNumber }
    : {},
  cartItems,
  totalAmount: calculateTotal(),
};


if (paymentMethod === "upi") {
  orderPayload.paymentDetails.upiId = upiId;
}
if (paymentMethod === "card") {
  orderPayload.paymentDetails.cardLast4 = cardNumber.slice(-4); // Never store full card
  orderPayload.paymentDetails.expiry = expiry;
}

  try {
   const response = await fetch(`${process.env.REACT_APP_API_URL}/api/checkout`, {

      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderPayload),
    });

    const data = await response.json();

    if (response.ok) {
      console.log("✅ Order Placed:", data);
      clearCart();
      navigate("/thank-you");
    } else {
      alert(data.message || "❌ Failed to place order.");
    }
  } catch (error) {
    console.error("❌ Error placing order:", error);
    alert("Something went wrong. Please try again.");
  }
};

  return (
    <div className="checkout-page">
      <div className="container checkout-container">
        <Link to="/cart" className="back-btn">
          <i className="fa-solid fa-arrow-left"></i> Back to Cart
        </Link>

        <h2><i className="fa-solid fa-credit-card"></i> Checkout</h2>

        <Form id="checkoutForm">
          {/* Personal Info */}
          <div className="form-section">
            <h5><i className="fa-solid fa-user"></i> Personal Information</h5>
            <Form.Control 
              type="text" 
              className="mb-3" 
              placeholder="Full Name" 
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required 
            />
            <Form.Control 
              type="email" 
              className="mb-3" 
              placeholder="Email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
            <Form.Control 
              type="tel" 
              placeholder="Phone Number" 
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required 
            />
          </div>

          {/* Address */}
          <div className="form-section">
            <h5><i className="fa-solid fa-location-dot"></i> Shipping Address</h5>
            <Form.Control 
              type="text" 
              className="mb-3" 
              placeholder="Address Line 1" 
              value={address1}
              onChange={(e) => setAddress1(e.target.value)}
              required 
            />
            <Form.Control 
              type="text" 
              className="mb-3" 
              placeholder="Address Line 2 (optional)" 
              value={address2}
              onChange={(e) => setAddress2(e.target.value)}
            />
            <div className="row">
              <div className="col-md-6 mb-3">
                <Form.Control 
                  type="text" 
                  placeholder="City" 
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  required 
                />
              </div>
              <div className="col-md-4 mb-3">
                <Form.Control 
                  type="text" 
                  placeholder="State" 
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  required 
                />
              </div>
              <div className="col-md-2 mb-3">
                <Form.Control 
                  type="text" 
                  placeholder="PIN" 
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  required 
                />
              </div>
            </div>
          </div>

          {/* Payment */}
          <div className="form-section">
            <h5><i className="fa-solid fa-money-bill-wave"></i> Payment Method</h5>
            <Form.Select 
              className="mb-3" 
              id="paymentMethod" 
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              required
            >
              <option value="">Select Payment Method</option>
              <option value="cod">Cash on Delivery</option>
              <option value="upi">UPI</option>
              <option value="card">Credit/Debit Card</option>
            </Form.Select>
            
            {paymentMethod === "upi" && (
              <div id="upiFields">
                <Form.Control 
                  type="text" 
                  id="upiId" 
                  className="mb-3" 
                  placeholder="Enter UPI ID" 
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                />
              </div>
            )}
            
            {paymentMethod === "card" && (
              <div id="cardFields">
                <Form.Control 
                  type="text" 
                  id="cardNumber" 
                  className="mb-3" 
                  placeholder="Card Number (16 digits)" 
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                />
                <Form.Control 
                  type="text" 
                  id="expiry" 
                  className="mb-3" 
                  placeholder="Expiry Date (MM/YY)" 
                  value={expiry}
                  onChange={(e) => setExpiry(e.target.value)}
                />
                <Form.Control 
                  type="text" 
                  id="cvv" 
                  className="mb-3" 
                  placeholder="CVV (3 digits)" 
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
                />
              </div>
            )}
          </div>

          {/* Submit */}
          <Button 
            type="button" 
            className="btn btn-checkout" 
            onClick={handlePlaceOrder}
          >
            Place Order
          </Button>
        </Form>
      </div>

      {/* Order Summary Modal */}
      <Modal 
        show={showOrderSummary} 
        onHide={() => setShowOrderSummary(false)} 
        className="order-summary-modal"
        centered
      >
        <Modal.Header>
          <Modal.Title><i className="fa-solid fa-box"></i> Order Summary</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Your order has the following items:</p>
          <ul id="summaryItems" className="list-group mb-3">
            {cartItems.map((item, index) => (
              <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                {item.name} <span>{item.price} × {item.quantity}</span>
              </li>
            ))}
          </ul>
          <p><strong>Total:</strong> <span id="summaryTotal">₹{calculateTotal().toLocaleString()}</span></p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowOrderSummary(false)}>
            Cancel
          </Button>
          <Button variant="success" onClick={confirmOrder}>
            Confirm Order
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Checkout;