import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import {location} from "./form1"

export default function Home() {
    const [available, setAvailability] = useState();

    const handleAvailabilityChange = (event) => {
        setAvailability(event.target.value);
    };

    return (
        <div className="center" value={available} onChange={handleAvailabilityChange}>
            <div>
                <Link to="/form1" value={true}>
                    <button className="buttonDesign">In</button>
                </Link>
            </div>
            <div>
                <Link to="/form2" value={false}>
                    <button className="buttonDesign">Out</button>
                </Link>
            </div>
        </div>
    );
}