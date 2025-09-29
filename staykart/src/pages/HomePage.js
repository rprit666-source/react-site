import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PropertyCard from "../components/property/PropertyCard";
import { getAllPublishedProperties } from "../api/propertyService";

const HomePage = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      const data = await getAllPublishedProperties();
      setProperties(data);
      setLoading(false);
    };
    fetchProperties();
  }, []);

  return (
    <>
      {}
      <section className="main_section">
        <div className="container hero-container">
          <div className="main_text">
            <h1>Stay. Relax. Enjoy. Repeat.</h1>
            <p>Your perfect stay, just a click away.</p>
            <form className="search-form">
              <input
                type="text"
                name="location"
                placeholder="Enter location"
                required
              />
              <button type="submit" className="btn btn-primary">
                Search
              </button>
            </form>
          </div>
          <div className="main-image-showcase">
            <img
              src="https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg"
              alt="Living Room"
              className="hero-img img-1"
            />
            <img
              src="https://images.pexels.com/photos/164558/pexels-photo-164558.jpeg"
              alt="Bedroom"
              className="hero-img img-2"
            />
            <img
              src="https://images.pexels.com/photos/221540/pexels-photo-221540.jpeg"
              alt="Cozy Room"
              className="hero-img img-3"
            />
          </div>
        </div>
      </section>

      {}
      <section id="categories" className="categories-section">
        <div className="container">
          <div className="section-title">
            <span>Our Categories</span>
            <h2>Browse by Category</h2>
          </div>
          <div className="category-grid">
            <Link
              to="/properties?category=Farmhouse"
              style={{ textDecoration: "none" }}
            >
              <div className="category-card">
                <img
                  src="https://images.pexels.com/photos/259580/pexels-photo-259580.jpeg"
                  alt="Farmhouse"
                />
                <div className="card-content">
                  <h3>Farmhouses</h3>
                </div>
              </div>
            </Link>
            <Link
              to="/properties?category=Pool%20Farmhouse"
              style={{ textDecoration: "none" }}
            >
              <div className="category-card">
                <img
                  src="https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg"
                  alt="Pool Farmhouse"
                />
                <div className="card-content">
                  <h3>Pool Farmhouses</h3>
                </div>
              </div>
            </Link>
            <Link
              to="/properties?category=Hotel"
              style={{ textDecoration: "none" }}
            >
              <div className="category-card">
                <img
                  src="https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg"
                  alt="Hotel"
                />
                <div className="card-content">
                  <h3>Hotels</h3>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {}
      <section id="featured" className="featured-section">
        <div className="container">
          <div className="section-title">
            <span>Featured</span>
            <h2>Our Top Picks</h2>
          </div>
          <div className="property-grid">
            {loading ? (
              <p>Loading properties...</p>
            ) : properties.length > 0 ? (
              properties.map((prop) => (
                <PropertyCard key={prop._id} property={prop} />
              ))
            ) : (
              <p>No properties available at the moment.</p>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
