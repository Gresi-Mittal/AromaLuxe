import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { generateOTP, validateEmail, validatePhone, setLoggedInUser } from '../utils';

const LoginModal = ({ show, onHide, onLoginSuccess }) => {
  const [activeForm, setActiveForm] = useState('login');
  const [loginPhone, setLoginPhone] = useState('');
  const [loginOtp, setLoginOtp] = useState('');
  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPhone, setSignupPhone] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupOtp, setSignupOtp] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [generatedOTP, setGeneratedOTP] = useState('');
  const [showOtpSection, setShowOtpSection] = useState(false);

  const toggleForm = () => {
    setActiveForm(activeForm === 'login' ? 'signup' : 'login');
    setEmailError('');
    setPhoneError('');
    setShowOtpSection(false);
  };

  const validateFormEmail = () => {
    const isValid = validateEmail(signupEmail);
    if (!isValid) {
      setEmailError('Invalid email format');
    } else {
      setEmailError('');
    }
    return isValid;
  };

  const validateFormPhone = (phone) => {
    const isValid = validatePhone(phone);
    if (!isValid) {
      setPhoneError('Invalid mobile number (10 digits required)');
    } else {
      setPhoneError('');
    }
    return isValid;
  };

  const requestOTP = (formType) => {
    const phone = formType === 'login' ? loginPhone : signupPhone;
    
    if (!validateFormPhone(phone)) return;
    if (formType === 'signup' && !validateFormEmail()) return;

    const otp = generateOTP();
    setGeneratedOTP(otp);
    alert(`Your OTP is: ${otp}`);
    setShowOtpSection(true);
  };

  const validateOTP = async (formType) => {
  const enteredOTP = formType === 'login' ? loginOtp : signupOtp;

  if (enteredOTP === generatedOTP.toString()) {
    alert("✅ OTP Verified Successfully!");
let userPayload;
let endpoint;

if (formType === 'signup') {
  userPayload = {
    name: signupName,
    email: signupEmail,
    phone: signupPhone,
    password: signupPassword
  };
  endpoint = '/api/signup';
} else {
  userPayload = { phone: loginPhone };
  endpoint = '/api/login';
}



    try {
      const endpoint = formType === 'login' ? '/api/login' : '/api/signup';

      const res = await fetch(`http://localhost:5000${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userPayload),
      });

      const data = await res.json();

      if (res.ok) {
        setLoggedInUser(data); // your backend directly returns the user object
        alert("🎉 Logged in successfully!");
        onLoginSuccess();
      } else {
        alert(data.message || 'Login/Signup failed');
      }

    } catch (err) {
      console.error(err);
      alert("Something went wrong while contacting the server.");
    }
  } else {
    alert("❌ Invalid OTP. Please try again.");
  }
};


    

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>{activeForm === 'login' ? 'Login' : 'Sign Up'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {activeForm === 'login' ? (
          <Form id="loginForm">
            <Form.Group className="mb-3">
              <Form.Control
                type="tel"
                placeholder="Enter Mobile Number"
                value={loginPhone}
                onChange={(e) => setLoginPhone(e.target.value)}
                required
              />
              {phoneError && <div className="error">{phoneError}</div>}
            </Form.Group>
            <Button variant="primary" onClick={() => requestOTP('login')}>
              Request OTP
            </Button>
            
            {showOtpSection && (
              <div className="mt-3">
                <Form.Control
                  type="text"
                  placeholder="Enter OTP"
                  value={loginOtp}
                  onChange={(e) => setLoginOtp(e.target.value)}
                  className="mt-2"
                />
                <Button variant="success" onClick={() => validateOTP('login')} className="mt-2">
                  Validate OTP
                </Button>
              </div>
            )}
          </Form>
        ) : (
          <Form id="signupForm">
            <Form.Group className="mb-2">
              <Form.Control
                type="text"
                placeholder="Full Name"
                value={signupName}
                onChange={(e) => setSignupName(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Control
                type="email"
                placeholder="Email"
                value={signupEmail}
                onChange={(e) => {
                  setSignupEmail(e.target.value);
                  validateFormEmail();
                }}
                required
              />
              {emailError && <div className="error">{emailError}</div>}
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Control
                type="tel"
                placeholder="Phone Number"
                value={signupPhone}
                onChange={(e) => {
                  setSignupPhone(e.target.value);
                  validateFormPhone(e.target.value);
                }}
                required
              />
              {phoneError && <div className="error">{phoneError}</div>}
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Control
                type="password"
                placeholder="Password"
                value={signupPassword}
                onChange={(e) => setSignupPassword(e.target.value)}
                required
              />
            </Form.Group>
            <Button variant="primary" onClick={() => requestOTP('signup')}>
              Request OTP
            </Button>
            
            {showOtpSection && (
              <div className="mt-3">
                <Form.Control
                  type="text"
                  placeholder="Enter OTP"
                  value={signupOtp}
                  onChange={(e) => setSignupOtp(e.target.value)}
                  className="mt-2"
                />
                <Button variant="success" onClick={() => validateOTP('signup')} className="mt-2">
                  Validate OTP
                </Button>
              </div>
            )}
          </Form>
        )}
        
        <div className="text-center mt-3">
          <Button variant="link" onClick={toggleForm}>
            {activeForm === 'login' 
              ? "Don't have an account? Sign Up" 
              : "Already have an account? Login"}
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default LoginModal;