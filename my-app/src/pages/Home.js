import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AvailabilityContext from "../context/AvailabilityContext";
import { LocationInfoContext } from "../context/LocationInfoContext";

function Home() {
    const { available, handleAvailabilityChange } = useContext(AvailabilityContext);
    const { locationInfoData } = useContext(LocationInfoContext);
    const navigate = useNavigate();

    const confirmUpdate = () => {
        navigate("/data-sender", { state: { doUpdate: true } });
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
            <button onClick={confirmUpdate} className="buttonDesign">Update</button>
        </div>
    );
}

export default Home;