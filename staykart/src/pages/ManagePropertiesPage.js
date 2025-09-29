import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getMyProperties, deletePropertyById } from "../api/propertyService";

const ManagePropertiesPage = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      const data = await getMyProperties();
      setProperties(data);
    } catch (err) {
      setError("Could not fetch properties. Please try logging in again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this property?")) {
      try {
        await deletePropertyById(id);
        fetchProperties();
      } catch (err) {
        alert("Failed to delete property.");
      }
    }
  };

  if (loading)
    return (
      <div className="container" style={{ padding: "3rem 0" }}>
        <p>Loading your properties...</p>
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
      {}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "2.5rem",
        }}
      >
        <h1 style={{ fontFamily: "var(--font-heading)" }}>
          Manage My Properties
        </h1>
        <Link to="/add-property" className="btn btn-accent">
          Add New Property +
        </Link>
      </div>

      {}
      <table
        style={{
          width: "100%",
          borderCollapse: "separate",
          borderSpacing: "0 10px",
        }}
      >
        <thead>
          <tr style={{ backgroundColor: "#f7f9f9" }}>
            <th style={{ padding: "1rem", textAlign: "left" }}>
              Property Title
            </th>
            <th style={{ padding: "1rem", textAlign: "left" }}>Status</th>
            <th style={{ padding: "1rem", textAlign: "left" }}>Availability</th>
            <th style={{ padding: "1rem", textAlign: "right" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {properties.length > 0 ? (
            properties.map((prop) => (
              <tr
                key={prop._id}
                style={{
                  background: "#fff",
                  boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
                  borderRadius: "8px",
                }}
              >
                <td style={{ padding: "1rem" }}>{prop.title}</td>
                <td style={{ padding: "1rem", textTransform: "capitalize" }}>
                  {prop.status}
                </td>
                <td
                  style={{
                    padding: "1rem",
                    fontWeight: "bold",
                    textTransform: "capitalize",
                  }}
                >
                  {prop.availability}
                </td>
                <td style={{ padding: "1rem", textAlign: "right" }}>
                  <Link
                    to={`/edit-property/${prop._id}`}
                    className="btn btn-primary"
                    style={{ padding: "5px 10px", fontSize: "0.9rem" }}
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(prop._id)}
                    className="btn btn-accent"
                    style={{
                      padding: "5px 10px",
                      fontSize: "0.9rem",
                      marginLeft: "5px",
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" style={{ textAlign: "center", padding: "2rem" }}>
                You haven't listed any properties yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ManagePropertiesPage;
