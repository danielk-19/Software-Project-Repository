import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LocationInfoContext } from "../context/LocationInfoContext";

export default function Home() {
    const { locationInfoData } = useContext(LocationInfoContext);
    const navigate = useNavigate();

    const confirmUpdate = () => {
        navigate("/data-sender", { state: { doUpdate: true } });
    };

    return (
        <div className="center">
            <h1 className="status-circle">Status<br />{locationInfoData.currentLocation}<br />{locationInfoData.currentTime}</h1>
            <div className="button-container">
                <Link to="/form1">
                    <button id="location-editor">Edit Location</button>
                </Link>
            </div>
            <button onClick={confirmUpdate} className="buttonDesign">Update</button>
        </div>
    );
}
