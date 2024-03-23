import "../../styles/Services.css";
import {Link} from "react-router-dom";
import React, {useEffect, useState} from 'react';
import axios from "axios";

const Services = () => {
    const [services, setServices] = useState([]);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await axios.get("http://0.0.0.0:8080/api/v1/services/");
                setServices(response.data);
            } catch (error) {
                console.error("Error fetching services: ", error);
            }
        }

        fetchServices();
    }, []);

    // Функция для обрезки пути
    const trimImagePath = (fullPath) => {
        const pathParts = '../../images/' + fullPath.split('/').slice(-2).join('/');
        return require(pathParts);
    }

    return (
        <div className="bg-gradient-to-r from-primary to-secondary">
            <h2 id="section1">Наши услуги</h2>
            <div className="serv_container grid lg:grid-cols-3 grid-cols-1 gap-6 text-white mt-12">
                {services.map((service) => (
                    <div key={service.id} className="card hover:shadow-md transition-all">
                        <Link to={`/api/v1/service/?id=${service.id}`}>
                            <button>
                                <img src={(require('../../images/' + (service.service_image).split('/').slice(-2).join('/')))} alt={service.service_name}/>
                                <div className="card-body p-4 flex flex-col justify-between">
                                    <h3 className="service-name mt-2"
                                        style={{color: '#000'}}>{service.service_name}</h3>
                                </div>
                                <div><h2 style={{color: 'black'}}>{service.service_price + 'p'}</h2>
                                </div>
                            </button>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Services;