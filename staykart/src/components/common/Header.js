import React from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import "../../assets/css/admin.css";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem("token");
  const isLoggedIn = !!token;
  const isAdminPage = location.pathname.startsWith("/admin");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
    window.location.reload();
  };

  if (isAdminPage && isLoggedIn) {
    return (
      <header className="admin-header">
        <div className="container">
          <Link to="/admin/manage-properties" className="logo">
            StayKart Admin
          </Link>

          {}
          <nav className="admin-nav">
            <NavLink to="/admin/manage-properties">Manage Properties</NavLink>
            <NavLink to="/admin/manage-users">Manage Users</NavLink>
          </nav>

          <div className="header-actions">
            <button onClick={handleLogout} className="btn-logout">
              Logout
            </button>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="main-header">
      <div className="container">
        <Link to="/" className="logo">
          StayKart
        </Link>
        <nav className="main-nav">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <a href="/#categories">Categories</a>
            </li>
            <li>
              <a href="/#featured">Residences</a>
            </li>
            {isLoggedIn && (
              <li>
                <Link to="/my-bookings">My Bookings</Link>
              </li>
            )}
          </ul>
        </nav>
        <div
          className="header-actions"
          style={{ display: "flex", gap: "1rem", alignItems: "center" }}
        >
          {isLoggedIn ? (
            <>
              <Link to="/dashboard" className="btn btn-primary">
                Dashboard
              </Link>
              <button onClick={handleLogout} className="btn btn-accent">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-primary">
                Login
              </Link>
              <Link to="/register" className="btn btn-accent">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
