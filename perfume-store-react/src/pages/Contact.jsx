import React from 'react';
import InfoSection from '../components/InfoSection';

const Contact = () => {
  return (
    <div className="contact-page">
      <section className="help-contact">
        <h2>HELP & CONTACT</h2>
        <div className="contact-container">
          <h3>HAVE A QUESTION</h3>
          <div className="contact-methods">
            <div className="contact-box">
              <i className="fas fa-envelope"></i>
              <p>Email us at</p>
              <a href="mailto:customercare@aroma.co.in">customercare@aroma.co.in</a>
            </div>
            <div className="contact-box">
              <i className="fas fa-phone-alt"></i>
              <p>Call us at</p>
              <span>1800-266-0123</span>
            </div>
            <div className="contact-box">
              <i className="fas fa-comment-dots"></i>
              <p>Chat with us</p>
              <span>+917795702385</span>
            </div>
          </div>
        </div>

        <div className="faq">
          <h4>Do I need to pay shipping delivery charges?</h4>
          <p>
            There are no shipping/delivery charges within India. For information on shipping charges 
            for international orders, please see the Shipping and Handling Charges section under the 
            Shipping Policy section.
          </p>
        </div>
      </section>
      
      <InfoSection />
    </div>
  );
};

export default Contact;