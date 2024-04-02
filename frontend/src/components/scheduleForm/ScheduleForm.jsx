import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ScheduleForm = () => {
    const [selectedDoctorName, setSelectDoctorName] = useState('');
    const [doctorNames, setDoctorNames] = useState([]);
    const [selectedDate, setSelectDate] = useState(new Date());
    const [selectedStartTime, setSelectStartTime] = useState('');

    const timeSlots = ['09:00-10:00', '10:00-11:00', '11:00-12:00', '12:00-13:00', '14:00-15:00', '16:00-17:00']; // Example time slots

    useEffect(() => {
        const fetchDoctorNames = async () => {
            try {
                const doctorsResponse = await axios.get('http://localhost:8080/api/v1/doctors/', {
                    headers: {
                        Authorization: `Token ${localStorage.getItem('token')}`
                    }
                });
                setDoctorNames(doctorsResponse.data);
            } catch (error) {
                console.error('Error fetching doctors:', error);
            }
        };

        fetchDoctorNames();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(localStorage.getItem('token'));
        const formData = {
            doctor: 2,
            date: "2024-04-03",
            time_slot: "900",
            is_available: true
        };

        console.log(formData);

        try {
            const response = await axios.post('http://localhost:8080/api/v1/schedules/', formData, {
                headers: {
                    'Authorization': `Token ${localStorage.getItem('token')}`
                }
            });
            console.log('Расписание успешно установлен:', response.data);

            setSelectDoctorName('');
            setSelectDate(new Date());
            setSelectStartTime('');
        } catch (error) {
            console.error('Произошла ошибка при установке расписания:', error.message);
        }
    };

    const handleDoctorChange = async (selectedDoctor) => {
        setSelectDoctorName(selectedDoctor);
    };

    const handleDateChange = (newDate) => {
        setSelectDate(newDate);
    };

    const handleStartTimeChange = (newStartTime) => {
        setSelectStartTime(newStartTime); // Просто сохраняем выбранное время без преобразований
    };

    const timeRangeToMinutes = (timeRange) => {
        const [startTime, endTime] = timeRange.split('-');

        const convertToNumber = (timeString) => {
            const [hours, minutes] = timeString.split(':');
            return parseInt(hours);
        };

        const startTimeInMinutes = convertToNumber(startTime);

        return startTimeInMinutes * 100;
    };

    return (
        <div style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '5px', maxWidth: '400px', margin: '0 auto' }}>
            <form onSubmit={handleSubmit}>
                <label style={{maxWidth: '400px', margin: '0 auto'}}>
                    <h4>Имя врача:</h4>
                    <select
                        style={{width: '100%'}}
                        value={selectedDoctorName}
                        onChange={(e) => handleDoctorChange(e.target.value)}
                    >
                        <option value="">Выберите врача</option>
                        {doctorNames.map((doctor) => (
                            <option key={doctor.user} value={doctor.user}>
                                {doctor.user_details.username + ' ' + doctor.user_patronymic}
                            </option>
                        ))}
                    </select>
                </label><br/>

                <label>
                    <h4>Дата:</h4>
                    <input
                        type="date"
                        value={selectedDate.toISOString().substring(0, 10)}
                        onChange={(e) => handleDateChange(new Date(e.target.value))}
                    />
                </label><br/>

                <label>
                    <h4>Время начала:</h4>
                    <select
                        style={{width: '100%'}}
                        value={selectedStartTime}
                        onChange={(e) => handleStartTimeChange(e.target.value)}
                    >
                        <option value="">Выберите время</option>
                        {timeSlots.map((timeSlot) => (
                            <option key={timeSlot} value={timeSlot}>
                                {timeSlot}
                            </option>
                        ))}
                    </select>
                </label><br/>

                <button type="submit">Установить расписание</button>
            </form>
        </div>
    );
};

export default ScheduleForm;