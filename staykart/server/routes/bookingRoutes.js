const express = require("express");
const router = express.Router();
const {
  createBooking,
  getUserBookings,
} = require("../controllers/bookingController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/", authMiddleware, createBooking);
router.get("/my-bookings", authMiddleware, getUserBookings);

module.exports = router;
