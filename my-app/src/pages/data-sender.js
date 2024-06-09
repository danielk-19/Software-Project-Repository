import React, { useEffect, useState, useContext } from "react";
import AvailabilityContext from "../context/AvailabilityContext";
import { LocationInfoContext } from "../context/LocationInfoContext";
import { useLocation } from 'react-router-dom';
import * as Realm from "realm-web";

const REALM_APP_ID = "location-updater-database-xxrruor";
const app = new Realm.App({ id: REALM_APP_ID });
const credentials = Realm.Credentials.anonymous();

function Sender() {
    const { available } = useContext(AvailabilityContext);
    const { locationInfoData } = useContext(LocationInfoContext);
    const location = useLocation();
    const doUpdate = location.state?.doUpdate;
    
    const [localData, setLocalData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchSharedData = async () => {
        try {
            const user = await app.logIn(credentials);
            const mongodb = user.mongoClient("mongodb-atlas");
            const collection = mongodb.db("software-project").collection("datas");
            
            const data = await collection.find({});
            setLocalData(data.slice(0, -3));
            setIsLoading(false);
        } catch (error) {
            console.error("Error fetching data:", error);
            setIsLoading(false);
        }
    };

    const handleSaveData = async () => {
        try {
            const user = await app.logIn(credentials);
            const mongodb = user.mongoClient("mongodb-atlas");
            const collection = mongodb.db("software-project").collection("datas");
            
            await collection.deleteMany({});
            await collection.insertMany([
                { text: available },
                { text: locationInfoData.currentLocation },
                { text: locationInfoData.currentTime }
            ]);
        } catch (error) {
            console.error("Error saving data:", error);
        }
    };

    useEffect(() => {
        const updateAndFetchData = async () => {
            if (doUpdate) {
                await handleSaveData();
            }
            await fetchSharedData();
        };

        updateAndFetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [doUpdate, available, locationInfoData]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Ms. Blair's Location</h1>
            <ul>
                {localData.map((item, index) => (
                    <li key={index}>{item.text}</li>
                ))}
            </ul>
        </div>
    );
}

export default Sender;
