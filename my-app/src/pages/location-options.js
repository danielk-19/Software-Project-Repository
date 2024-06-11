import React from "react";
import './settings-style.css';

const LocationOptions = ({ textBoxes, addTextBox, removeTextBox, onTextBoxChange }) => {
    return (
        <div>
            <input type="button" onClick={addTextBox} value="Add Location" className="buttonDesign" />
            <div className="button-container">
                {textBoxes.map((textBox) => (
                    <div key={textBox.id}>
                        <input type="text" 
                            placeholder={textBox.placeholder}
                            value={textBox.value}
                            onChange={(e) => onTextBoxChange(textBox.id, e.target.value)}
                            className="textBoxStyle"
                        />
                        <input type="button" onClick={() => removeTextBox(textBox.id)} value="&times;" className="removeButton" />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LocationOptions;
