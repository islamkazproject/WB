// App.js
import "../styles/Appointment.css"
import React, { useState, useEffect } from 'react';

const Appointment = () => {
    const [services, setServices] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [selectedService, setSelectedService] = useState('');
    const [selectedDoctor, setSelectedDoctor] = useState('');

    // Загрузка данных services и doctors при монтировании компонента
    useEffect(() => {
        // Загрузка данных services и doctors из API или другого источника данных
        const fetchedServices = [
            { id: 1, name: 'Service 1' },
            { id: 2, name: 'Service 2' },
            // Другие сервисы
        ];

        const fetchedDoctors = [
            { id: 1, name: 'Doctor 1' },
            { id: 2, name: 'Doctor 2' },
            // Другие доктора
        ];

        setServices(fetchedServices);
        setDoctors(fetchedDoctors);
    }, []);

    return (
        <div className="make_form">
            <h1>Выберете услугу</h1><br/>
            <label for="select0">Выберите тип приема:</label><br/>
            <select id="select0" value={selectedService} onChange={(e) => setSelectedService(e.target.value)}>
                <option value=""></option>
                {services.map(service => (
                    <option key={service.id} value={service.id}>{service.name}</option>
                ))}
            </select><br/><br/>

            <label for="select1">Выберите лечащего врача:</label><br/>
            <select id="select1" value={selectedDoctor} onChange={(e) => setSelectedDoctor(e.target.value)}>
                <option value=""></option>
                {doctors.map(doctor => (
                    <option key={doctor.id} value={doctor.id}>{doctor.name}</option>
                ))}
            </select><br/><br/>

            {/* Здесь можно добавить другие выпадающие списки для даты и времени */}

            <form action="make_opp" method="POST" id="make_opp" className="form_button">
                <input type="submit" value="Создать запись"/>
            </form>
        </div>
    );
};

export default Appointment;