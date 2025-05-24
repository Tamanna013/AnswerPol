// Importing necessary React features: useState for state variables, useEffect for lifecycle methods
import React, { useState, useEffect } from "react";

// Import external CSS file for styling the component
import "./homepage.css";

// Import logo image to be displayed in the UI
import logo from "./goapolice.png";

// Define the main functional component for the Help Desk
const PoliceHelpDesk = () => {
  // State to toggle chatbot popup visibility
  const [isBotOpen, setIsBotOpen] = useState(false);

  // State to track which text (from the animation array) is currently being shown
  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  // State to control fade-in/fade-out animation class
  const [fade, setFade] = useState(true);

  // State to store the user’s input query
  const [queryText, setQueryText] = useState("");

  // State to store the translated version of the query
  const [translatedText, setTranslatedText] = useState("");

  // State to track the selected language (default is English - 'en')
  const [language, setLanguage] = useState("en");

  // An array of text objects to animate the heading text
  const textArray = [
    { white: "Answer", blue: "Pol" },
    { white: "#herefor", blue: "you" },
    { white: "#youare", blue: "priority" },
  ];

  // Function to cycle through heading texts with a fade effect
  const switchText = () => {
    setFade(false); // Trigger fade-out
    setTimeout(() => {
      // Change to the next text index (loop back to start if needed)
      setCurrentTextIndex((prevIndex) => (prevIndex + 1) % textArray.length);
      setFade(true); // Trigger fade-in
    }, 500); // Wait 0.5 seconds before switching text
  };

  // useEffect hook to automatically switch the text every 3 seconds
  useEffect(() => {
    const interval = setInterval(switchText, 3000); // Start timer
    return () => clearInterval(interval); // Cleanup the timer on component unmount
  }, []);

  // Function to toggle the chatbot popup open or closed
  const openChatBot = () => setIsBotOpen(!isBotOpen);

  // Get the current animated heading text based on the index
  const currentText = textArray[currentTextIndex];

  // Function to handle user input and perform translation via MyMemory API
  const handleInputChange = (e) => {
    const text = e.target.value; // Get the input value
    setQueryText(text); // Save it in state

    if (text) {
      // Construct the translation API URL
      const requestUrl = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|${language}`;

      // Fetch translation from the API
      fetch(requestUrl)
        .then((response) => response.json()) // Convert response to JSON
        .then((data) => {
          console.log("Translation Response:", data); // Log for debugging
          if (data && data.responseData) {
            setTranslatedText(data.responseData.translatedText); // Save translated text
          } else {
            setTranslatedText("Translation failed. Please try again."); // Error fallback
          }
        })
        .catch((error) => {
          console.error("Error:", error); // Log fetch error
          setTranslatedText("Error translating text."); // Show error to user
        });
    } else {
      setTranslatedText(""); // Clear translation if input is empty
    }
  };

  // Function to change the selected language
  const handleLanguageChange = (e) => {
    setLanguage(e.target.value); // Update language state
  };

  // Function to trigger translation manually (e.g., from a button)
  const handleTranslateClick = () => {
    handleInputChange({ target: { value: queryText } }); // Simulate input change to re-run translation
  };

  // Return the JSX (HTML-like code) that defines the UI
  return (
    <div className="page-container">
      {/* Logo section */}
      <div className="logo-container">
        <img src={logo} alt="Goa Police Logo" className="logo" />
      </div>

      {/* Animated Heading */}
      <h1 className="title">
        <span className={`fade ${fade ? "fade-in" : "fade-out"}`}>
          <span className="white-text">{currentText.white}</span>
          <span className="blue-text">{currentText.blue}</span>
        </span>
      </h1>

      {/* Subtitle below heading */}
      <p className="subtitle">At your service ^^</p>

      {/* Input and Translation section */}
      <div className="input-container">
        {/* Text input for user query */}
        <input
          type="text"
          placeholder="Enter your query here"
          className="input-field"
          value={queryText}
          onChange={handleInputChange}
        />

        {/* Dropdown for language selection */}
        <div className="dropdown-container">
          <select
            value={language}
            onChange={handleLanguageChange}
            className="language-dropdown"
          >
            {/* List of supported languages */}
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

        {/* Read-only input to display translated result */}
        <input
          type="text"
          placeholder="Translation"
          className="input-field"
          value={translatedText}
          readOnly
        />
      </div>

      {/* Chatbot button (robot icon) */}
      <div className="chatbot-icon" onClick={openChatBot}>
        <i className="bi bi-robot"></i>
      </div>

      {/* Conditional rendering of the chatbot popup */}
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

// Export the component so it can be used in other files
export default PoliceHelpDesk;
