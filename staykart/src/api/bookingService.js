const API_URL = "/api/bookings";
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return { "Content-Type": "application/json", "x-auth-token": token };
};

export const bookProperty = async (bookingData) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(bookingData),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Failed to create booking.");
  }
  return data;
};

export const getMyBookings = async () => {
  const response = await fetch(`${API_URL}/my-bookings`, {
    headers: getAuthHeaders(),
  });
  if (!response.ok) {
    throw new Error("Could not fetch your bookings.");
  }
  return response.json();
};
