const express = require("express");
const router = express.Router();
const {
  addProperty,
  getUserProperties,
  deleteProperty,
  getPublishedProperties,
  getPropertyById,
  updateProperty,
  getPropertiesByCategory,
} = require("../controllers/propertyController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/published", getPublishedProperties);
router.get("/:id", getPropertyById);
router.put("/:id", authMiddleware, updateProperty);
router.get("/filter/by-category", getPropertiesByCategory);

module.exports = router;

router.post("/", authMiddleware, addProperty);
router.get("/", authMiddleware, getUserProperties);
router.delete("/:id", authMiddleware, deleteProperty);

module.exports = router;
