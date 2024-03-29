import React, {useState, useEffect} from "react";
import Axios from "axios";
import ScheduleForm from "../components/scheduleForm/ScheduleForm";
import Records from "../components/records/Records";
import axios from "axios";

const Registrator = () => {
    const [activeTab, setActiveTab] = useState('scheduleTab');
    const [doctorNames, setDoctorNames] = useState([]);

    const openTab = (tabName) => {
        setActiveTab(tabName);
    };

    useEffect(() => {
        fetchDoctorNames();
    }, []);

    const fetchDoctorNames = async () => {
        try {
            const doctorsResponse = await axios.get(`http://localhost:8080/api/v1/doctors/`, {
                headers: {
                    'Authorization': `Token ${localStorage.getItem('token')}`
                }
            });
            setDoctorNames(doctorsResponse.data);
            console.log("doctors = " + (doctorsResponse.data));
            console.log(localStorage.getItem('token'));
        } catch (error) {
            console.error('Error fetching doctors:', error);
        }
    };

    return (
        <div>
            <div>
                <button onClick={() => openTab('scheduleTab')}>Создать расписание</button>
                <button onClick={() => openTab('closeTab')}>Закрыть записи</button>
            </div>

            <div style={{display: activeTab === 'scheduleTab' ? 'block' : 'none'}}>
                <h2>Создать расписание</h2>
                <ScheduleForm doctorNames={doctorNames}/>
            </div>

            <div style={{display: activeTab === 'closeTab' ? 'block' : 'none'}}>
                <h2>Закрыть записи</h2>
                {<Records/>}
            </div>
        </div>
    );
}

export default Registrator;