const mongoose = require("mongoose");

const PropertySchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    property_type: { type: String, required: true },
    location: { type: String, required: true },
    price: { type: Number, required: true },
    amenities: [String],
    images: [{ type: String }],
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    availability: {
      type: String,
      enum: ["available", "unavailable"],
      default: "available",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Property", PropertySchema);
