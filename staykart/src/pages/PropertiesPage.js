import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import PropertyCard from "../components/property/PropertyCard";
import { fetchPropertiesByCategory } from "../api/propertyService";

const PropertiesPage = () => {
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");

  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (category) {
      const loadProperties = async () => {
        setLoading(true);
        const data = await fetchPropertiesByCategory(category);
        setProperties(data);
        setLoading(false);
      };
      loadProperties();
    }
  }, [category]);

  return (
    <main className="page-main-content">
      <div className="container">
        <div className="page-title">
          <h1>{category} Properties</h1>
          <p>
            Browse our curated collection of {category?.toLowerCase()}{" "}
            properties.
          </p>
        </div>
        <div className="property-grid">
          {loading ? (
            <p>Loading properties...</p>
          ) : properties.length > 0 ? (
            properties.map((prop) => (
              <PropertyCard key={prop._id} property={prop} />
            ))
          ) : (
            <p>No properties found in this category.</p>
          )}
        </div>
      </div>
    </main>
  );
};

export default PropertiesPage;
