import React, { useEffect, useState, useContext } from "react";
import AvailabilityContext from "../context/AvailabilityContext";
import { LocationInfoContext } from "../context/LocationInfoContext";
import * as Realm from "realm-web";

const REALM_APP_ID = "location-updater-database-xxrruor";

function Sender() {
    const { available } = useContext(AvailabilityContext);
    const { locationInfoData } = useContext(LocationInfoContext);

    const [localData, setLocalData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const app = new Realm.App({ id: REALM_APP_ID });
    const credentials = Realm.Credentials.anonymous();

    const fetchSharedData = async () => {
        try {
            const user = await app.logIn(credentials);
            const mongodb = user.mongoClient("mongodb-atlas");
            const collection = mongodb.db("software-project").collection("datas");

            const data = await collection.find({});
            if (data.length > 0) {
                setLocalData(data);
                setIsLoading(false);
            }
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
            await collection.insertMany([{ text: available }, { text: locationInfoData.currentLocation }, { text: locationInfoData.currentTime }]);
            fetchSharedData();
        } catch (error) {
            console.error("Error saving data:", error);
        }
    };

    useEffect(() => {
        const intervalId = setInterval(() => {
            handleSaveData();
        }, 5000);

        return () => clearInterval(intervalId);
    }, []);

    useEffect(() => {
        fetchSharedData();
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Ms. Blair's Location</h1>
            <ul>
                {localData.map(item => (
                    <li key={item._id}>{item.text}</li>
                ))}
            </ul>
        </div>
    );
}

export default Sender;
