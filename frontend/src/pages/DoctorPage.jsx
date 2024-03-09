import "../styles/DoctorPage.css"
import React from "react";
import DoctorScheduleChart from "../components/Schedle/ScheduleChart";
const DoctorPage = () => {
    const scheduleData = [
        { day: "Monday", hours: 1 },
        { day: "Tuesday", hours: 1 },
        { day: "Wednesday", hours: 1 },
        { day: "Thursday", hours: 1 },
        { day: "Friday", hours: 1 },
        { day: "Saturday", hours: 1 }
    ];
    return (

        <div>
            <header>
                <h1>Страница врача</h1>
            </header>
            <main>
                <section className="doctor-info">
                    <img src="doctor.jpg" alt="Фото врача" />
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
                <section className="records">
                    <h3>Записи на прием</h3>
                    <ul>
                        <li>
                            <p>10:00</p>
                            <p>Иванов Иван Иванович</p>
                            <p>+7 (900) 123-45-67</p>
                            <p className="status open">Открыта</p>
                            <button className="close-btn">Закрыть запись</button>
                        </li>
                        <li>
                            <p>11:00</p>
                            <p>Петрова Мария Сергеевна</p>
                            <p>+7 (910) 234-56-78</p>
                            <p className="status open">Открыта</p>
                            <button className="close-btn">Закрыть запись</button>
                        </li>
                        <li>
                            <p>12:00</p>
                            <p>Сидоров Алексей Петрович</p>
                            <p>+7 (920) 345-67-89</p>
                            <p className="status closed">Закрыта</p>
                        </li>
                    </ul>
                </section>
            </main>
        </div>
    );
}

export default DoctorPage;