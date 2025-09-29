const Property = require("../models/Property");
const User = require("../models/User");

exports.getAllPropertiesForAdmin = async (req, res) => {
  try {
    const properties = await Property.find()
      .populate("user", "full_name")
      .sort({ createdAt: -1 });
    res.json(properties);
  } catch (err) {
    res.status(500).send("Server Error");
  }
};

exports.updatePropertyStatus = async (req, res) => {
  const { status } = req.body;
  try {
    const property = await Property.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    ).populate("user", "full_name");
    res.json(property);
  } catch (err) {
    res.status(500).send("Server Error");
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ role: { $ne: "admin" } }).select(
      "-password"
    );
    res.json(users);
  } catch (err) {
    res.status(500).send("Server Error");
  }
};

exports.deletePropertyByAdmin = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) {
      return res.status(404).json({ msg: "Property not found" });
    }

    await property.deleteOne();
    res.json({ msg: "Property removed successfully by admin" });
  } catch (err) {
    console.error("Error in deletePropertyByAdmin:", err.message);
    res.status(500).send("Server Error");
  }
};
