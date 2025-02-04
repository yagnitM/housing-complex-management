import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home"; 
import Login from "./components/Login";
import Signup from "./components/Signup";
import Dashboard from "./pages/Dashboard";  
import ResiDashboard from "./pages/ResiDashboard";
import About from "./components/About"; 
import Services from "./components/Services";
import CommunityNotices from "./components/CommunityNotices";
import ContactUs from "./components/ContactUs";

function App() {
  const location = useLocation();

  return (
    <>
      {/* Conditionally render Header based on the route */}
      {location.pathname !== "/dashboard" && <Header />}
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/residashboard" element={<ResiDashboard />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/community-notices" element={<CommunityNotices />} />
          <Route path="/contact-us" element={<ContactUs />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
