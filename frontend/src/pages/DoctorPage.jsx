import "../styles/DoctorPage.css"
import React from "react";
import DoctorScheduleChart from "../components/Schedle/ScheduleChart";
import Records from "../components/records/Records";
const DoctorPage = () => {
    return (
        <div>
            <header>
                <h1>Страница врача</h1>
            </header>
            <main>
                <section className="doctor-info">
                    <h2>ФИО врача</h2>
                    <p>Специализация: <em>Стоматолог-терапевт</em></p>
                    <p>Должность: <em>Врач первой категории</em></p>
                    <p>Опыт работы: <em>10 лет</em></p>
                    <p>Образование: <em>Первый Московский государственный медицинский университет имени И. М. Сеченова</em></p>
                    <p>Сертификаты: <em>"Современные методы лечения кариеса", "Эндодонтия"</em></p>
                </section>
                <section className="schedule">
                    <div className="calendar">
                        <DoctorScheduleChart />
                    </div>
                </section>
                <Records/>
            </main>
        </div>
    );
}

export default DoctorPage;