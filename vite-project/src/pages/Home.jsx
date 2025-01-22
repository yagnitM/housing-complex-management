import React from "react";
import { Link } from "react-router-dom";
import residentImage from "../assets/resident-management.jpg";
import complaintImage from "../assets/complaint-tracking.jpg";
import financialImage from "../assets/financial-report.jpg";
import paymentImage from "../assets/payment-reminder.jpg";
import communityImage from "../assets/community-notices.jpg";
import eventImage from "../assets/event-scheduling.jpg";
import secureImage from "../assets/secure-login.jpg";
import customizeImage from "../assets/customizable-setting.jpg";
import supportImage from "../assets/support.jpg";

const Home = () => {
  return (
    <main className="home-main">
      <h1>WELCOME TO HOUSINGFY</h1>
      <p>Manage residents, complaints, and finances with ease.</p>

      <div className="auth-links">
        <h3>Please Log In or Sign Up</h3>
        <Link to="/login" className="auth-link">Login</Link>
        <Link to="/signup" className="auth-link">Sign Up</Link>
      </div>

      <section className="features-grid">
        <h2>Our Key Features</h2>
        <div className="grid">
          <div className="grid-item">
            <img src={residentImage} alt="Resident Management" />
            <h3>Resident Management</h3>
            <p>Keep track of all residents efficiently.</p>
          </div>
          <div className="grid-item">
            <img src={complaintImage} alt="Complaint Tracking" />
            <h3>Complaint Tracking</h3>
            <p>Log and monitor complaints easily.</p>
          </div>
          <div className="grid-item">
            <img src={financialImage} alt="Financial Reports" />
            <h3>Financial Reports</h3>
            <p>Stay updated on finances with detailed reports.</p>
          </div>
          <div className="grid-item">
            <img src={paymentImage} alt="Payment Reminders" />
            <h3>Payment Reminders</h3>
            <p>Automatic reminders for maintenance dues.</p>
          </div>
          <div className="grid-item">
          <img src={communityImage} alt="Community Notices" className="community-notices-img" />
            <h3>Community Notices</h3>
            <p>Broadcast important updates to all residents.</p>
          </div>
          <div className="grid-item">
            <img src={eventImage} alt="Event Scheduling" />
            <h3>Event Scheduling</h3>
            <p>Plan and manage community events effortlessly.</p>
          </div>
          <div className="grid-item">
            <img src={secureImage} alt="Secure Access" />
            <h3>Secure Access</h3>
            <p>Only authorized users can log in.</p>
          </div>
          <div className="grid-item">
            <img src={customizeImage} alt="Customizable Settings" />
            <h3>Customizable Settings</h3>
            <p>Personalize the platform to suit your needs.</p>
          </div>
          <div className="grid-item">
            <img src={supportImage} alt="24/7 Support" />
            <h3>24/7 Support</h3>
            <p>Get help anytime with our dedicated support team.</p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
