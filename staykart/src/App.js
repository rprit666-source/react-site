import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/common/Header";
import Footer from "./components/common/Footer";

import HomePage from "./pages/HomePage";
import PropertyDetailsPage from "./pages/PropertyDetailsPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import AddPropertyPage from "./pages/AddPropertyPage";
import ManagePropertiesPage from "./pages/ManagePropertiesPage"; // <-- PAGE KO IMPORT KAREIN
import AdminManageProperties from "./pages/admin/AdminManageProperties";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminManageUsers from "./pages/admin/AdminManageUsers";
import EditPropertyPage from "./pages/EditPropertyPage";
import MyBookingsPage from "./pages/MyBookingsPage";
import PropertiesPage from "./pages/PropertiesPage";
import AboutPage from "./pages/AboutPage";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/add-property" element={<AddPropertyPage />} />
          <Route path="/admin" element={<AdminDashboard />}>
            <Route
              path="manage-properties"
              element={<AdminManageProperties />}
            />
            <Route path="manage-users" element={<AdminManageUsers />} />
          </Route>
          <Route path="/admin" element={<AdminDashboard />}>
            <Route
              path="manage-properties"
              element={<AdminManageProperties />}
            />
            <Route path="manage-users" element={<AdminManageUsers />} />
          </Route>
          {}
          <Route path="/manage-properties" element={<ManagePropertiesPage />} />
          <Route
            path="/admin/manage-properties"
            element={<AdminManageProperties />}
          />
          <Route path="/property/:id" element={<PropertyDetailsPage />} />
          <Route path="/edit-property/:id" element={<EditPropertyPage />} />
          <Route path="/my-bookings" element={<MyBookingsPage />} />
          <Route path="/properties" element={<PropertiesPage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
