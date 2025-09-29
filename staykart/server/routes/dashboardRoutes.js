const express = require("express");
const router = express.Router();
const {
  getBookingRequests,
  getAllBookings,
  updateBookingStatus,
} = require("../controllers/dashboardController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/requests", authMiddleware, getBookingRequests);

router.get("/all-bookings", authMiddleware, getAllBookings);

router.put("/requests/:id/status", authMiddleware, updateBookingStatus);

module.exports = router;
