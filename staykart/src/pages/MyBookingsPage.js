import React, { useState, useEffect } from "react";
import { getMyBookings } from "../api/bookingService";

const MyBookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const data = await getMyBookings();
        setBookings(data);
      } catch (err) {
        setError("Could not fetch bookings.");
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  const getStatusColor = (status) => {
    // ... your getStatusColor function ...
  };

  if (loading)
    return (
      <div className="container">
        <p>Loading your bookings...</p>
      </div>
    );
  if (error)
    return (
      <div className="container">
        <p style={{ color: "red" }}>{error}</p>
      </div>
    );

  return (
    <main className="page-main-content">
      <div className="container">
        <div className="page-title">
          <h1>My Bookings</h1>
        </div>
        <div className="bookings-list">
          {bookings.length > 0 ? (
            bookings.map(
              (booking) =>
                booking.property && (
                  <div
                    key={booking._id}
                    className="booking-card"
                    style={{
                      display: "flex",
                      background: "#fff",
                      marginBottom: "1.5rem",
                      borderRadius: "10px",
                    }}
                  >
                    <img
                      src={`http://localhost:5000/uploads/properties/${
                        booking.property.images[0] || "default.jpg"
                      }`}
                      alt={booking.property.title}
                      style={{ width: "200px", objectFit: "cover" }}
                    />
                    <div
                      className="booking-details"
                      style={{ padding: "1.5rem" }}
                    >
                      <h4>{booking.property.title}</h4>
                      <p>
                        <strong>Check-in:</strong>{" "}
                        {new Date(booking.check_in_date).toLocaleDateString()}
                      </p>
                      <p>
                        <strong>Check-out:</strong>{" "}
                        {new Date(booking.check_out_date).toLocaleDateString()}
                      </p>
                      <p>
                        <strong>Status:</strong>{" "}
                        <span style={{ color: getStatusColor(booking.status) }}>
                          {booking.status}
                        </span>
                      </p>
                    </div>
                  </div>
                )
            )
          ) : (
            <p>You have no bookings yet.</p>
          )}
        </div>
      </div>
    </main>
  );
};

export default MyBookingsPage;
