import React from "react";
import implantImage from '../../images/services/Implant.jpeg';
import parandrozImage from '../../images/services/parandroz.jpeg';
import "../../styles/Services.css";
import {Link} from "react-router-dom";


const Services = () => {
    const services = [
        {
            id: 1,
            name: "Имплантация зубов",
            image: implantImage,
            description: "nxknwlks'clnqa",
            price: 1080
        },
        {
            id: 2,
            name: "Лечение пародонтоза",
            image: parandrozImage,
            description: "nxknwlks'clnqa",
            price: 1080
        },
    ];

    return (
        <div className="bg-gradient-to-r from-primary to-secondary">
            <h2 id="section1">Наши услуги</h2>
            <div className="serv_container grid lg:grid-cols-3 grid-cols-1 gap-6 text-white mt-12">
                {services.map((service) => (
                    <div key={service.id} className="card hover:shadow-md transition-all">
                        <Link to="/api/v1/service">
                            <button>
                                <img src={service.image} alt={service.name}/>
                                <div className="card-body p-4 flex flex-col justify-between">
                                    <h3 className="service-name mt-2" style={{color: '#000'}}>{service.name}</h3>
                                </div>
                            </button>
                            <h3>{service.description}</h3>
                    </Link>
                    </div>
                    ))}
            </div>
        </div>
    );
};

export default Services;
