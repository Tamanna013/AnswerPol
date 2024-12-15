import React, { useState, useEffect } from "react";
import "./homepage.css"; // Import the CSS file for styling
import logo from "./goapolice.png";

const PoliceHelpDesk = () => {
  const [isBotOpen, setIsBotOpen] = useState(false);
  const [headingText, setHeadingText] = useState("AnswerPol");
  const [fade, setFade] = useState(true); // State for fading effect

  // Text array to cycle through
  const textArray = ["AnswerPol", "#hereforyou", "#youarepriority"];
  let currentIndex = 0;

  // Function to switch between the texts with fade effect
  const switchText = () => {
    setFade(false); // Start fade-out effect
    setTimeout(() => {
      currentIndex = (currentIndex + 1) % textArray.length;
      setHeadingText(textArray[currentIndex]);
      setFade(true); // Start fade-in effect
    }, 500); // Wait for 500ms (duration of fade-out) before changing the text
  };

  useEffect(() => {
    // Automatically switch text every 3 seconds
    const interval = setInterval(switchText, 3000);

    return () => clearInterval(interval); // Cleanup the interval on component unmount
  }, []);

  const openChatBot = () => {
    setIsBotOpen(!isBotOpen); // Toggle chatbot visibility
  };

  return (
    <div className="page-container">
      <div className="logo-container">
        <img src={logo} alt="Goa Police Logo" className="logo" />
      </div>

      <h1 className="title">
        <span className={`highlight ${fade ? "fade-in" : "fade-out"}`}>
          {headingText}
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
