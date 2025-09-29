const API_URL = "/api/dashboard";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return { "Content-Type": "application/json", "x-auth-token": token };
};

export const getRequests = async () => {
  const response = await fetch(`${API_URL}/requests`, {
    headers: getAuthHeaders(),
  });
  if (!response.ok) throw new Error("Failed to fetch requests.");
  return response.json();
};

export const getAllUserBookings = async () => {
  const response = await fetch(`${API_URL}/all-bookings`, {
    headers: getAuthHeaders(),
  });
  if (!response.ok) throw new Error("Failed to fetch all bookings.");
  return response.json();
};

export const updateBookingStatusById = async (id, status) => {
  const response = await fetch(`${API_URL}/requests/${id}/status`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify({ status }),
  });
  if (!response.ok) {
    throw new Error("Failed to update booking status.");
  }
  return response.json();
};
