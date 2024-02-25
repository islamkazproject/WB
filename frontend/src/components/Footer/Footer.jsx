import React from "react";
import { Link } from "react-router-dom";
import "../../styles/Fotter.css";

const Footer = () => {
    return (
        <div className="bg-simen py-16">
            <div className="footer_container lg:flex lg:text-center lg:justify-between">
                <div className="lg:w-1/3">
                    <div className="flex">
                        <i className="fas fa-tooth text-4xl text-primary"></i>
                        <span className="text-2xl font-Poppins">
                            Aysha Dental <span className="text-primary">Care</span>
                        </span>
                    </div>
                </div>
                <div className="w-1/3 lg:py-0 py-8">
                    <h1 className="text-2xl font-Poppins">Quick Links</h1>
                    <div className="py-4 flex">
                        <Link to="/" className="btn-link">Home</Link>
                        <Link to="/about" className="btn-link">About Us</Link>
                        <Link to="/services" className="btn-link">Services</Link>
                        <Link to="/contact" className="btn-link">Contact Us</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;