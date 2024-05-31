import React, { useState, useEffect } from "react";
import AvailabilityContext from "./AvailabilityContext";

export function AvailabilityProvider({ children }) {
    const [available, setAvailability] = useState(() => {
        // Get initial state from localStorage or set to empty string
        const savedAvailability = localStorage.getItem("available");
        return savedAvailability !== null ? savedAvailability : '';
    });

    useEffect(() => {
        // Update localStorage whenever available changes
        localStorage.setItem("available", available);
    }, [available]);

    const handleAvailabilityChange = (status) => {
        setAvailability(status);
    };

    return (
        <AvailabilityContext.Provider value={{ available, handleAvailabilityChange }}>
            {children}
        </AvailabilityContext.Provider>
    );
}
