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
            const doctorsResponse = await axios.get(`http://0.0.0.0:8080/api/v1/profiles/`, {
                headers: {
                    'Authorization': `Token ${localStorage.getItem('token')}`
                }
            });

            const doctorsOnly = doctorsResponse.data.filter(profile => profile.role === 'doctor');
            setDoctors(doctorsOnly);
            //console.log("doctors = " + JSON.stringify(doctorsOnly));

            const userDataArray = doctorsResponse.data.map(async (doctor) => {
                //console.log('userId from doctor' + doctor.user);
                try {
                    const userResponse = await axios.get(`http://0.0.0.0:8080/api/v1/auth/users/${doctor.user}`, {
                        headers: {
                            'Authorization': `Token ${localStorage.getItem('token')}`
                        }
                    });
                    //console.log('user from doctor' + userResponse.data);

                    return userResponse.data;
                } catch (error) {
                    console.error('Error fetching user data:', error);
                    return null;
                }
            });

            const userData = await Promise.all(userDataArray);
            setUsers(userData);


            const dataArray = doctorsResponse.data.map(async (doctor) => {
                try {
                    const datesResponse = await axios.get(`http://0.0.0.0:8080/api/v1/schedules/${doctor.id}`, {
                        headers: {
                            'Authorization': `Token ${localStorage.getItem('token')}`
                        }});

                    return datesResponse.data;
                } catch (error) {
                    console.error('Error fetching user data:', error);
                    return null;
                }
            });

            const dateData = await Promise.all(dataArray);
            setDates(dateData);

        } catch (error) {
            console.error('Error fetching doctors:', error);
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
            setIsLoading(false);
            setSelectedService(services[0].id)

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
        setSelectedDoctor(doctorId);
        setSelectedDate(''); // Сброс выбранной даты
        setSelectedTime(''); // Добавляем сброс выбранного времени
        if (doctorId) {
            await fetchDates(doctorId);
        }
    };

    const handleDateChange = (date) => {
        console.log("Selected date = "+date)
        setSelectedDate(date);
        setSelectedTime(''); // Reset selected time when a new date is chosen
    };

    const handleSelectService = (url, services) => {
        if (url !== null) {
            const selectedId = url.split('=')[1];
            if (selectedId != null) {
                const selectedIdString = selectedId.toString();
                var select = services.find(service => service.id.toString() === selectedIdString);
                setSelectedService(select);
                return select;
            }
        } else {
            setSelectedService(services[0]);
            console.log("setSelectedService = " + services[0]);
            return services[0]; // Выбрать первую услугу по умолчанию, если URL пуст
        }
    };

    const printFullName = (doctorId, doctorUserId) => {
        //console.log(doctorId, doctorUserId);
        const cpesialist = doctors.find(doctor => doctor.id === doctorId);
        //console.log(cpesialist);

        try {
            const  user = users.find(user => user.id === doctorUserId);
            //console.log('user data ====== ' + user);
            return user.username + ' ' + cpesialist.user_patronymic;
        } catch (error) {
            console.error('Error fetching user data:', error);
            return '';
        }
    };

    const printDates = (doctorId) => {
        try {
            const date =  dates.find(date => date.doctor === doctorId);
            return  date.date;
        } catch (error) {
            console.error('Error fetching user data:', error);
            return '';
        }
    };
    const printTimes = (doctorId) => {
        //console.log('doctor id = ' + doctorId.split(" ")[1]);
        try {
            const doctor = doctors.find(doctor => doctor.user_patronymic === doctorId.split(" ")[1])
            const time = dates.find(date => date.doctor === doctor.id);
            return time ? time.time_slot : '';
        } catch (error) {
            console.error('Error fetching time data:', error);
            return '';
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = {
            service: selectedService,
            doctor: selectedDoctor,
            date: selectedDate,
            time: selectedTime
        };

        try {
            console.log(data);
            const response = await axios.post('http://your-api-endpoint', data, {
                headers: {
                    'Authorization': `Token ${localStorage.getItem('token')}`
                }
            });

            //console.log('Данные успешно отправлены на сервер:', response.data);

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
                            value={printFullName(doctor.id, doctor.user).id}>{printFullName(doctor.id, doctor.user)}</option>
                ))}
            </select><br/>
            <label htmlFor="select2">Выберите дату приемa:</label><br/>
            <select id="select2" value={selectedDate} onChange={(e) => handleDateChange(e.target.value)}>
                <option value=""></option>
                {doctors.map(doctor => (
                    <option key={doctor.id} value={doctor.id}>{printDates(doctor.id)}</option>
                ))}
            </select>><br/>
            <label htmlFor="select3">Выберите время приема:</label><br/>
            <select id="select3" value={selectedTime} onChange={(e) => setSelectedTime(e.target.value)}>
                <option value=""></option>
                <option value={printTimes(selectedDoctor)}>{printTimes(selectedDoctor)}</option>
            </select><br/><br/>
            <form onSubmit={handleSubmit} id="make_opp" className="form_button">
                <input type="submit" value="Создать запись"/>
            </form>
        </div>
    );
};

export default Appointment;