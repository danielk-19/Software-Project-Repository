import React, { useEffect, useState, useContext } from "react";
import AvailabilityContext from "../context/AvailabilityContext";
import { LocationInfoContext } from "../context/LocationInfoContext";
import { useLocation, useNavigate } from 'react-router-dom';
import * as Realm from "realm-web";
import './status-style.css';

const REALM_APP_ID = "location-updater-database-xxrruor";
const app = new Realm.App({ id: REALM_APP_ID });
const credentials = Realm.Credentials.anonymous();

function Sender() {
    const { available } = useContext(AvailabilityContext);
    const { locationInfoData } = useContext(LocationInfoContext);
    const navigate = useNavigate();
    const location = useLocation();
    const doUpdate = location.state?.doUpdate;
    const back = location.state?.back;
    const scheme = location.state?.scheme;
    
    const [localData, setLocalData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    if (back) {
        navigate("/");
    }

    const fetchSharedData = async () => {
        try {
            const user = await app.logIn(credentials);
            const mongodb = user.mongoClient("mongodb-atlas");
            const collection = mongodb.db("software-project").collection("datas");
            
            const data = await collection.find({});
            setLocalData(data);
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
            if (doUpdate) {
                navigate("/");
            }
        };

        updateAndFetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [doUpdate, available, locationInfoData]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    const predefinedColors = ['white', 'yellow', 'pink', 'orange', 'rainbow'];
    const isPredefinedColor = scheme && predefinedColors.includes(scheme.toLowerCase());

    return (
        <div className={`status-display ${isPredefinedColor ? scheme : "rainbow"}`}>
            <h1>Where's Ms. Blair?</h1>
            <div>
                {localData.map((item, index) => (
                    <h2 key={index}>{item.text}</h2>
                ))}
            </div>
        </div>
    );
}

export default Sender;
