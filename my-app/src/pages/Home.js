import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AvailabilityContext from "../context/AvailabilityContext";

export default function Home() {
    const { available, handleAvailabilityChange } = useContext(AvailabilityContext);

    return (
        <div className="center">
            <h1 className="status-circle">Status<br/>{available}</h1>
            <div className="button-container">
                <Link to="/form1">
                    <button className="buttonDesign" onClick={() => handleAvailabilityChange("IN")}>In</button>
                </Link>
                <Link to="/form2">
                    <button className="buttonDesign" onClick={() => handleAvailabilityChange("OUT")}>Out</button>
                </Link>
            </div>
        </div>
    );
}
