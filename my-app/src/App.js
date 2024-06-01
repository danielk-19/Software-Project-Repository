import React, { useState } from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import logo from './logo.png';
import settingsIcon from './settings-icon.png';
import Home from "./pages/Home";
import Form1 from "./pages/form1";
import Form2 from "./pages/form2";
import Settings from "./pages/settings";
import { AvailabilityProvider } from "./context/AvailabilityProvider";
import { SettingsProvider } from "./context/SettingsContext";
import './App.css';

export default function App() {
  const [showSettings, setShowSettings] = useState(false);

  const toggleSettings = () => {
    setShowSettings(!showSettings);
  };

  return (
    <SettingsProvider>
    <AvailabilityProvider>
      <Router>
        <div className="App">
          <header className="App-header">
            <div className="header-content">
              <img src={logo} className="App-logo" alt="logo" />
              <h1>Location Updater</h1>
            </div>
            <button className="settings-button" onClick={toggleSettings}>
              <img src={settingsIcon} className="settings-icon" alt="Settings" />
            </button>
            <div className="header-decoration" />
          </header>
          {showSettings && <Settings 
            onClose={toggleSettings}
          />}
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/form1" element={<Form1 />} />
              <Route path="/form2" element={<Form2 />} />
            </Routes>
          </div>
          <footer className="footer">
            <div>
              <p>Contact Us: smcs2026.cloudchasers@gmail.com</p>
              <p>&copy; Cloud Chasers</p>
            </div>
          </footer>
        </div>
      </Router>
    </AvailabilityProvider>
    </SettingsProvider>
  );
}
