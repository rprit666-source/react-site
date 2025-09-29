import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../api/authService";

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const data = await login(formData);
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      if (data.user.role === "admin") {
        navigate("/admin/manage-properties");
      } else {
        navigate("/");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="main_div">
      <div className="img_side">
        <div className="promo-overlay">
          <Link to="/" className="logo">
            StayKart.
          </Link>
        </div>
      </div>
      <div className="form_side">
        <div className="form-box">
          <div className="form-header">
            <h2>Welcome Back</h2>
            <p>Please sign in.</p>
          </div>
          {error && (
            <p style={{ color: "red", textAlign: "center" }}>{error}</p>
          )}
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="action-btn">
              Sign In
            </button>
          </form>
          <div className="form-switch">
            <p>
              No account? <Link to="/register">Sign Up</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
