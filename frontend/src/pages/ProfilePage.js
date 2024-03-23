import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const handleLogout = () => {
    alert("Successfully logged out!");
    localStorage.removeItem('token');
    window.location.href = "http://localhost:3000/api/v1/";
};

const ProfilePage = () => {
    const [appointmentHistory, setAppointmentHistory] = useState([]);
    const [servicesData, setServicesData] = useState({});
    const [datesData, setDatesData] = useState({});

    const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    useEffect(() => {
        fetchAppointmentHistory();
    }, []);

    const fetchAppointmentHistory = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/v1/appointments/history/${userInfo.userData.id}`, {
                headers: {
                    'Authorization': `Token ${localStorage.getItem('token')}`
                }
            });
            setAppointmentHistory(response.data);

            response.data.forEach(appointment => {
                fetchServices(appointment.appointment_service).then(data => {
                    setServicesData(prevData => ({
                        ...prevData,
                        [appointment.appointment_service]: data
                    }));
                });

                fetchDates(appointment.appointment_schedule).then(data => {
                    setDatesData(prevData => ({
                        ...prevData,
                        [appointment.appointment_schedule]: data
                    }));
                });
            });
        } catch (error) {
            console.error('Error fetching appointment history:', error);
        }
    };

    const fetchServices = async (serviceId) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/v1/services/${serviceId}`, {
                headers: {
                    'Authorization': `Token ${localStorage.getItem('token')}`
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching services:', error);
        }
    };

    const fetchDates = async (scheduleId) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/v1/schedules/${scheduleId}`, {
                headers: {
                    'Authorization': `Token ${localStorage.getItem('token')}`
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching dates:', error);
        }
    };

    return (
        <div style={{ backgroundColor: "#f0f8ff", color: "#0066cc", padding: "20px", borderRadius: "10px", boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)", width: "100%", maxWidth: "1000vw", boxSizing: "border-box" }}>
            <div style={{ flex: 1 }}>
                <h1>User Profile</h1>
                <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp" alt="Profile Picture" style={{ borderRadius: "50%", width: "150px", height: "150px" }} />
                <Link to={"/api/v1/"}>
                    <button onClick={handleLogout} style={{ padding: "10px 20px", backgroundColor: "#dc3545", color: "white", border: "none", borderRadius: "5px", cursor: "pointer", marginTop: "20px" }}>Logout</button>
                </Link>
                <br/><br/>
                <p>Email: {userInfo.userData.email}</p>
                <p>Patronymic: {userInfo.desiredUser.user_patronymic}</p>
                <p>Date: {userInfo.desiredUser.user_birth_date}</p>
            </div>
            <div style={{ flex: 1, paddingLeft: "20px" }}>
                <p>History of appointments:</p>
                {appointmentHistory.map((appointment, index) => {
                    const serviceData = servicesData[appointment.appointment_service] || {};
                    const dateData = datesData[appointment.appointment_schedule] || {};

                    return (
                        <div key={index} style={{ marginBottom: "10px", backgroundColor: "#b3b9b9", padding: "20px", borderRadius: "10px" }}>
                            <p><strong>Service:</strong> {serviceData.service_name}</p>
                            <p><strong>Date:</strong> {dateData.date}</p>
                            <p><strong>Time:</strong> {dateData.time_slot}</p>
                            {/* Другие данные записи */}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ProfilePage;