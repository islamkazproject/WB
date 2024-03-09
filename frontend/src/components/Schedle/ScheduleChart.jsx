import React, {useEffect, useState} from "react";
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
const DoctorScheduleChart = () => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        // Fetch your events data here
        // Replace this with your actual data fetching logic
        const eventsData = [
            {
                title: 'Lunch',
                start: '2023-11-16T11:00:00',
                end: '2023-11-16T13:00:00',
            },
            {
                title: 'Lunch',
                start: '2023-11-16T14:00:00',
                end: '2023-11-16T15:00:00',
            },
        ];

        setEvents(eventsData);
    }, []);

    return (
        <div>
            <h1>My Schedule</h1>
            <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                events={events}
                initialView="dayGridMonth"
            />
        </div>
    );
};
export default DoctorScheduleChart;