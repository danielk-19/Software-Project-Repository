import React, { useState } from 'react';
import { Link } from "react-router-dom";

export default function Form1() {
  const [selectedTime, setSelectedTime] = useState('');
  const [location, setLocation] = useState('');

  const handleTimeChange = (event) => {
    setSelectedTime(event.target.value);
  };

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };

  return (
    <div className="container center">

        <div>
            <button value="Library" onClick={handleLocationChange} className="buttonDesign">Default Room</button>
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