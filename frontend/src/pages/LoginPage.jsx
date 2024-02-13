// LoginPage.jsx

import React from 'react';

const LoginPage = () => {
    return (
        <div>
            <h1>Login Page</h1>
            <form>
                <label>Email:</label>
                <input type="email" />
                <label>Password:</label>
                <input type="password" />
                <button type="submit">Log In</button>
            </form>
        </div>
    );
};

export default LoginPage;