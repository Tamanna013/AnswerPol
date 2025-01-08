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

  useEffect(() => {
    const myHeaders = new Headers();
    myHeaders.append("x-apihub-key", "-1ulSV9UX8RkgdVdn6gC7r6kSRCVwbpGvkDkhhoVSIe-XUTsuF");
    myHeaders.append("x-apihub-host", "Translate.allthingsdev.co");
    myHeaders.append("x-apihub-endpoint", "c02831cf-422c-44a0-a1b5-2b319b277e94");

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch("https://Translate.proxy-production.allthingsdev.co/languages", requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((result) => {
        setLanguages(result); // Store the result in state
      })
      .catch((error) => {
        setError(error.message); // Handle errors
      });
  }, []);

  const Dropdown=()=>{
    const [selectedOption, setSeletedOption]=useState("");
    const handleChange=(event)=>{
      setSelectedOption(event.target.value);
    }
  }

  return (
    <div className="page-container">
      <div className="logo-container">
        <img src={logo} alt="Goa Police Logo" className="logo" />
      </div>

      {/* Dynamic Heading */}
      <h1 className="title">
        <span className={fade ${fade ? "fade-in" : "fade-out"}}>
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
        <label htmlFor="dropdown">Choose the target language: </label>
        <select
        id="dropdown"
        value={selectedOption}
        onChange={handleChange}
        style={{padding:"5px", borderRadius: "4px"}}
        >
          <option value="" disabled>
          choose your language
          </option>
         <option value="english">English</option>
         <option value="hindi">Hindi</option>
         <option value="Marathi">Marathi</option>
         <option value="kannada">Kannada</option>
         <option value="spanish">Spanish</option>
         <option value="german">German</option>
        </select>
        {
          selectedOption && (
            <p style={{marginTop: "10px"}}>You selected: {selectedOption}</p>
          )
        }
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
export default Dropdown;
export default PoliceHelpDesk;
