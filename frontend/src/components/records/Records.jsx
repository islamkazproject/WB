import React, {useMemo} from "react";
import { useState, useEffect } from 'react';
import axios from 'axios';

const Records = () => {
    const [appointments, setAppointments] = useState([]);
    const [appointmentList, setAppointmentList] = useState(appointments);
    const [appointmentDescription, setAppointmentDescription] = useState('');
    const [isUpdated, setIsUpdated] = useState(false)

    const userInfo = useMemo(() => JSON.parse(localStorage.getItem('userInfo')), [])

    useEffect(() => {
        const fetchAppointmentDoctor = async () => {
            try {
                let endpoint = '';
                if (userInfo.desiredUser.role === 'Doctor') {
                    endpoint = `http://localhost:8080/api/v1/appointments/doctors/${userInfo.userData.id}`;
                } else if (userInfo.desiredUser.role === 'Registrar') {
                    endpoint = `http://localhost:8080/api/v1/appointments-registrars/`;
                }

                const response = await axios.get(endpoint, {
                    headers: {
                        'Authorization': `Token ${localStorage.getItem('token')}`
                    }
                });
                debugger;
                console.log(response.data)
                setAppointments(response.data);
            } catch (error) {
                console.error('Error fetching appointments:', error);
            }
        };
        fetchAppointmentDoctor();
    }, [isUpdated, userInfo.userData.id])

    useEffect(() => {
        setAppointmentList(appointments);
    }, [appointments, isUpdated]);

    const handleDescriptionChange = (event) => {
        setAppointmentDescription(event.target.value);
    };

    const saveAppointmentDescription = async (id) => {
        try {
            await axios.patch(`http://localhost:8080/api/v1/appointments/${id}/`, { appointment_description: appointmentDescription }, {
                headers: {
                    'Authorization': `Token ${localStorage.getItem('token')}`
                }
            });
            console.log('Appointment description saved successfully.');
            setIsUpdated(!isUpdated);
        } catch (error) {
            console.error('Error saving appointment description:', error);
        }
    };

    const handleCloseRecord = (id) => {
        const updatedAppointments = appointmentList.map(appointment => {
            if (appointment.id === id) {
                return { ...appointment, appointment_status: 'D' };
            }
            return appointment;
        });

        setAppointmentList(updatedAppointments);

        let status = ''; // Переменная для хранения статуса
        debugger
        if (userInfo.desiredUser.role === 'Doctor') {
            status = 'D'; // Устанавливаем статус 'D' для врача

        } else if (userInfo.desiredUser.role === 'Registrar') {
            status = 'A'; // Устанавливаем статус 'A' для регистратора
        }

        updateStatusOnServer(id, status);
    };

    const updateStatusOnServer = async (id, newStatus) => {
        try {
            await axios.patch(`http://localhost:8080/api/v1/appointments/${id}/`, { appointment_status: newStatus }, {
                headers: {
                    'Authorization': `Token ${localStorage.getItem('token')}`
                }
            });
            console.log('Status updated successfully on the server.');
            setIsUpdated(!isUpdated);
        } catch (error) {
            console.error('Error updating status on the server:', error);
        }
    };

    return (
        <div>
            <section className="records" style={{ overflowY: 'scroll', maxHeight: '600px' }}>
                <h3>Записи на прием</h3>
                <ul>
                    {appointments.map(appointment => (
                        <li key={appointment.id}>
                            <p>Пациент: {appointment.appointment_patient.last_name} {appointment.appointment_patient.first_name} {appointment.appointment_patient.patronymic}</p>
                            <p>История болезней: {appointment.appointment_description}</p>
                            <p>Ввести: </p>
                            <div>
                                <textarea value={appointmentDescription} onChange={handleDescriptionChange} />
                                <button className="save-btn" onClick={() => saveAppointmentDescription(appointment.id)}>Сохранить</button>
                            </div>
                            <p>Назвние услуги: {appointment.appointment_service.service_name}</p>
                            <p>Описание услуги: {appointment.appointment_service.service_description}</p>
                            <p>Прайс: {appointment.appointment_service.service_price} руб.</p>
                            <p>Статус: {appointment.appointment_status}</p>
                            <p>Дата и время записи: {appointment.schedule_details.date} {appointment.schedule_details.time_slot}</p>
                            <button className="close-btn" onClick={() => handleCloseRecord(appointment.id)}>Закрыть запись</button>
                        </li>
                    ))}
                </ul>
            </section>
        </div>
    );
};


export default Records;
