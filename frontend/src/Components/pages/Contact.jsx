import React from "react";
import './Contact.css';


const ContactUs = () => {
  return (
    <div className="contact-us">
      <div className="hero">
        <h1>Contact Us</h1>
      </div>
      <div className="info-section">
        <h2>We're here to help.</h2>
        <p>
          We are committed to providing exceptional customer service and are
          here to assist you with any questions or concerns you may have.
          Here's how you can get in touch with us:
        </p>
        <hr />
        <div className="contact-cards">
          <div className="card">
            <h3>Phone 1</h3>
            <p>+977-9841223879</p>
          </div>
          <div className="card">
            <h3>Phone 2</h3>
            <p>+977-9803336211</p>
          </div>
          <div className="card">
            <h3>Phone 3</h3>
            <p>+977-9849335104</p>
          </div>
          <div className="card">
            <h3>E-Mail</h3>
            <p>UrbanRides@outlook.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
