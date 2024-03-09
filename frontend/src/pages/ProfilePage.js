import React from "react";
import {Link} from "react-router-dom";

const handleLogout = () => {
    // Добавьте логику для выхода из аккаунта
    alert("Successfully logged out!");

};
const ProfilePage = () => {
    const user = {
        username: "JohnDoe",
        email: "johndoe@example.com",
        location: "New York",
        bio: "Software Developer",
        additionalInfo: [
            { label: "Phone", value: "XXX-XXX-XXXX" },
            { label: "Website", value: "example.com" },
            // Дополнительные данные для отображения
        ]
    };

    return (
        <div style={{ backgroundColor: "#f0f8ff", color: "#0066cc", padding: "20px", borderRadius: "10px", boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)", width: "100%", maxWidth: "1000vw", boxSizing: "border-box" }}>

            <div style={{flex: 1}}>
                <h1>{user.username}'s Profile</h1>
                <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                     alt="Profile Picture" style={{borderRadius: "50%", width: "150px", height: "150px"}}/>
                <Link to={"/api/v1/"}>
                <button onClick={handleLogout} style={{
                    padding: "10px 20px",
                    backgroundColor: "#dc3545",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                    marginTop: "20px"
                }}>Logout
                </button>
                </Link>
                <br/><br/>

                <p>Email: {user.email}</p>
                <p>Location: {user.location}</p>
                <p>Bio: {user.bio}</p>
            </div>
            <div style={{flex: 1, paddingLeft: "20px"}}>
                <p>Additional information from database:</p>
                {user.additionalInfo.map((info, index) => (
                    <div key={index} style={{ marginBottom: "10px", backgroundColor: "#b3b9b9", padding: "20px", borderRadius: "10px"}}>
                        <p><strong>{info.label}:</strong> {info.value}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProfilePage;