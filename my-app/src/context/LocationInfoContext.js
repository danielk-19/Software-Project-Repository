import React, { createContext, useState, useEffect } from 'react';

const LocationInfoContext = createContext();

const LocationInfoProvider = ({ children }) => {
    const [locationInfoData, setLocationInfoData] = useState(() => {
        const storedData = localStorage.getItem('locationInfoData');
        return storedData ? JSON.parse(storedData) : { currentLocation: "", currentTime: "" };
    });

    useEffect(() => {
        localStorage.setItem('locationInfoData', JSON.stringify(locationInfoData));
    }, [locationInfoData]);

    const updateLocationInfoData = (data) => {
        setLocationInfoData(data);
    };

    return (
        <LocationInfoContext.Provider value={{ locationInfoData, updateLocationInfoData }}>
            {children}
        </LocationInfoContext.Provider>
    );

};

export { LocationInfoContext, LocationInfoProvider };