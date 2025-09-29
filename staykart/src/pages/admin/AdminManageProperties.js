import React, { useState, useEffect } from "react";
// `deletePropertyForAdmin` ko import karein
import {
  getAllProperties,
  updateStatus,
  deletePropertyForAdmin,
} from "../../api/adminService";
import "../../assets/css/admin.css";

const AdminManageProperties = () => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      const data = await getAllProperties();
      setProperties(data);
    } catch (error) {
      console.error("Failed to fetch properties:", error);
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      await updateStatus(id, status);
      fetchProperties(); // List ko refresh karein
    } catch (error) {
      alert("Failed to update status");
    }
  };

  // ==> NEECHE DIYA GAYA NAYA FUNCTION ADD KAREIN <==
  const handleDelete = async (id) => {
    // User se confirmation maangein
    if (
      window.confirm(
        "Are you sure you want to permanently delete this property?"
      )
    ) {
      try {
        await deletePropertyForAdmin(id);
        // Delete hone ke baad list ko refresh karein
        fetchProperties();
      } catch (err) {
        alert("Failed to delete property.");
      }
    }
  };

  return (
    <div className="admin-page-container">
      <h1>Manage Properties</h1>
      <table className="admin-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Owner</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {properties &&
            properties.map((prop) => (
              <tr key={prop._id}>
                <td>{prop.title}</td>
                <td>{prop.user?.full_name || "N/A"}</td>
                <td>{prop.status}</td>
                <td>
                  {prop.status === "pending" && (
                    <>
                      <button
                        onClick={() => handleStatusChange(prop._id, "approved")}
                        className="btn btn-primary"
                        style={{ padding: "5px 10px" }}
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleStatusChange(prop._id, "rejected")}
                        className="btn-delete"
                        style={{ marginLeft: "5px" }}
                      >
                        Reject
                      </button>
                    </>
                  )}
                  {/* Delete button ab handleDelete function ko call karega */}
                  <button
                    onClick={() => handleDelete(prop._id)}
                    className="btn-delete"
                    style={{ marginLeft: "5px" }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminManageProperties;
