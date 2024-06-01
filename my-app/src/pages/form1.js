import React, { useContext, useState } from 'react';
import { Link } from "react-router-dom";
import { SettingsContext } from '../context/SettingsContext';

export default function Form1() {
  const [selectedTime, setSelectedTime] = useState('');
  const [location, setLocation] = useState('');
  const { settingsData } = useContext(SettingsContext);

  const handleTimeChange = (event) => {
    setSelectedTime(event.target.value);
  };

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };

  return (
    <div className="container center">

        <div>
            <button 
              value={settingsData.setDefault === "" ? "Media Center" : settingsData.setDefault} 
              onClick={handleLocationChange} className="buttonDesign"
            >Default Room</button>
        </div>

        <div>
        <form>
            <label>
                Location:
                <input type="text" value={location} onChange={handleLocationChange} />
            </label>
            {location && (
            <div>
                <label>
                (Optional) Available until:
                <input type="time" value={selectedTime} onChange={handleTimeChange} />
                </label>
            </div>
            )}
        </form>
        <p>{location}, {selectedTime}</p>
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