import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Realm from "realm-web";

const REALM_APP_ID = "location-updater-database-xxrruor";
const app = new Realm.App({ id: REALM_APP_ID });
const credentials = Realm.Credentials.anonymous();

function Login({ setLoggedIn }) {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const user = await app.logIn(credentials);
            const mongodb = user.mongoClient("mongodb-atlas");
            const collection = mongodb.db("software-project").collection("keys");
            
            const data = await collection.find({});

            // Check if any document's password matches the entered password
            const matchedPassword = data.find(doc => doc.password === password);

            if (matchedPassword) {
                setLoggedIn(true);
                navigate("/");
            } else {
                setError('Invalid Password');
            }
        } catch (error) {
            console.error('Login failed:', error);
            setError('An error occurred during login');
        }
    };

    return (
        <div className="login-display">
            <h1>Enter Password</h1>
            {error && <p>{error}</p>}
            <form onSubmit={handleSubmit} className="button-container">
                <input className="password" type="password" placeholder="Password"
                    value={password} onChange={(e) => setPassword(e.target.value)}
                /><br /><br />
                <input className="buttonDesign" type="submit" value="Login" />
            </form>
        </div>
    );
}

export default Login;
