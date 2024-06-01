import React, { useContext, useState, useEffect } from "react";
import { SettingsContext } from "../context/SettingsContext";
import './settings-style.css';

const Settings = ({ onClose }) => {
    const { settingsData, updateSettings } = useContext(SettingsContext);
    const [localSettings, setLocalSettings] = useState(settingsData);

    useEffect(() => {
        setLocalSettings(settingsData);
    }, [settingsData]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setLocalSettings((prev) => ({ ...prev, [name]: value}));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        updateSettings(localSettings);
        onClose();
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <h1>Settings</h1>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="setDefault">Set Default Room: </label>
                    <input type="text" id="setDefault" name="setDefault" 
                        value={localSettings.setDefault}
                        onChange={handleInputChange}
                    /><br /><br />
                    <input className="submit-button" type="submit" value="Apply" />
                </form>
            </div>
        </div>
    );
};

export default Settings;