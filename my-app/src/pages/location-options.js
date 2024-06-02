import React from "react";

const LocationOptions = ({ textBoxes, addTextBox, removeTextBox, onTextBoxChange }) => {
    return (
        <div>
            <input type="button" onClick={addTextBox} value="Add Location" />
            <div className="button-container">
                {textBoxes.map((textBox) => (
                    <div key={textBox.id}>
                        <input type="text" 
                            placeholder={textBox.placeholder}
                            value={textBox.value}
                            onChange={(e) => onTextBoxChange(textBox.id, e.target.value)}
                        />
                        <input type="button" onClick={() => removeTextBox(textBox.id)} value="&times;" />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LocationOptions;
