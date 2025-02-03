import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage("");

    // Validate input
    if (!email || !password) {
      setErrorMessage("All fields are required.");
      return;
    }

    // Simulated login logic (replace with actual API later)
    const mockUsers = [
      { email: "user@example.com", password: "Password123!" },
      { email: "admin@example.com", password: "Admin123!" },
    ];

    const user = mockUsers.find((u) => u.email === email && u.password === password);
    if (user) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        navigate("/Dashboard");
      }, 2000); // Simulate API delay
    } else {
      setErrorMessage("Invalid credentials. Please try again.");
    }
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
