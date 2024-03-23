import React, { useState } from 'react';
import axios from 'axios';

const doctors = ['Доктор 1', 'Доктор 2', 'Доктор 3']; // Список врачей

const ScheduleForm = () => {
    const [doctorName, setDoctorName] = useState('');
    const [date, setDate] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Подготовка данных для отправки на сервер
        const formData = {
            doctorName,
            date,
            startTime,
            endTime,
        };

        try {
            // Отправка POST запроса на сервер
            const response = await axios.post('http://example.com/api/schedule', formData);

            // Обработка успешного ответа от сервера
            console.log('Расписание успешно установлен:', response.data);

            // Очистка формы после отправки данных
            setDoctorName('');
            setDate('');
            setStartTime('');
            setEndTime('');
        } catch (error) {
            // Обработка ошибки при отправке запроса
            console.error('Произошла ошибка при установке расписания:', error.message);
        }
    };

    const handleDoctorChange = (selectedDoctor) => {
        setDoctorName(selectedDoctor);
        // Здесь можно добавить логику для отправки запроса на сервер при изменении выбранного врача
    };

    const handleDateChange = (selectedDate) => {
        setDate(selectedDate);
        // Здесь можно добавить логику для отправки запроса на сервер при изменении выбранной даты
    };

    const handleStartTimeChange = (selectedStartTime) => {
        setStartTime(selectedStartTime);
        // Здесь можно добавить логику для отправки запроса на сервер при изменении выбранного времени начала
    };

    const handleEndTimeChange = (selectedEndTime) => {
        setEndTime(selectedEndTime);
        // Здесь можно добавить логику для отправки запроса на сервер при изменении выбранного времени окончания
    };

    return (
        <div style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '5px', maxWidth: '400px', margin: '0 auto' }}>
            <formo onSubmit={handleSubmit}>
                <label style={{maxWidth: '400px', margin: '0 auto'}}>
                    <h4>Имя врача:</h4>
                    <select style={{width: '100%'}} value={doctorName}
                            onChange={(e) => handleDoctorChange(e.target.value)}>
                        <option value="doctor1">Доктор 1</option>
                        <option value="doctor2">Доктор 2</option>
                        {/* Добавьте другие варианты врачей по мере необходимости */}
                    </select>
                </label><br/>

                <label>
                    <h4>Дата:</h4>
                    <select style={{width: '100%'}} value={date} onChange={(e) => handleDateChange(e.target.value)}>
                        <option value="2024-03-10">10 марта 2024</option>
                        <option value="2024-03-11">11 марта 2024</option>
                        {/* Добавьте другие доступные даты по мере необходимости */}
                    </select>
                </label><br/>

                <label>
                    <h4>Время начала:</h4>
                    <select style={{width: '100%'}} value={startTime}
                            onChange={(e) => handleStartTimeChange(e.target.value)}>
                        <option value="09:00">09:00</option>
                        <option value="10:00">10:00</option>
                        {/* Добавьте другие доступные времена начала по мере необходимости */}
                    </select>
                </label><br/>
                <button type="submit">Установить расписание</button>
            </formo>
        </div>
    );
};


export default ScheduleForm;