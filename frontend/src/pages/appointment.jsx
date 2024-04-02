// App.js
import "../styles/Appointment.css"
import React, { useState, useEffect } from 'react';
import axios from "axios";


const Appointment = () => {
    const [services, setServices] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [users, setUsers] = useState([]);
    const [dates, setDates] = useState([]);
    const [times, setTimes] = useState([]);
    const [selectedService, setSelectedService] = useState('');
    const [selectedDoctor, setSelectedDoctor] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    var url = window.location.href.split('?').slice(-1).join();


    useEffect(() => {
        fetchData();
        fetchDoctors();
    }, []);

    const fetchDoctors = async (serviceId) => {
        try {
            const doctorsResponse = await axios.get(`http://localhost:8080/api/v1/doctors/`, {
                headers: {
                    'Authorization': `Token ${localStorage.getItem('token')}`
                }
            });
            setDoctors(doctorsResponse.data);
            console.log("doctors = " + (doctorsResponse.data[0]));

            const dataArray = doctorsResponse.data.map(async (doctor) => {
                try {
                    const datesResponse = await axios.get(`http://0.0.0.0:8080/api/v1/schedules/doctors/${doctor.user}`, {
                        headers: {
                            'Authorization': `Token ${localStorage.getItem('token')}`
                        }
                    });

                    console.log("doctor id = "+ doctor.user)
                    return datesResponse.data;
                } catch (error) {
                    console.error('Error fetching user data:', error);
                    return null;
                }
            });

            console.log("dates = "+ JSON.stringify(dataArray))

            Promise.all(dataArray).then((resolvedDates) => {
                const actualDates = resolvedDates.reduce((acc, dates) => acc.concat(dates), []);
                setDates(actualDates);
            });

        } catch (error) {
            console.error('Error fetching doctors:', error);
        }
    };

    const fetchDatesToDoctor = async (doctorId) => {
        try {
            const datesResponse = await axios.get(`http://0.0.0.0:8080/api/v1/schedules/doctors/${doctorId}`, {
                headers: {
                    'Authorization': `Token ${localStorage.getItem('token')}`
                }
            });
            return datesResponse.data;
        } catch (error) {
            console.error('Error fetching user data:', error);
            return null;
        }
    };

    const fetchDates = async (doctorId) => {
        try {
            return dates.filter(date => date.doctor === doctorId);
        } catch (error) {
            console.error('Error fetching dates:', error);
        }
    };

    const fetchData = async () => {
        try {
            const servicesResponse = await axios.get('http://0.0.0.0:8080/api/v1/services/');
            setServices(servicesResponse.data);
            // setIsLoading(false);
            console.log(servicesResponse.data[0]);
            setSelectedService(servicesResponse.data[0].id); // обратитесь напрямую к servicesResponse.data

        } catch (error) {
            console.error('Error fetching services:', error);
        }
    };

    const handleServiceChange = async (serviceId) => {
        setSelectedService(serviceId);
        setSelectedDoctor('');
        setSelectedDate('');
        if (serviceId) {
            await fetchDoctors(serviceId);
        }
    };

    const handleDoctorChange = async (doctorId) => {
        console.log(doctorId)
        const username = doctorId.split(" ")[0]
        setSelectedDoctor(doctorId);
        setSelectedDate(''); // Сброс выбранной даты
        setSelectedTime(''); // Добавляем сброс выбранного времени
        if (doctorId) {
            const newDates = await fetchDatesToDoctor(doctorId); // Загрузка дат для конкретного доктора
            setDates(newDates);
        }
        console.log('dates = ' + dates[0].date);
    };

    const handleDateChange = (date) => {
        console.log("Selected date = "+date)
        console.log("Dates = "+ JSON.stringify(dates))
        debugger;
        setSelectedDate(date);
        setSelectedTime('');
        const times =  dates.filter(thisDate => thisDate.date === date);
        setTimes(times);
        console.log("setTimes = " + JSON.stringify(times))
    };

    const handleSelectService = (url, services) => {
        if (url !== null) {
            const selectedId = url.split('=')[1];
            if (selectedId != null) {
                const selectedIdString = selectedId.toString();
                var select = services.find(service => service.id.toString() === selectedIdString);
                console.log("Selected service" + select);
                setSelectedService(select);
                return select;
            }
        } else {
            setSelectedService(services[0]);
            console.log("setSelectedService = " + services[0]);
            return services[0]; // Выбрать первую услугу по умолчанию, если URL пуст
        }
    };

    const printFullName = (doctorId) => {
        try {
            const  user = doctors.find(user => user.id === doctorId);
            return user.user_details.username + ' ' + user.user_patronymic;
        } catch (error) {
            console.error('Error fetching user data:', error);
            return '';
        }
    };

    const printDates = (doctorId) => {
        try {
            const date = dates.find(date => date.id === doctorId);
            return date ? date.date : '';
        } catch (error) {
            console.error('Error fetching dates:', error);
            return '';
        }
    };

    const printTimes = (doctorId) => {
        try {
            const date = dates.find(date => date.id === doctorId);
            return date ? date.time_slot : '';
        } catch (error) {
            console.error('Error fetching time data:', error);
            return '';
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));

        const data = {
            appointment_patient: userInfo.userData.id,
            appointment_schedule: parseInt(selectedDate),
            appointment_service: selectedService,
            appointment_description: "string",
            appointment_status: "P"
        };

        try {
            console.log((data));
            const response = await axios.post('http://0.0.0.0:8080/api/v1/appointments/', data, {
                headers: {
                    'Authorization': `Token ${localStorage.getItem('token')}`
                }
            });

            console.log('Данные успешно отправлены на сервер:', response.data);

        } catch (error) {
            console.error('Ошибка при отправке данных на сервер:', error);
        }
    };

    return (
        <div className="make_form">
            <h1>Выберете услугу</h1><br/>
            <label htmlFor="select0">Выберите тип приема:</label><br/>
            <select id="select0" value={selectedService}
                    onChange={(e) => handleServiceChange(e.target.value)}>
                {services.map(service => (
                    <option key={service.id} value={service.id}>{service.service_name}</option>
                ))}
            </select><br/>

            <label htmlFor="select1">Выберите лечащего врача:</label><br/>
            <select id="select1" value={selectedDoctor} onChange={(e) => handleDoctorChange(e.target.value)}>
                <option value=""></option>
                {doctors.map(doctor => (
                    <option key={doctor.id}
                            value={doctor.user}>{printFullName(doctor.id)}</option>
                ))}
            </select><br/>
            <label htmlFor="select2">Выберите дату приемa:</label><br/>
            <select id="select2" value={selectedDate} onChange={(e) => handleDateChange(e.target.value)}>
                <option value=""></option>
                {dates.map(date => (
                    <option key={date.id} value={date.date}>{printDates(date.id)}</option>
                ))}
            </select>><br/>
            <label htmlFor="select3">Выберите время приема:</label><br/>
            <select id="select3" value={selectedTime} onChange={(e) => setSelectedTime(e.target.value)}>
                <option value=""></option>
                {times.map(date => (
                    <option key={date.id} value={date.id}>{printTimes(date.id)}</option>
                ))}
            </select><br/><br/>
            <form onSubmit={handleSubmit} id="make_opp" className="form_button">
                <input type="submit" value="Создать запись"/>
            </form>
        </div>
    );
};

export default Appointment;