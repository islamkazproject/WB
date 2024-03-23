import React from 'react';
import '../styles/Registration.css';
import Banner from "../components/banner/Banner";
import Footer from "../components/Footer/Footer";

const RegistrationForm = () => {
    return (
        <div>
        <div className="wrapper">
            <h2>Registration</h2>
            <form action="#">
                <div className="input-box">
                    <input type="text" placeholder="Enter your name" required/>
                </div>
                <div className="input-box">
                    <input type="date" placeholder="Enter birght day" required/>
                </div>
                <div className="input-box">
                    <input type="email" placeholder="Enter your email" required/>
                </div>
                <div className="input-box">
                    <input type="password" placeholder="Create password" required/>
                </div>
                <div className="input-box">
                    <input type="password" placeholder="Confirm password" required/>
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