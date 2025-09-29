import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

const AdminDashboard = () => {
  const location = useLocation();

  return (
    <div
      className="container"
      style={{ padding: "3rem 0", display: "flex", gap: "2rem" }}
    >
      <main style={{ flexGrow: 1 }}>
        {/* Yahan child routes (properties/users page) render honge */}
        <Outlet />
      </main>
    </div>
  );
};

export default AdminDashboard;
