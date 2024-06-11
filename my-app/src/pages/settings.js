import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SettingsContext } from "../context/SettingsContext";
import LocationOptions from "./location-options";
import './settings-style.css';
import * as Realm from "realm-web";

const REALM_APP_ID = "location-updater-database-xxrruor";
const app = new Realm.App({ id: REALM_APP_ID });
const credentials = Realm.Credentials.anonymous();
const admin_password = "__cc__";

const Settings = ({ onClose }) => {
    const { settingsData, updateSettings } = useContext(SettingsContext);
    const [localSettings, setLocalSettings] = useState(settingsData);
    const [color, setColor] = useState('');
    const navigate = useNavigate();

    const [key, setKey] = useState('');
    const [changePassword, setChangePassword] = useState(false);

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
        if (changePassword) {
            handlePasswordChange();
            setChangePassword(false);
        }
        navigate("/data-sender", { state: { back: true, scheme: color } });
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

    const handlePasswordChange = async () => {
        try {
            const user = await app.logIn(credentials);
            const mongodb = user.mongoClient("mongodb-atlas");
            const collection = mongodb.db("software-project").collection("keys");
            
            await collection.deleteMany({});
            await collection.insertMany([{ password: admin_password }, { password: key }]);
        } catch (error) {
            console.error("Error saving password:", error);
        }
    };

    const updatePassword = (value) => {
        setChangePassword(true);
        setKey(value);
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <h1>Settings</h1>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="setDefault">Set Default Room: </label>
                    <input type="text" id="setDefault" name="setDefault" placeholder="Default"
                        value={localSettings.setDefault}
                        onChange={handleInputChange}
                    /><br /><br />
                    <LocationOptions 
                        textBoxes={localSettings.textBoxes}
                        addTextBox={addTextBox}
                        removeTextBox={removeTextBox}
                        onTextBoxChange={handleTextBoxChange}
                    /><br />
                    <label htmlFor="setPassword">Change Password: </label>
                    <input type="password" id="setPassword" name="setPassword" 
                        onChange={(e) => updatePassword(e.target.value)} className="textBoxStyle"
                        value={key} placeholder="Password"
                    /><br /><br />
                    <label htmlFor="colorPicker">Change Color: </label>
                    <input type="textbox" id="colorPicker" name="colorPicker" className="textBoxStyle"
                        placeholder="Color" value={color} onChange={(e) => setColor(e.target.value)}
                    /><input type="checkbox" id="rainbow" name="rainbow" className="checkBoxStyle"
                        value="rainbow" onChange={(e) => e.target.checked && setColor(e.target.value)}
                    /><br /><br />
                    <input className="submit-button" type="submit" value="Apply" />
                </form>
            </div>
        </div>
    );
};

export default Settings;