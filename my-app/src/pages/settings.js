import React, { useContext, useState, useEffect } from "react";
import { SettingsContext } from "../context/SettingsContext";
import LocationOptions from "./location-options";
import './settings-style.css';

const Settings = ({ onClose }) => {
    const { settingsData, updateSettings } = useContext(SettingsContext);
    const [localSettings, setLocalSettings] = useState(settingsData);

    useEffect(() => {
        setLocalSettings(settingsData);
    }, [settingsData]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setLocalSettings((prev) => ({ ...prev, [name]: value }));
    };

    const handleTextBoxChange = (id, value) => {
        const updatedTextBoxes = localSettings.textBoxes.map((textBox) => 
            textBox.id === id ? { ...textBox, value } : textBox
        );
        setLocalSettings((prev) => ({ ...prev, textBoxes: updatedTextBoxes }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        updateSettings(localSettings);
        onClose();
    };

    const addTextBox = () => {
        setLocalSettings((prev) => ({ ...prev,
            textBoxes: [...localSettings.textBoxes, { id: Date.now(), value: "", placeholder: `Enter Location` }]
        }));
    };

    const removeTextBox = (id) => {
        setLocalSettings((prev) => ({ ...prev,
            textBoxes: localSettings.textBoxes.filter(textBox => textBox.id !== id)
        }));
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
                    <LocationOptions 
                        textBoxes={localSettings.textBoxes}
                        addTextBox={addTextBox}
                        removeTextBox={removeTextBox}
                        onTextBoxChange={handleTextBoxChange}
                    /><br />
                    <input className="submit-button" type="submit" value="Apply" />
                </form>
            </div>
        </div>
    );
};

export default Settings;