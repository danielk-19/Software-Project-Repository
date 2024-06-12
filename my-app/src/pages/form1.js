import React, { useContext, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { SettingsContext } from '../context/SettingsContext';
import { LocationInfoContext } from '../context/LocationInfoContext';

export default function Form1() {
  const { locationInfoData, updateLocationInfoData } = useContext(LocationInfoContext);
  const { settingsData } = useContext(SettingsContext);

  const [localLocationInfo, setLocalLocationInfo] = useState(locationInfoData);
  const navigate = useNavigate();

  const handleTimeChange = (event) => {
    const newTime = event.target.value;
    setLocalLocationInfo((prev) => ({ ...prev, currentTime: newTime }));
  };

  const handleLocationChange = (event) => {
    const newLocation = event.target.value;
    setLocalLocationInfo((prev) => ({ ...prev, currentLocation: newLocation }));
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    updateLocationInfoData(localLocationInfo);
    navigate("/");
  };

  const clearLocal = (event) => {
    handleTimeChange(event);
    handleLocationChange(event);
  };

  return (
    <div className="container center">

        <div className="button-container">
            <button 
              value={settingsData.setDefault === "" ? "Media Center" : settingsData.setDefault} 
              onClick={handleLocationChange} className="buttonDesign"
            >Default Room</button>
            <button 
              value="In a Meeting" 
              onClick={handleLocationChange} className="buttonDesign"
            >Meeting</button>
            <button 
              value="Out of School" 
              onClick={handleLocationChange} className="buttonDesign"
            >Out of School</button>
            {settingsData.textBoxes.map((textBoxInfo) => (
              <button
                key={textBoxInfo.id}
                value={textBoxInfo.value}
                onClick={handleLocationChange} className = "buttonDesign"
              >{textBoxInfo.value}</button>
            ))}
        </div>

        <div>
        <form onSubmit={handleSubmitForm} className="button-container">
            <label className="form-input">
                Location: 
                <input type="text" value={localLocationInfo.currentLocation} onChange={handleLocationChange} className="form-input-box" placeholder="Location" />
            </label><br />
            {localLocationInfo.currentLocation && (
            <div>
                <label className="form-input">
                Available until: 
                <input type="time" value={localLocationInfo.currentTime} onChange={handleTimeChange} className="form-input-box" />
                </label>
            </div>
            )}
            <br />
            <button value="" className="buttonDesign" onClick={clearLocal}>Clear</button>
            <input type="submit" value="Apply" className="buttonDesign" />
        </form>
        </div>

        <div>
            <div className="marginTop">
                <Link to="/">
                    <button className="buttonDesign">Back to Home</button>
                </Link>
            </div>
        </div>

    </div>
  );
}
