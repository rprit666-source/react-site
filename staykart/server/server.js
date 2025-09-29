const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const fileUpload = require("express-fileupload");

const app = express();

app.use(cors());
app.use(express.json());
app.use(fileUpload());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

mongoose
  .connect("mongodb://localhost:27017/staykart_db")
  .then(() => console.log("MongoDB Connected!"))
  .catch((err) => console.error(err));

app.use("/api/properties", require("./routes/propertyRoutes"));
app.use("/api/dashboard", require("./routes/dashboardRoutes"));
app.use("/api/bookings", require("./routes/bookingRoutes"));

app.use("/api/admin", require("./routes/adminRoutes"));

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/dashboard", require("./routes/dashboardRoutes"));
app.use("/api/properties", require("./routes/propertyRoutes"));

const PORT = 5000;
app.listen(PORT, () =>
  console.log(`Backend server is running on port ${PORT}`)
);
