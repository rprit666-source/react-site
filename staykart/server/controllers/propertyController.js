const Property = require("../models/Property");
const path = require("path");

exports.addProperty = async (req, res) => {
  const { title, description, property_type, location, price } = req.body;
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({ message: "No image was uploaded." });
  }
  try {
    const imageFile = req.files.image;
    const fileName = `prop-${Date.now()}${path.extname(imageFile.name)}`;
    const uploadPath = path.join(
      __dirname,
      "..",
      "uploads",
      "properties",
      fileName
    );
    await imageFile.mv(uploadPath);
    const newProperty = new Property({
      title,
      description,
      property_type,
      location,
      price,
      images: [fileName],
      user: req.user.id,
    });
    const property = await newProperty.save();
    res.status(201).json(property);
  } catch (err) {
    console.error("Error in addProperty:", err.message);
    res.status(500).send("Server Error");
  }
};

exports.getUserProperties = async (req, res) => {
  try {
    const properties = await Property.find({ user: req.user.id }).sort({
      createdAt: -1,
    });
    res.json(properties);
  } catch (err) {
    console.error("Error in getUserProperties:", err.message);
    res.status(500).send("Server Error");
  }
};

exports.deleteProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) return res.status(404).json({ msg: "Property not found" });
    if (property.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }
    await property.deleteOne();
    res.json({ msg: "Property removed successfully" });
  } catch (err) {
    console.error("Error in deleteProperty:", err.message);
    res.status(500).send("Server Error");
  }
};

exports.getPublishedProperties = async (req, res) => {
  try {
    const properties = await Property.find({ status: "approved" }).sort({
      createdAt: -1,
    });
    res.json(properties);
  } catch (err) {
    console.error("Error in getPublishedProperties:", err.message);
    res.status(500).send("Server Error");
  }
};

exports.getPublishedProperties = async (req, res) => {
  try {
    const properties = await Property.find({ status: "approved" }).sort({
      createdAt: -1,
    });
    res.json(properties);
  } catch (err) {
    console.error("Error in getPublishedProperties:", err.message);
    res.status(500).send("Server Error");
  }
};

exports.getPropertyById = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id).populate(
      "user",
      "full_name"
    );
    if (!property) {
      return res.status(404).json({ msg: "Property not found" });
    }
    res.json(property);
  } catch (err) {
    console.error("Error in getPropertyById:", err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Property not found" });
    }
    res.status(500).send("Server Error");
  }
};
exports.updateProperty = async (req, res) => {
  const { title, description, property_type, location, price } = req.body;
  const updatedFields = { title, description, property_type, location, price };

  try {
    let property = await Property.findById(req.params.id);
    if (!property) return res.status(404).json({ msg: "Property not found" });
    if (property.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    if (req.files && req.files.images) {
      const imageFiles = Array.isArray(req.files.images)
        ? req.files.images
        : [req.files.images];
      const imageNames = [];

      for (const imageFile of imageFiles) {
        const fileName = `prop-${Date.now()}-${imageFile.name}`;
        const uploadPath = path.join(
          __dirname,
          "..",
          "uploads/properties/",
          fileName
        );
        await imageFile.mv(uploadPath);
        imageNames.push(fileName);
      }

      updatedFields.images = imageNames;
    }

    property = await Property.findByIdAndUpdate(
      req.params.id,
      { $set: updatedFields },
      { new: true }
    );

    res.json(property);
  } catch (err) {
    console.error("Error in updateProperty:", err.message);
    res.status(500).send("Server Error");
  }
};

exports.getPropertiesByCategory = async (req, res) => {
  try {
    const category = req.query.category;
    if (!category) {
      return res.status(400).json({ msg: "Category is required" });
    }

    const properties = await Property.find({
      status: "approved",
      property_type: category,
    }).sort({ createdAt: -1 });

    res.json(properties);
  } catch (err) {
    console.error("Error in getPropertiesByCategory:", err.message);
    res.status(500).send("Server Error");
  }
};
