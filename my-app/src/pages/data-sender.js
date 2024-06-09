import React, { useContext } from "react";
import AvailabilityContext from "../context/AvailabilityContext";
import { LocationInfoContext } from "../context/LocationInfoContext";

function Sender() {
    const { available } = useContext(AvailabilityContext);
    const { locationInfoData } = useContext(LocationInfoContext);

    return (
        <div>
            <h1>Ms. Blair's Location</h1>
            <h1>Availability: {available}<br />Location: {locationInfoData.currentLocation}<br />(Un)Available Until {locationInfoData.currentTime}</h1>
        </div>
    );
}

export default Sender;