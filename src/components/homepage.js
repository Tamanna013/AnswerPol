import React from "react";
import "./homepage.css";
import logo from "./goapolice.png";

const PoliceHelpDesk = () => {
  return (
    <div className="page-container">
      {}
      <div className="logo-container">
      <img src={logo} alt="Goa Police Logo" className="logo" />;
      </div>

      {}
      <h1 className="title">
        Answer<span className="highlight">Pol</span>
      </h1>
      <p className="subtitle">
        At your service ^^
      </p>

      {}
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
