const express = require("express");
const router = express.Router();
const {
  getAllPropertiesForAdmin,
  updatePropertyStatus,
  getAllUsers,
  deletePropertyByAdmin,
} = require("../controllers/adminController");
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

router.delete(
  "/properties/:id",
  [authMiddleware, adminMiddleware],
  deletePropertyByAdmin
);

router.get(
  "/properties",
  [authMiddleware, adminMiddleware],
  getAllPropertiesForAdmin
);
router.put(
  "/properties/:id/status",
  [authMiddleware, adminMiddleware],
  updatePropertyStatus
);

router.get("/users", [authMiddleware, adminMiddleware], getAllUsers);

module.exports = router;
