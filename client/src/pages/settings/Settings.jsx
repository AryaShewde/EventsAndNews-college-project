import "./settings.css"
import React, { useContext, useState } from 'react'
import axios from 'axios';
import { Context } from "../../context/Context"

const Settings = () => {
    const [file, setFile] = useState(null);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [success, setSuccess] = useState(false);

    const { user, dispatch } = useContext(Context);
    // const PF = "https://eventsandnewsapi.onrender.com/images/"
    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch({ type: "UPDATE_START" })
        const updatedUser = {
            userId: user._id,
            username,
            email,
            password,
        };
        if (file) {
            const data = new FormData();
            // const filename = Date.now() + file.name;
            // data.append("name", filename);
            data.append("file", file);
            data.append("userId", user._id);
            // updatedUser.profilePic = filename;
            try {
                await axios.put("https://ean-be-updated.vercel.app/api/uploading/" + user._id, data);
            } catch (error) { }
        }
        try {
            const res = await axios.put('https://ean-be-updated.vercel.app/api/users/' + user._id, updatedUser);
            setSuccess(true);
            dispatch({ type: "UPDATE_SUCCESS", payload: res.data })
            window.location.replace("/");
        } catch (error) {
            dispatch({ type: "UPDATE_FAILURE" })
        }

    }

    return (
        <>
            <div className="settings">
                <div className="settingsWrapper">
                    <div className="settingsTitle">
                        <span className="settingsUpdateTitle">Update your Account</span>
                        <span className="settingsDeleteTitle">Delete Account</span>
                    </div>
                    <form className="settingsForm" onSubmit={handleSubmit}>
                        <label>Profile Picture</label>
                        <div className="settingsPP">
                                <img src={file ? URL.createObjectURL(file) : user.profilePic} alt=""/>
                            <label htmlFor="fileInput">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="settingsPPIcon bi bi-person-circle" viewBox="0 0 16 16">
                                    <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                                    <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
                                </svg>
                            </label>
                            <input
                                type="file"
                                id="fileInput"
                                style={{ display: "none" }}
                                onChange={(e) => setFile(e.target.files[0])}
                                required
                            />
                        </div>
                        <label>Username</label>
                        <input
                            type="text"
                            placeholder={user.username}
                            onChange={e => setUsername(e.target.value)}
                            required
                        />
                        <label>Email</label>
                        <input
                            type="email"
                            placeholder={user.email}
                            onChange={e => setEmail(e.target.value)}
                            required
                        />
                        <label>Password</label>
                        <input type="password" onChange={e => setPassword(e.target.value)} required />
                        <button className="settingsSubmit" type="submit">Update</button>
                        {success && <span style={{ color: "green", marginTop: "20px", display: "flex", alignSelf: "center" }}>Profile has been updated...</span>}
                    </form>
                </div>
                {/* <Sidebar /> */}
            </div>
        </>
    )
}

export default Settings
