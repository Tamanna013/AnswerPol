import React, { useState, useEffect } from "react";
import "./homepage.css"; // Import the CSS file for styling
import logo from "./goapolice.png";

const PoliceHelpDesk = () => {
  const [isBotOpen, setIsBotOpen] = useState(false);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [fade, setFade] = useState(true);

  // Array of text pairs (first part white, second part blue)
  const textArray = [
    { white: "Answer", blue: "Pol" },
    { white: "#herefor", blue: "you" },
    { white: "#youare", blue: "priority" },
  ];

  // Function to switch text with fade effect
  const switchText = () => {
    setFade(false); // Start fade-out
    setTimeout(() => {
      setCurrentTextIndex((prevIndex) => (prevIndex + 1) % textArray.length);
      setFade(true); // Start fade-in
    }, 500);
  };

  useEffect(() => {
    const interval = setInterval(switchText, 3000); // Switch text every 3 seconds
    return () => clearInterval(interval);
  }, []);

  const openChatBot = () => setIsBotOpen(!isBotOpen);

  const currentText = textArray[currentTextIndex]; // Current text pair

  return (
    <div className="page-container">
      <div className="logo-container">
        <img src={logo} alt="Goa Police Logo" className="logo" />
      </div>

      {/* Dynamic Heading */}
      <h1 className="title">
        <span className={`fade ${fade ? "fade-in" : "fade-out"}`}>
          <span className="white-text">{currentText.white}</span>
          <span className="blue-text">{currentText.blue}</span>
        </span>
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

      {/* Chatbot Icon */}
      <div className="chatbot-icon" onClick={openChatBot}>
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
