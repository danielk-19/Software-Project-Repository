import React, { useContext, useState } from 'react';
import { Link } from "react-router-dom";
import { SettingsContext } from '../context/SettingsContext';
import { LocationInfoContext } from '../context/LocationInfoContext';

export default function Form1() {
  const { locationInfoData, updateLocationInfoData } = useContext(LocationInfoContext);
  const { settingsData } = useContext(SettingsContext);

  const [localLocationInfo, setLocalLocationInfo] = useState(locationInfoData);

  const handleTimeChange = (event) => {
    const newTime = event.target.value;
    setLocalLocationInfo((prev) => ({ ...prev, currentTime: newTime }));
  };

  const handleLocationChange = (event) => {
    const newLocation = event.target.value;
    setLocalLocationInfo((prev) => ({ ...prev, currentLocation: newLocation }));
  };

  const handleSubmitForm1 = (e) => {
    e.preventDefault();
    updateLocationInfoData(localLocationInfo);
  };

  return (
    <div className="container center">

        <div className="button-container">
            <button 
              value={settingsData.setDefault === "" ? "Media Center" : settingsData.setDefault} 
              onClick={handleLocationChange} className="buttonDesign"
            >Default Room</button>
            {settingsData.textBoxes.map((textBoxInfo) => (
              <button
                key={textBoxInfo.id}
                value={textBoxInfo.value}
                onClick={handleLocationChange} className = "buttonDesign"
              >{textBoxInfo.value}</button>
            ))}
        </div>

        <div>
        <form onSubmit={handleSubmitForm1} className="button-container">
            <label>
                Location:
                <input type="text" value={localLocationInfo.currentLocation} onChange={handleLocationChange} />
            </label>
            {localLocationInfo.currentLocation && (
            <div>
                <label>
                (Optional) Available until:
                <input type="time" value={localLocationInfo.currentTime} onChange={handleTimeChange} />
                </label>
            </div>
            )}
            <input type="submit" value="Apply" />
        </form>
        </div>

        <div>
            <div>
                <Link to="/">
                    <button className="buttonDesign">Back to Home</button>
                </Link>
            </div>
        </div>

    </div>
  );
}
