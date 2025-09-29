import React from "react";
import { Link } from "react-router-dom";

const PropertyCard = ({ property }) => {
  const imageUrl = `http://localhost:5000/uploads/properties/${
    property.images[0] || "default.jpg"
  }`;

  return (
    <div className="property-card">
      <div className="property-image">
        <img
          src={imageUrl}
          alt={property.title}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
        <div className="property-tag">{property.property_type}</div>
      </div>
      <div className="property-details">
        <h4>{property.title}</h4>
        <p>{property.description.substring(0, 50)}...</p>
        <div className="property-price">
          <span>
            <strong>₹{property.price.toLocaleString()}</strong>/night
          </span>
          <Link to={`/property/${property._id}`} className="btn-view">
            View -{">"}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
