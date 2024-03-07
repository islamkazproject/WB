import React from "react";

const ProfilePage = () => {
    return (
        <div style={{ backgroundColor: "#f0f8ff", color: "#0066cc", padding: "20px", borderRadius: "10px", boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)" }}>
            <h1>Profile Page</h1>
            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp" alt="Profile Picture" style={{ borderRadius: "50%", width: "150px", height: "150px" }} />
            <p>Welcome to your profile page!</p>
            <p>Feel free to customize your profile here.</p>
        </div>
    );
};

export default ProfilePage;