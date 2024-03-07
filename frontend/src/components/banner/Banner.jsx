import React from "react";
import { Link } from "react-router-dom";
import "../../styles/Banner.css";

const Banner = () => {
    return (
        <div className="banner">
            <div className="container">
                <h1 id="section3">Eat wisely, smile nicely</h1>
                <p>
                    Relax, this is going to be so easy. The smart way to find a dentist.
                    <br />
                    Get matched with a great dentist today. Seriously, it’s time.
                </p>
                <Link to="/api/v1/service" className="button">
                    Make an Appointment
                </Link>

                <a href="../../pages/profile.html">
                    Go to Profile
                </a>
            </div>
        </div>
    );
};

export default Banner;