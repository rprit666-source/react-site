import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchPropertyById, updatePropertyById } from "../api/propertyService";

const EditPropertyPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    property_type: "Farmhouse",
    location: "",
    price: "",
  });
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadProperty = async () => {
      try {
        const data = await fetchPropertyById(id);
        setFormData({
          title: data.title,
          description: data.description,
          property_type: data.property_type,
          location: data.location,
          price: data.price,
        });
      } catch (err) {
        setError("Could not load property data. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    loadProperty();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImages(e.target.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    Object.keys(formData).forEach((key) => data.append(key, formData[key]));

    if (images.length > 0) {
      for (let i = 0; i < images.length; i++) {
        data.append("images", images[i]);
      }
    }

    try {
      await updatePropertyById(id, data);
      alert("Property updated successfully!");
      navigate("/manage-properties");
    } catch (err) {
      setError(err.message || "Failed to update property.");
    } finally {
      setLoading(false);
    }
  };

  if (loading)
    return (
      <p className="container" style={{ padding: "3rem 0" }}>
        Loading property details...
      </p>
    );
  if (error)
    return (
      <p className="container" style={{ padding: "3rem 0", color: "red" }}>
        {error}
      </p>
    );

  return (
    <div className="page-main-content">
      <div className="container">
        <div className="page-title">
          <h1>Edit Your Property</h1>
        </div>
        <form
          className="add-property-form glass-form-card"
          onSubmit={handleSubmit}
        >
          {}
          <div className="form-section">
            <h3>
              <i className="fas fa-home"></i> Property Basics
            </h3>
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="title">Property Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="property_type">Property Type</label>
                <select
                  name="property_type"
                  value={formData.property_type}
                  onChange={handleChange}
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
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="price">Price (per night)</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                name="description"
                rows="5"
                value={formData.description}
                onChange={handleChange}
                required
              ></textarea>
            </div>
          </div>

          {}
          <div className="form-section">
            <h3>
              <i className="fas fa-images"></i> Photos
            </h3>
            <div className="image-upload-box">
              <i className="fas fa-cloud-upload-alt"></i>
              <p>
                <span>Browse</span> to upload new photos (Max 5). Leave blank to
                keep existing photos.
              </p>
              <input
                type="file"
                name="images"
                className="file-input"
                onChange={handleImageChange}
                multiple
              />
            </div>
          </div>

          {}

          <div className="form-actions">
            <button type="submit" className="btn btn-accent" disabled={loading}>
              {loading ? "Updating..." : "Update Property"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPropertyPage;
