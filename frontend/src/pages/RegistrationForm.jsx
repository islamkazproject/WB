import React, { useState } from 'react';
import '../styles/Registration.css';
import axios from 'axios';

const RegistrationForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        patronymic: '',
        user_birth_date: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            alert('Passwords do not match. Please make sure your passwords match.');
            return;
        }

        try {
            // Register user
            const registerResponse = await axios.post('http://localhost:8080/api/v1/auth/users/', {
                email: formData.email,
                username: formData.name,
                password: formData.password
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            // Get user authorization token
            const loginResponse = await axios.post('http://0.0.0.0:8080/api/v1/auth/token/login/', {
                password: formData.password,
                username: formData.name
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const token = loginResponse.data.auth_token;
            localStorage.setItem('token', token);

            // Get user profile data
            const meResponse = await axios.get('http://localhost:8080/api/v1/auth/users/me/', {
                headers: {
                    'Authorization': `Token ${token}`
                }
            });

            const profileData = {
                user_patronymic: formData.patronymic,
                user_birth_date: formData.birthday,
                role: 'patient',
                user: meResponse.data.id
            };

            console.log(meResponse.data.id);

            // Update user profile
            const profileResponse = await axios.patch(`http://localhost:8080/api/v1/profiles/${meResponse.data.id}/`, profileData, {
                headers: {
                    'Authorization': `Token ${token}`
                }
            });

            localStorage.removeItem('token');

        } catch (error) {
            if (error.response && error.response.data) {
                const { data } = error.response;
                console.error('Error details:', data);

                if (data.username) {
                    const usernameError = data.username[0];
                    console.log('Username error:', usernameError);
                }
            } else {
                console.error('An unexpected error occurred:', error);
            }
        }
    };

    return (
        <div>
            <div className="wrapper">
                <h2>Registration</h2>
                <form onSubmit={handleSubmit}>
                    <div className="input-box">
                        <input type="text" name="name" placeholder="Enter your name" onChange={handleChange} required/>
                    </div>
                    <div className="input-box">
                        <input type="text" name="patronymic" placeholder="Enter your patronymic" onChange={handleChange} required/>
                    </div>
                    <div className="input-box">
                        <input type="date" name="birthday" placeholder="Enter birth day" onChange={handleChange} required/>
                    </div>
                    <div className="input-box">
                        <input type="email" name="email" placeholder="Enter your email" onChange={handleChange} required/>
                    </div>
                    <div className="input-box">
                        <input type="password" name="password" placeholder="Create password" onChange={handleChange} required/>
                    </div>
                    <div className="input-box">
                        <input type="password" name="confirmPassword" placeholder="Confirm password" onChange={handleChange} required/>
                    </div>
                    <div className="button-container">
                        <input type="submit" value="Register Now" className="custom-button"/>
                    </div>
                    <div className="text">
                        <h3>Already have an account? <a href="/api/v1/login">Login now</a></h3>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RegistrationForm;