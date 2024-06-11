import React, { useContext, useState } from 'react';
import { Link } from "react-router-dom";
import { LocationInfoContext } from '../context/LocationInfoContext';

export default function Form2() {
  const { locationInfoData, updateLocationInfoData } = useContext(LocationInfoContext);

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

  const clearLocal = (event) => {
    handleTimeChange(event);
    handleLocationChange(event);
  };

    return (
        <div className="center">
            <div className="button-container">
            <button 
              value="Testing" 
              onClick={handleLocationChange} className="buttonDesign"
            >Testing</button>
            
            </div>
            <div className="button-container">
            <button 
              value="Meeting" 
              onClick={handleLocationChange} className="buttonDesign"
            >Meeting</button>
            
            </div>
            <div className="button-container">
            <button 
              value="Out of School" 
              onClick={handleLocationChange} className="buttonDesign"
            >Out of School</button>
            
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
                    Available until:
                    <input type="time" value={localLocationInfo.currentTime} onChange={handleTimeChange} />
                    </label>
                </div>
                )}
                <br />
                <input type="button" value="" className="buttonDesign" onClick={clearLocal}>Clear</input>
                <input type="submit" value="Apply" className="buttonDesign" />
            </form>
            </div>

            <div className="marginTop">
                <Link to="/">
                    <button className="buttonDesign">Back to Home</button>
                </Link>
            </div>

        </div>
    );
}
