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