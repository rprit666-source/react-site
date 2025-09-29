import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../api/authService";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const data = await register(formData);
      alert(data.message);
      navigate("/login");
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
            <h2>Create Account</h2>
            <p>Join our community.</p>
          </div>
          {error && (
            <p style={{ color: "red", textAlign: "center" }}>{error}</p>
          )}
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="full_name">Full Name</label>
              <input
                type="text"
                name="full_name"
                id="full_name"
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="email">Email Address</label>
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
              Create Account
            </button>
          </form>
          <div className="form-switch">
            <p>
              Already have an account? <Link to="/login">Sign In</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
