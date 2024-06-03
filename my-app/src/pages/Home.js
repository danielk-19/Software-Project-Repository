import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AvailabilityContext from "../context/AvailabilityContext";
import { LocationInfoContext } from "../context/LocationInfoContext";

export default function Home() {
    const { available, handleAvailabilityChange } = useContext(AvailabilityContext);
    const { locationInfoData } = useContext(LocationInfoContext);

    const redirectToAnotherSite = (message) => {
        const siteUrl = 'https://sites.google.com/view/wwwfalconlibraryorg';
        window.parent.postMessage(message, siteUrl);
    };

    return (
        <div className="center">
            <h1 className="status-circle">Status<br/>{available}<br />{locationInfoData.currentLocation}<br />{locationInfoData.currentTime}</h1>
            <div className="button-container">
                <Link to="/form1">
                    <button className="buttonDesign" onClick={() => handleAvailabilityChange("IN")}>In</button>
                </Link>
                <Link to="/form2">
                    <button className="buttonDesign" onClick={() => handleAvailabilityChange("OUT")}>Out</button>
                </Link>
            </div>
            <button className="buttonDesign" onClick={() => redirectToAnotherSite(available)}>Update</button>
        </div>
    );
}
