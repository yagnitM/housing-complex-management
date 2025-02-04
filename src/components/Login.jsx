import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // Stored credentials for admin and residents
  const adminCredentials = { email: "admin@example.com", password: "Admin123!" };
  const residentCredentials = { email: "user@example.com", password: "Password123!" };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage("");

    // Validate input
    if (!email || !password) {
      setErrorMessage("All fields are required.");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);

      if (email === adminCredentials.email && password === adminCredentials.password) {
        localStorage.setItem("role", "admin"); // Store role
        navigate("/dashboard"); // Redirect to admin dashboard
      } else if (email === residentCredentials.email && password === residentCredentials.password) {
        localStorage.setItem("role", "resident"); // Store role
        navigate("/residashboard"); // Redirect to resident dashboard
      } else {
        setErrorMessage("Invalid credentials. Please try again.");
      }
    }, 2000); // Simulated API delay
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {errorMessage && <p className="error">{errorMessage}</p>}
        {loading ? <p>Loading...</p> : <button type="submit">Login</button>}
      </form>
      <p>
        Don't have an account? <Link to="/signup">Sign up</Link>
      </p>
    </div>
  );
};

export default Login;
