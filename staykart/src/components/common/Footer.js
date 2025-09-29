import React from "react";

const Footer = () => {
  return (
    <footer className="main-footer">
      <div className="container">
        <p>
          &copy; {new Date().getFullYear()} StayKart. Curated with ❤️ in Surat.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
