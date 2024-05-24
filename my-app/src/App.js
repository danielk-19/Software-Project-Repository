import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import logo from './logo.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from "./pages/Home";
import Form1 from "./pages/form1";
import Form2 from "./pages/form2";
import './App.css';

export default function App() {

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <div className="">
            <h1>Location Updater</h1>
            <img src={logo} className="App-logo" alt="logo" />
          </div>
        </header>
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/form1" element={<Form1 />} />
            <Route path="/form2" element={<Form2 />} />
          </Routes>
        </div>
        <footer className="footer">
          <div className="">
            <p>&copy; Cloud Chasers</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}