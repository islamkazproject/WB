import "../styles/Login.css"
import React from 'react';

const LoginPage = () => {
    return (
        <div className="wrapper">
            <h1>Login Page</h1>
            <form>
                <label>Email:</label>
                <input type="email"/><br/><br/>
                <label>Password:</label>
                <input type="password"/>
                <button type="submit">Log In</button>
            </form>
            <br/><br/>
            <div className="register-link">
                <p>Don't have an account? <a href="/api/v1/registration">Register here</a></p>
            </div>
        </div>
    );
};

export default LoginPage;