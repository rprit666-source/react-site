import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchPropertyById } from "../api/propertyService";
import { bookProperty } from "../api/bookingService";

const PropertyDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);

  useEffect(() => {
    const loadPropertyDetails = async () => {
      try {
        const data = await fetchPropertyById(id);
        setProperty(data);
      } catch (err) {
        setError(
          "Sorry, this property is not available or could not be found."
        );
      } finally {
        setLoading(false);
      }
    };

    loadPropertyDetails();
  }, [id]);

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login to book a property.");
      navigate("/login");
      return;
    }

    if (!checkIn || !checkOut) {
      alert("Please select check-in and check-out dates.");
      return;
    }

    try {
      const bookingData = {
        propertyId: id,
        check_in_date: checkIn,
        check_out_date: checkOut,
      };
      await bookProperty(bookingData);
      alert("Booking request sent successfully!");
      navigate("/my-bookings");
    } catch (err) {
      alert(err.message || "Could not send booking request.");
    }
  };

  if (loading) {
    return (
      <div className="container" style={{ padding: "3rem 0" }}>
        <p>Loading property details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container" style={{ padding: "3rem 0" }}>
        <p style={{ color: "red" }}>{error}</p>
      </div>
    );
  }

  if (!property) {
    return null;
  }

  const amenitiesArray =
    property.amenities && Array.isArray(property.amenities)
      ? property.amenities
      : [];

  return (
    <main className="page-main-content">
      <div className="container">
        <div className="property-header">
          <h1>{property.title}</h1>
          <p>
            <i className="fas fa-map-marker-alt"></i> {property.location}
          </p>
        </div>

        <div className="gallery-grid">
          <div className="main-image">
            <img
              src={`http://localhost:5000/uploads/properties/${
                property.images[0] || "default.jpg"
              }`}
              alt="Main property view"
            />
          </div>
          <div className="thumbnail-images">
            <img
              src={`http://localhost:5000/uploads/properties/${
                property.images[1] || "default.jpg"
              }`}
              alt="Thumbnail 1"
            />
            <img
              src={`http://localhost:5000/uploads/properties/${
                property.images[2] || "default.jpg"
              }`}
              alt="Thumbnail 2"
            />
            <img
              src={`http://localhost:5000/uploads/properties/${
                property.images[3] || "default.jpg"
              }`}
              alt="Thumbnail 3"
            />
            <div className="show-all-photos">
              <i className="fas fa-th"></i>
              <span>{property.images.length} Photos</span>
            </div>
          </div>
        </div>

        <div className="property-body-grid">
          <div className="property-description">
            <h2>
              Entire {property.property_type.toLowerCase()} hosted by{" "}
              {property.user?.full_name || "Owner"}
            </h2>
            <p style={{ whiteSpace: "pre-wrap" }}>{property.description}</p>
          </div>
          <div className="booking-card glass-form-card">
            <h3>
              <strong>₹{property.price.toLocaleString()}</strong> / night
            </h3>

            {property.availability === "available" ? (
              <form onSubmit={handleBookingSubmit}>
                <div className="form-group">
                  <label>CHECK-IN</label>
                  <input
                    type="date"
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>CHECK-OUT</label>
                  <input
                    type="date"
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>GUESTS</label>
                  <select
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                    required
                  >
                    <option value="1">1 Guest</option>
                    <option value="2">2 Guests</option>
                    <option value="3">3 Guests</option>
                    <option value="4">4 Guests</option>
                    <option value="5">5 Guests</option>
                  </select>
                </div>
                <button type="submit" className="btn btn-accent book-btn">
                  Book Now
                </button>
              </form>
            ) : (
              <div
                className="unavailable-message"
                style={{
                  textAlign: "center",
                  padding: "2rem",
                  background: "#f8d7da",
                  borderRadius: "8px",
                }}
              >
                <p style={{ color: "#721c24", fontWeight: "bold" }}>
                  Sorry, this property is currently unavailable for booking.
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="display-section">
          <h2>What this place offers</h2>
          <div className="display-list">
            {amenitiesArray.map((amenity, index) => (
              <div className="display-item" key={index}>
                <i
                  className="fas fa-check-circle"
                  style={{ color: "var(--primary-color)" }}
                ></i>{" "}
                {amenity}
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default PropertyDetailsPage;
