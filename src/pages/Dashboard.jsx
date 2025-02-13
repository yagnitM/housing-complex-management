import React from "react";
import { Link } from "react-router-dom";
import "./Dashboard.css";

const Dashboard = () => {
  return (
    <main className="dashboard-main">
      <header className="dashboard-header">
        <h1>Welcome to the Dashboard</h1>
        <p>Your central hub for managing the housing complex efficiently.</p>
      </header>
      
      <Link to="/" className="logout-button">
        <button>Logout</button>
      </Link>

      {/* Centered Add Your Society Card */}
      <div className="centered-card">
        <Link to="/add-society" className="feature-card add-society-card">
          <h3>Add Your Society</h3>
          <p>Add a new residential society to manage apartments within it.</p>
        </Link>
      </div>

      {/* 2x5 Grid Layout */}
      <section className="feature-grid">
        <Link to="/residents" className="feature-card">
          <h3>Manage Residents</h3>
          <p>View and manage resident details with ease.</p>
        </Link>
        <Link to="/complaints" className="feature-card">
          <h3>Track Complaints</h3>
          <p>Monitor and resolve resident complaints quickly.</p>
        </Link>
        <Link to="/finances" className="feature-card">
          <h3>Financial Overview</h3>
          <p>Access financial records and budgets.</p>
        </Link>
        <Link to="/events" className="feature-card">
          <h3>Community Events</h3>
          <p>Plan and manage events in the complex.</p>
        </Link>
        <Link to="/maintenance" className="feature-card">
          <h3>Maintenance Requests</h3>
          <p>Handle maintenance tasks efficiently.</p>
        </Link>
        <Link to="/announcements" className="feature-card">
          <h3>Announcements</h3>
          <p>Post and view community updates.</p>
        </Link>
        <Link to="/search" className="feature-card">
          <h3>Search</h3>
          <p>Find information quickly with advanced search.</p>
        </Link>
        <Link to="/reports" className="feature-card">
          <h3>Reports</h3>
          <p>Generate detailed reports on activities.</p>
        </Link>
      </section>
    </main>
  );
};

export default Dashboard;
