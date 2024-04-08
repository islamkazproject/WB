import "../styles/Login.css";
import React, { useState } from 'react';
import axios from "axios";

const LoginPage = () => {
    const [formData, setFormData] = useState({ password: '', username: '' });

    const handleInputChange = (e) => {
        const { value, name } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const loginUser = (formData, onSuccess) => {
        axios.post('http://0.0.0.0:8080/api/v1/auth/token/login/', JSON.stringify(formData), {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                const token = response.data; // Extracting token from response body
                console.log('Authorization : Token' + token.auth_token);

                if (token) {
                    console.log('Login successful! Token received:', token);
                    onSuccess(token.auth_token);
                } else {
                    console.error('Token not received in response');
                    // Handling the case where token was not received from the server
                }
            })
            .catch(error => {
                console.error('Login failed: ', error);
                // Handling login error
            });
    };

    const getUserData = (token) => {
        axios.get('http://0.0.0.0:8080/api/v1/auth/users/me/', {
            headers: {
                'Authorization': `Token ${token}`
            }
        })
            .then(userResponse => {
                const userData = userResponse.data;
                const userDataId = userResponse.data.id;
                console.log("Token = " + token);
                localStorage.setItem('token',token);
                axios.get('http://0.0.0.0:8080/api/v1/profiles/', {
                    headers: {
                        'Authorization': `Token ${token}`
                    }
                })
                    .then(userProfileResponse => {
                    const userProfileData = userProfileResponse.data;
                    const desiredUser = userProfileData.find(userProfile => userProfile.user.toString() === userDataId.toString());
                    const userInfo  = {userData,desiredUser}
                        console.log(userInfo);
                        localStorage.setItem('userInfo', JSON.stringify(userInfo)); // Строкифицируем объект перед сохранением
                    })
                    .catch(error => {
                        console.error('Failed to fetch user profile data: ', error);
                        // Handling error while fetching user data
                    });
            })
            .catch(error => {
                console.error('Failed to fetch user data: ', error);
                // Handling error while fetching user data
            });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);

        loginUser(formData, (token) => {
            getUserData(token);
            const userInfo = JSON.parse(localStorage.getItem('userInfo'));
            debugger
            if(userInfo.desiredUser.role === 'Doctor'){
                window.location.href = 'http://localhost:3000/api/v1/doctor';
            }
            else if(userInfo.desiredUser.role === 'Registrar'){
                window.location.href = 'http://localhost:3000/api/v1/registrar';
            }
            else if(userInfo.desiredUser.role === 'Admin'){
                window.location.href = 'http://localhost:8080/admin';
            }
            else{
                 console.log("Попал")
                 window.location.href = 'http://localhost:3000/api/v1/';
            }
        });
    };

    return (
        <div className="wrapper">
            <h1>Login Page</h1>
            <form onSubmit={handleSubmit}>
                <label>Password:</label>
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                /><br/><br/>
                <label>Username:</label>
                <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                />
                <button type="submit">Log In</button>
            </form>
            <br/><br/>
            <div className="register-link">
                <p>Don't have an account? <a href="/api/v1/sing_in">Register here</a></p>
            </div>
        </div>
    );
};

export default LoginPage;