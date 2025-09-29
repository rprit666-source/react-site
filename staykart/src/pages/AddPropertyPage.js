import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createProperty } from "../api/propertyService";

const AddPropertyPage = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    property_type: "Farmhouse",
    location: "",
    price: "",
  });
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) {
      setError("Please upload an image.");
      return;
    }
    setLoading(true);
    setError("");

    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("property_type", formData.property_type);
    data.append("location", formData.location);
    data.append("price", formData.price);
    data.append("image", image);

    try {
      await createProperty(data);
      alert("Property added successfully!");
      navigate("/manage-properties");
    } catch (err) {
      setError(err.message || "Failed to add property. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-main-content">
      <div className="container">
        <div className="page-title">
          <h1>List Your Unique Property</h1>
          <p>Join our curated collection of unique stays.</p>
        </div>
        {error && (
          <p
            style={{ color: "red", textAlign: "center", marginBottom: "1rem" }}
          >
            {error}
          </p>
        )}
        <form
          className="add-property-form glass-form-card"
          onSubmit={handleSubmit}
        >
          <div className="form-section">
            <h3>
              <i className="fas fa-home"></i> Property Basics
            </h3>
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="title">Property Title</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  placeholder="e.g., The Serene Villa"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="type">Property Type</label>
                <select
                  id="type"
                  name="property_type"
                  onChange={handleChange}
                  value={formData.property_type}
                  required
                >
                  <option value="Farmhouse">Farmhouse</option>
                  <option value="Pool Farmhouse">Pool Farmhouse</option>
                  <option value="Hotel">Hotel</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="location">Location</label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  placeholder="e.g., Dumas, Surat"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="price">Price (per night)</label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  placeholder="e.g., 15000"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                rows="5"
                placeholder="Tell us what makes your place special..."
                onChange={handleChange}
                required
              ></textarea>
            </div>
          </div>
          <div className="form-section">
            <h3>
              <i className="fas fa-images"></i> Photo
            </h3>
            <div className="image-upload-box">
              <i className="fas fa-cloud-upload-alt"></i>
              <p>
                <span>Browse</span> to upload a photo.
              </p>
              <input
                type="file"
                name="image"
                className="file-input"
                onChange={handleImageChange}
                required
              />
            </div>
          </div>
          <div className="form-actions">
            <button type="submit" className="btn btn-accent" disabled={loading}>
              {loading ? "Submitting..." : "Submit Property"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPropertyPage;
