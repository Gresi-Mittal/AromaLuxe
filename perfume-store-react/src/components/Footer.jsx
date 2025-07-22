import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubscribe = async () => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    setMessage("Please enter a valid email address.");
    return;
  }

  try {
const response = await fetch(`${process.env.REACT_APP_API_URL}/api/subscribe`, {

      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email })
    });

    const data = await response.json();

    if (response.ok) {
      setMessage("Thank you for subscribing!");
      setEmail('');
    } else {
      setMessage(data.message || "Subscription failed.");
    }
  } catch (error) {
    console.error("Error subscribing:", error);
    setMessage("Something went wrong. Please try again.");
  }
};


  return (
    <footer className="footer">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-3">
            <h5>Help & Information</h5>
            <Link to="/about">About Us</Link>
            <Link to="/contact">Contact Us</Link>
          </div>
          
          <div className="col-md-1 d-flex justify-content-center">
            <div className="footer-divider"></div>
          </div>
          
          <div className="col-md-3 subscribe-box">
            <h5>Sign Up for more information</h5>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control mt-2" 
              placeholder="Enter your email address" 
            />
            <button className="mt-2" onClick={handleSubscribe}>SUBSCRIBE</button>
            {message && <p className="message">{message}</p>}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;