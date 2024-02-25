import React from "react";
import implantImage from '../../images/Implant.jpeg';
import parandrozImage from '../../images/parandroz.jpeg';
import "../../styles/Services.css";


const Services = () => {
    const services = [
        {
            id: 1,
            name: "Имплантация зубов",
            image: implantImage,
        },
        {
            id: 2,
            name: "Лечение пародонтоза",
            image: parandrozImage,
        },
    ];

    return (
        <div className="bg-gradient-to-r from-primary to-secondary">
            <h2>Наши услуги</h2>
            <div className="serv_container grid lg:grid-cols-3 grid-cols-1 gap-6 text-white mt-12">
                {services.map((service) => (
                    <div key={service.id} className="card hover:shadow-md transition-all">
                        <button className="service_btn">
                            <img src={service.image} alt={service.name}/>
                            <div className="card-body p-4 flex flex-col justify-between">
                                <h3 className="service-name mt-2" style={{color: '#000'}}>{service.name}</h3></div>
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Services;
