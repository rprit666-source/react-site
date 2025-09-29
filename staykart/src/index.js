import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// Apni saari CSS files ko yahan import karein
import "./assets/css/style.css";
import "./assets/css/style_login.css";
import "./assets/css/style_extended.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
