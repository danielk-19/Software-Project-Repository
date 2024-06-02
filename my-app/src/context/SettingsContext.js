import React, { createContext, useState, useEffect } from 'react';

const SettingsContext = createContext();

const SettingsProvider = ({ children }) => {
    const [settingsData, setSettingsData] = useState(() => {
        const storedData = localStorage.getItem('settingsData');
        return storedData ? JSON.parse(storedData) : { setDefault: "", textBoxes: [] };
    });

    useEffect(() => {
        localStorage.setItem('settingsData', JSON.stringify(settingsData));
    }, [settingsData]);

    const updateSettings = (data) => {
        setSettingsData(data);
    };

    return (
        <SettingsContext.Provider value={{ settingsData, updateSettings }}>
            {children}
        </SettingsContext.Provider>
    );

};

export { SettingsContext, SettingsProvider };
