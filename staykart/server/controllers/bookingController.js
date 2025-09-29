const Booking = require("../models/Booking");
const Property = require("../models/Property");

exports.createBooking = async (req, res) => {
  const { propertyId, check_in_date, check_out_date } = req.body;
  const userId = req.user.id;

  try {
    const property = await Property.findById(propertyId);
    if (!property) {
      return res.status(404).json({ msg: "Property not found" });
    }

    const date1 = new Date(check_in_date);
    const date2 = new Date(check_out_date);
    const timeDiff = Math.abs(date2.getTime() - date1.getTime());
    const nights = Math.ceil(timeDiff / (1000 * 3600 * 24));

    if (nights <= 0) {
      return res
        .status(400)
        .json({ msg: "Check-out date must be after check-in date." });
    }

    const totalPrice = nights * property.price;

    const newBooking = new Booking({
      user: userId,
      property: propertyId,
      check_in_date,
      check_out_date,
      total_price: totalPrice,
      status: "pending",
    });

    const booking = await newBooking.save();
    res.status(201).json(booking);
  } catch (err) {
    console.error("Error in createBooking:", err.message);
    res.status(500).send("Server Error");
  }
};

exports.getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id })
      .populate("property", "title location images")
      .sort({ createdAt: -1 });
    res.json(bookings);
  } catch (err) {
    console.error("Error in getUserBookings:", err.message);
    res.status(500).send("Server Error");
  }
};
