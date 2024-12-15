import React, { useState } from "react";
import "./homepage.css";
import logo from "./goapolice.png";

const PoliceHelpDesk = () => {
  const [isBotOpen, setIsBotOpen] = useState(false);

  const openChatBot = () => {
    setIsBotOpen(!isBotOpen);
  };

  return (
    <div className="page-container">
      <div className="logo-container">
        <img src={logo} alt="Goa Police Logo" className="logo" />
      </div>

      <h1 className="title">
        Answer<span className="highlight">Pol</span>
      </h1>
      <p className="subtitle">At your service ^^</p>

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

      <div className="chatbot-icon" onClick={openChatBot}>
        {}
        <i className="bi bi-robot"></i>
      </div>

      {isBotOpen && (
        <div className="chatbot-popup">
          <iframe
            src="https://cdn.botpress.cloud/webchat/v2.2/shareable.html?configUrl=https://files.bpcontent.cloud/2024/12/15/12/20241215125517-QJ3NU21K.json"
            width="100%"
            height="100%"
            title="Chatbot"
          ></iframe>
        </div>
      )}
    </div>
  );
};

export default PoliceHelpDesk;
