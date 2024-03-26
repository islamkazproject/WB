import React, {useMemo} from "react";
import { useState, useEffect } from 'react';
import axios from 'axios';

const Records = () => {
    const [appointments, setAppointments] = useState([]);
    const userInfo = useMemo(() => JSON.parse(localStorage.getItem('userInfo')), [])

    useEffect(() => {
        const fetchAppointmentDoctor = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/v1/appointments/doctors/${userInfo.userData.id}`, {
                    headers: {
                        'Authorization': `Token ${localStorage.getItem('token')}`
                    }
                });
                setAppointments(response.data);
            } catch (error) {
                console.error('Error fetching appointments for doctor:', error);
            }
        };
        fetchAppointmentDoctor();
    }, [])


console.log(appointments)
    return (
        <div>
            <section className="records" style={{ overflowY: 'scroll', maxHeight: '600px' }}>
                <h3>Записи на прием</h3>
                <ul>
                    {appointments.map(appointment => (
                        <li key={appointment.id}>
                            <p>Пациент: {appointment.appointment_patient}</p>
                            <p>Описание: {appointment.appointment_description}</p>
                            <p>Услуга:{appointment.appointment_service}</p>
                            <p>Статус: {appointment.appointment_status}</p>
                            <p>Дата и время записи: {appointment.schedule_details.date} {appointment.schedule_details.time_slot}</p>
                            <button className="close-btn">Закрыть запись</button>
                        </li>
                    ))}
                </ul>
            </section>
        </div>
    );
};


export default Records;
