import React from "react";
import "./homepage.css"; // Import the CSS file for styling

const PoliceHelpDesk = () => {
  return (
    <div className="page-container">
      {/* Logo Section */}
      <div className="logo-container">
        <img
          src="../assets/goapolice.png"
          alt="Goa Police Logo"
          className="logo"
        />
      </div>

      {/* Title Section */}
      <h1 className="title">
        Answer<span className="highlight">Pol</span>
      </h1>
      <p className="subtitle">
        At your service ^^
      </p>

      {/* Input Fields */}
      <div className="input-container">
        <input
          type="text"
          placeholder="Enter your query here"
          className="input-field"
        />
        <input
          type="text"
          placeholder="Target Language"
          className="input-field"
        />
      </div>
    </div>
  );
};

export default PoliceHelpDesk;