import React, { useState, useEffect } from "react";
import "./homepage.css"; // Import the CSS file for styling
import logo from "./goapolice.png";

const PoliceHelpDesk = () => {
  const [isBotOpen, setIsBotOpen] = useState(false);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [fade, setFade] = useState(true);
  const [queryText, setQueryText] = useState(""); // State for the query text
  const [translatedText, setTranslatedText] = useState(""); // State for the translated text
  const [language, setLanguage] = useState("en"); // Default language is English

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

  // Function to handle input change and fetch translation using MyMemory API
  const handleInputChange = (e) => {
    const text = e.target.value;
    setQueryText(text);

    if (text) {
      // MyMemory API call for translation
      const requestUrl = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|${language}`;

      fetch(requestUrl)
        .then((response) => response.json())
        .then((data) => {
          console.log("Translation Response:", data); // Debugging response
          if (data && data.responseData) {
            setTranslatedText(data.responseData.translatedText);
          } else {
            setTranslatedText("Translation failed. Please try again.");
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          setTranslatedText("Error translating text.");
        });
    } else {
      setTranslatedText(""); // Clear translation if input is empty
    }
  };

  // Handle language change from dropdown
  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };

  // Function to trigger translation on button click
  const handleTranslateClick = () => {
    handleInputChange({ target: { value: queryText } }); // Trigger translation manually
  };

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
          value={queryText}
          onChange={handleInputChange}
        />
        {/* Language Selection Dropdown */}
        <div className="dropdown-container">
          <select
            value={language}
            onChange={handleLanguageChange}
            className="language-dropdown"
          >
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
            <option value="de">German</option>
            <option value="it">Italian</option>
            <option value="pt">Portuguese</option>
            <option value="hi">Hindi</option>
            <option value="zh">Chinese</option>
            <option value="ar">Arabic</option>
          </select>
        </div>
        
        <input
          type="text"
          placeholder="Translation"
          className="input-field"
          value={translatedText}
          readOnly
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
