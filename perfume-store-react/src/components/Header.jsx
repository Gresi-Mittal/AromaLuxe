import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getLoggedInUser } from '../utils';
import LoginModal from './LoginModal';
import ProfileModal from './ProfileModal';

const Header = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const user = getLoggedInUser();
  const navigate = useNavigate();

  const openUserProfile = () => {
    if (user) {
      setShowProfileModal(true);
    } else {
      setShowLoginModal(true);
    }
  };

  const openCart = () => {
    navigate('/cart');
  };

  return (
    <header>
      <div className="logo">
        <Link to="/">
          <img src="/images/Preview.png" alt="Logo" />
        </Link>
      </div>
      <nav>
        <Link to="/home">Home</Link>
        <Link to="/products">Products</Link>
        <Link to="/contact">Contact Us</Link>
        <Link to="/about">About Us</Link>
      </nav>
      <div className="icons">
        <button onClick={openUserProfile}>
          <img src="https://img.icons8.com/ios/50/user.png" alt="User" />
        </button>
        <button onClick={openCart}>
          <img src="https://img.icons8.com/ios/50/shopping-cart.png" alt="Cart" />
        </button>
      </div>

      <LoginModal 
        show={showLoginModal} 
        onHide={() => setShowLoginModal(false)} 
        onLoginSuccess={() => {
          setShowLoginModal(false);
          window.location.reload();
        }} 
      />
      
      <ProfileModal 
        show={showProfileModal} 
        onHide={() => setShowProfileModal(false)} 
      />
    </header>
  );
};

export default Header;