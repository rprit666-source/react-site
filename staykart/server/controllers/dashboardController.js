const Booking = require("../models/Booking");
const Property = require("../models/Property");

exports.getBookingRequests = async (req, res) => {
  try {
    const ownerProperties = await Property.find({ user: req.user.id }).select(
      "_id"
    );
    const propertyIds = ownerProperties.map((p) => p._id);

    const bookings = await Booking.find({
      property: { $in: propertyIds },
      status: "pending",
    })
      .populate("property", "title")
      .populate("user", "full_name");

    res.json(bookings);
  } catch (err) {
    res.status(500).send("Server Error");
  }
};

exports.getAllBookings = async (req, res) => {
  try {
    const ownerProperties = await Property.find({ user: req.user.id }).select(
      "_id"
    );
    const propertyIds = ownerProperties.map((p) => p._id);

    const bookings = await Booking.find({ property: { $in: propertyIds } })
      .populate("property", "title")
      .populate("user", "full_name")
      .sort({ createdAt: -1 });

    res.json(bookings);
  } catch (err) {
    res.status(500).send("Server Error");
  }
};

exports.updateBookingStatus = async (req, res) => {
  const { status } = req.body;
  const bookingId = req.params.id;

  try {
    const booking = await Booking.findById(bookingId).populate("property");
    if (!booking) {
      return res.status(404).json({ msg: "Booking not found" });
    }
    if (booking.property.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    booking.status = status;
    await booking.save();
    res.json(booking);
  } catch (err) {
    console.error("Error in updateBookingStatus:", err.message);
    res.status(500).send("Server Error");
  }
};
