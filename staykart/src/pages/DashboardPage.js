import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  getRequests,
  getAllUserBookings,
  updateBookingStatusById,
} from "../api/dashboardService";

const DashboardPage = () => {
  const [requests, setRequests] = useState([]);
  const [allBookings, setAllBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [requestsData, allBookingsData] = await Promise.all([
        getRequests(),
        getAllUserBookings(),
      ]);
      setRequests(requestsData);
      setAllBookings(allBookingsData);
    } catch (error) {
      setError(
        "Failed to fetch dashboard data. Please make sure you are logged in."
      );
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (bookingId, status) => {
    try {
      await updateBookingStatusById(bookingId, status);
      fetchDashboardData();
    } catch (err) {
      alert("Failed to update booking status.");
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "approved":
        return "#28a745"; // Green
      case "rejected":
      case "cancelled":
        return "#dc3545"; // Red
      default:
        return "#343a40"; // Black for pending
    }
  };

  if (loading)
    return (
      <div className="container" style={{ padding: "3rem 0" }}>
        <p>Loading dashboard...</p>
      </div>
    );
  if (error)
    return (
      <div className="container" style={{ padding: "3rem 0" }}>
        <p style={{ color: "red" }}>{error}</p>
      </div>
    );

  return (
    <div className="container" style={{ padding: "3rem 0" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "2.5rem",
        }}
      >
        <h1 style={{ fontFamily: "var(--font-heading)" }}>Dashboard</h1>
        <Link to="/manage-properties" className="btn btn-accent">
          Manage Properties
        </Link>
      </div>

      {}
      <div
        className="booking-requests-section"
        style={{ marginBottom: "3rem" }}
      >
        <h2
          style={{
            fontFamily: "var(--font-heading)",
            color: "var(--primary-color)",
          }}
        >
          New Booking Requests
        </h2>
        {requests.length > 0 ? (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ backgroundColor: "#f7f9f9" }}>
                <th style={{ padding: "1rem", textAlign: "left" }}>
                  Property Name
                </th>
                <th style={{ padding: "1rem", textAlign: "left" }}>
                  Booked By
                </th>
                <th style={{ padding: "1rem", textAlign: "left" }}>Dates</th>
                <th style={{ padding: "1rem", textAlign: "right" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((booking) => (
                <tr
                  key={booking._id}
                  style={{ borderBottom: "1px solid #ecf0f1" }}
                >
                  <td style={{ padding: "1rem" }}>{booking.property.title}</td>
                  <td style={{ padding: "1rem" }}>{booking.user.full_name}</td>
                  <td style={{ padding: "1rem" }}>
                    {new Date(booking.check_in_date).toLocaleDateString()} -{" "}
                    {new Date(booking.check_out_date).toLocaleDateString()}
                  </td>
                  <td style={{ textAlign: "right" }}>
                    <button
                      onClick={() =>
                        handleStatusUpdate(booking._id, "approved")
                      }
                      className="btn btn-primary"
                      style={{ padding: "5px 10px", fontSize: "0.9rem" }}
                    >
                      Approve
                    </button>
                    <button
                      onClick={() =>
                        handleStatusUpdate(booking._id, "rejected")
                      }
                      className="btn btn-accent"
                      style={{
                        marginLeft: "5px",
                        padding: "5px 10px",
                        fontSize: "0.9rem",
                      }}
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>You have no new booking requests.</p>
        )}
      </div>

      {}
      <div className="all-bookings-section">
        <h2
          style={{
            fontFamily: "var(--font-heading)",
            color: "var(--primary-color)",
          }}
        >
          All Bookings Record
        </h2>
        {allBookings.length > 0 ? (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ backgroundColor: "#f7f9f9" }}>
                <th style={{ padding: "1rem", textAlign: "left" }}>Property</th>
                <th style={{ padding: "1rem", textAlign: "left" }}>
                  Booked By
                </th>
                <th style={{ padding: "1rem", textAlign: "left" }}>Dates</th>
                <th style={{ padding: "1rem", textAlign: "left" }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {allBookings.map((booking) => (
                <tr
                  key={booking._id}
                  style={{ borderBottom: "1px solid #ecf0f1" }}
                >
                  <td style={{ padding: "1rem" }}>{booking.property.title}</td>
                  <td style={{ padding: "1rem" }}>{booking.user.full_name}</td>
                  <td style={{ padding: "1rem" }}>
                    {new Date(booking.check_in_date).toLocaleDateString()} -{" "}
                    {new Date(booking.check_out_date).toLocaleDateString()}
                  </td>
                  <td
                    style={{
                      padding: "1rem",
                      fontWeight: "bold",
                      color: getStatusColor(booking.status),
                      textTransform: "capitalize",
                    }}
                  >
                    {booking.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No booking history found.</p>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
