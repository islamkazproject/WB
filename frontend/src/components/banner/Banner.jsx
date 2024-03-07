import React from "react";
import { Link } from "react-router-dom";
import "../../styles/Banner.css";


const Banner = () => {
    return (
        <div className="banner">
            <div className="container">
                <Link to="/api/v1/profile" className="icon_button"
                      style={{position: "absolute", top: 10, right: 5, padding: "10px"}}>
                    <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                         alt="Profile Picture" style={{borderRadius: "50%", width: "80px", height: "80px",border: "10px"}}/>
                </Link>
                <h1 id="section3">Eat wisely, smile nicely</h1>
                <p>
                    Relax, this is going to be so easy. The smart way to find a dentist.
                    <br/>
                    Get matched with a great dentist today. Seriously, it’s time.
                </p>

                <Link to="/api/v1/service" className="button">
                    Make an Appointment
                </Link>

            </div>
        </div>
    );
};

export default Banner;