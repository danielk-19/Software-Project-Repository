import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import logo from './logo.png';
import settingsIcon from './settings-icon.png';
import Home from "./pages/Home";
import Form1 from "./pages/form1";
import Form2 from "./pages/form2";
import { AvailabilityProvider } from "./context/AvailabilityProvider";
import './App.css';

export default function App() {
  return (
    <AvailabilityProvider>
      <Router>
        <div className="App">
          <header className="App-header">
            <div className="header-content">
              <img src={logo} className="App-logo" alt="logo" />
              <h1>Location Updater</h1>
            </div>
            <button className="settings-button">
              <img src={settingsIcon} className="settings-icon" alt="Settings" />
            </button>
            <div className="header-decoration" />
          </header>
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
  );
}
