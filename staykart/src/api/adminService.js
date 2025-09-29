const API_URL = "/api/admin";
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return { "Content-Type": "application/json", "x-auth-token": token };
};

export const getAllProperties = async () => {
  const response = await fetch(`${API_URL}/properties`, {
    headers: getAuthHeaders(),
  });
  if (!response.ok) throw new Error("Failed to fetch properties.");
  return response.json();
};
export const updateStatus = async (id, status) => {
  const response = await fetch(`${API_URL}/properties/${id}/status`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify({ status }),
  });
  if (!response.ok) throw new Error("Failed to update status.");
  return response.json();
};

export const getAllUsers = async () => {
  const response = await fetch(`${API_URL}/users`, {
    headers: getAuthHeaders(),
  });
  if (!response.ok) throw new Error("Failed to fetch users.");
  return response.json();
};

export const deletePropertyForAdmin = async (id) => {
  const response = await fetch(`${API_URL}/properties/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });
  if (!response.ok) {
    throw new Error("Failed to delete property.");
  }
  return response.json();
};
