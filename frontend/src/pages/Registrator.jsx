import DoctorScheduleChart from "../components/Schedle/ScheduleChart";
import Records from "../components/records/Records";
import React, {useState} from "react";
import ScheduleForm from "../components/scheduleForm/ScheduleForm";

const Registrator = () => {
    const [activeTab, setActiveTab] = useState('scheduleTab');

    const openTab = (tabName) => {
        setActiveTab(tabName);
    };

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
            <div>
                <button onClick={() => openTab('scheduleTab')}>Создать расписание</button>
                <button onClick={() => openTab('closeTab')}>Закрыть записи</button>
            </div>

            <div style={{ display: activeTab === 'scheduleTab' ? 'block' : 'none' }}>
                <h2>Создать расписание</h2>
                {<ScheduleForm/>}
            </div>

            <div style={{ display: activeTab === 'closeTab' ? 'block' : 'none' }}>
                <h2>Закрыть записи</h2>
                {<Records/>}
            </div>
        </div>
    );
}

export default Registrator;