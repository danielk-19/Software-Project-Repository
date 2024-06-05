import React, { useContext, useState } from 'react';
import { Link } from "react-router-dom";
import { SettingsContext } from '../context/SettingsContext';
import { LocationInfoContext } from '../context/LocationInfoContext';

export default function Form2() {
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

  const handleSubmitForm2 = (e) => {
    e.preventDefault();
    updateLocationInfoData(localLocationInfo);
  };
    return (
        <div>
            <div className="button-container">
            <button 
              value="Testing: " 
              onClick={handleLocationChange} className="buttonDesign"
            >Testing</button>
            
            </div>
            <div className="button-container">
            <button 
              value="Meeting: " 
              onClick={handleLocationChange} className="buttonDesign"
            >Meeting</button>
            
            </div>
            
            
            <div>
                <form onSubmit={handleSubmitForm2} className="button-container">
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

            <div className="container center">
                <Link to="/">
                    <button className="buttonDesign">Back to Home</button>
                </Link>
            </div>

        </div>
    );
}
