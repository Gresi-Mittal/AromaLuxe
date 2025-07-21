import React from 'react';
import { Link } from 'react-router-dom';

const ThankYou = () => {
  return (
    <div className="thank-you-page text-center py-5">
      <div className="container">
        <div className="checkmark-circle">
          <div className="checkmark">✓</div>
        </div>
        <h1 className="mt-4">Thank You!</h1>
        <p className="lead">Your order has been placed successfully.</p>
        <p>You will receive a confirmation email shortly.</p>
        <Link to="/home" className="btn btn-primary mt-4">
          Continue Shopping
        </Link>
      </div>
    </div>
  );
};

export default ThankYou;