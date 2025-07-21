import React from 'react';

const InfoSection = () => {
  return (
    <div className="info-section">
      <div className="info-box">
        <img src="https://img.icons8.com/ios/50/000000/guarantee.png" alt="Original" />
        <div className="info-text">
          <h3>100% ORIGINAL</h3>
          <p>All products are original and go through strict quality check.</p>
        </div>
      </div>
      
      <div className="info-box">
        <img src="https://img.icons8.com/ios/50/000000/return-purchase.png" alt="Return" />
        <div className="info-text">
          <h3>7 Day RETURN</h3>
          <p>Use our hassle-free method to return.</p>
        </div>
      </div>

      <div className="info-box">
        <img src="https://img.icons8.com/ios/50/000000/shipped.png" alt="Shipping" />
        <div className="info-text">
          <h3>Shipping</h3>
          <p>Free Shipping & Returns all across India.</p>
        </div>
      </div>
    </div>
  );
};

export default InfoSection;