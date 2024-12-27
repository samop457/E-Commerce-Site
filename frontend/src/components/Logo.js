import React from 'react';
import './Logo.css'; // Import the CSS file for logo styling
import desktopLogo from '../assest/desktop-logo.png'; // Replace with your actual desktop logo path
import mobileLogo from '../assest/mobile-logo.png'; // Replace with your actual mobile logo path

const Logo = () => {
  return (
    <div className="logo-container">
      {/* Desktop logo */}
      <img
        src={desktopLogo}
        alt="Desktop Logo"
        className="logo-desktop"
      />
      {/* Mobile logo */}
      <img
        src={mobileLogo}
        alt="Mobile Logo"
        className="logo-mobile"
      />
    </div>
  );
};

export default Logo;
