const API_URL = "/api/properties";

const getAuthHeaders = (isFormData = false) => {
  const token = localStorage.getItem("token");
  const headers = { "x-auth-token": token };
  if (!isFormData) {
    headers["Content-Type"] = "application/json";
  }
  return headers;
};

export const getAllPublishedProperties = async () => {
  try {
    const response = await fetch(`${API_URL}/published`);
    if (!response.ok) {
      throw new Error("Could not fetch published properties.");
    }
    return response.json();
  } catch (error) {
    console.error("Error fetching published properties:", error);
    return [];
  }
};

export const getMyProperties = async () => {
  const response = await fetch(API_URL, { headers: getAuthHeaders() });
  if (!response.ok) {
    throw new Error("Could not fetch your properties. Please log in again.");
  }
  return response.json();
};

export const createProperty = async (formData) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: getAuthHeaders(true),
    body: formData,
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Failed to create property.");
  }
  return data;
};

export const deletePropertyById = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });
  if (!response.ok) {
    throw new Error("Failed to delete property.");
  }
  return response.json();
};

export const fetchPropertyById = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) {
      throw new Error("Could not fetch property details.");
    }
    return response.json();
  } catch (error) {
    console.error("Error fetching property by ID:", error);
    return null;
  }
};

export const updatePropertyById = async (id, formData) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: getAuthHeaders(true),
    body: formData,
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Failed to update property.");
  }
  return data;
};

export const fetchPropertiesByCategory = async (category) => {
  try {
    const response = await fetch(
      `${API_URL}/filter/by-category?category=${category}`
    );
    if (!response.ok) {
      throw new Error("Could not fetch properties for this category.");
    }
    return response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
};
