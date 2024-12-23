import React, { useState, useEffect } from 'react';
import moment from 'moment';
import './Calendar.css'; // Import custom styles
import EventModal from './EventModal';
const getEventColor = (eventType) => {
    switch (eventType) {
        case 'work':
            return '#4285f4';  // Blue for work
        case 'personal':
            return '#34a853';  // Green for personal
        case 'others':
            return '#fbbc05';  // Yellow for others
        default:
            return '#ccc';     // Default color
    }
};

const Calendar = () => {
    const [currentDate, setCurrentDate] = useState(moment());
    const [events, setEvents] = useState(JSON.parse(localStorage.getItem('events')) || []);
    const [selectedDay, setSelectedDay] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);

    const startOfMonth = currentDate.clone().startOf('month');
    const endOfMonth = currentDate.clone().endOf('month');
    const startOfWeek = startOfMonth.clone().startOf('week');
    const endOfWeek = endOfMonth.clone().endOf('week');

    useEffect(() => {
        // Save events to localStorage whenever they change
        localStorage.setItem('events', JSON.stringify(events));
    }, [events]);

    const handleDayClick = (day) => {
        setSelectedDay(day);
        setSelectedEvent(null); // Clear selected event for new event creation
        setShowModal(true);
    };

    const handleEventClick = (event) => {
        setSelectedEvent(event);
        setShowModal(true);
    };

    const generateCalendarGrid = () => {
        const days = [];
        let day = startOfWeek.clone();
        while (day.isBefore(endOfWeek, 'day')) {
            days.push(day.clone());
            day.add(1, 'day');
        }

        days.push(day);
        return days;
    };

    const getEventsForDay = (day) => {
        return events.filter((event) => moment(event.day).isSame(day, 'day'));
    };

    const isToday = (day) => {
        return day.isSame(moment(), 'day');
    };

    return (
        <div className="calendar-container">
            <header className="calendar-header">
                <h2>{currentDate.format('MMMM YYYY')}</h2>
                <div className="calendar-navigation">
                    <button onClick={() => setCurrentDate(currentDate.clone().subtract(1, 'month'))}>
                        Prev
                    </button>
                    <button onClick={() => setCurrentDate(currentDate.clone().add(1, 'month'))}>
                        Next
                    </button>
                </div>
            </header>

            {/* Weekday Labels */}
            <div className="calendar-weekdays">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((weekday) => (
                    <div key={weekday} className="weekday">
                        {weekday}
                    </div>
                ))}
            </div>

            {/* Calendar Grid */}
            <div className="calendar-grid">
                {generateCalendarGrid().map((day, index) => {
                    const isCurrentMonth = day.month() === currentDate.month();
                    const dayEvents = getEventsForDay(day);

                    return (
                        <div
                            key={index}
                            className={`calendar-cell ${
                                isCurrentMonth ? 'current-month' : 'other-month'
                            } ${isToday(day) ? 'today' : ''}`}
                            onClick={() => handleDayClick(day)}
                        >
                            <div className="day-number">{day.date()}</div>
                            {dayEvents.map((event, idx) => (
                                <div
                                    key={idx}
                                    className="event"
                                    onClick={(e) => { e.stopPropagation(); handleEventClick(event); }}
                                    style={{
                                        backgroundColor: getEventColor(event.type),
                                        color: 'white',
                                        padding: '4px 8px',
                                        borderRadius: '4px',
                                        marginTop: '4px'
                                    }}
                                >
                                    {event.name}
                                </div>
                            ))}
                        </div>
                    );
                })}
            </div>

            {/* Event Modal */}
            {showModal && (
                <EventModal
                    day={selectedDay}
                    setShowModal={setShowModal}
                    setEvents={setEvents}
                    events={events}
                    onAddEvent={(eventData) => setEvents([...events, eventData])}
                    onUpdateEvent={(updatedEvent) => {
                        const updatedEvents = events.map((event) =>
                            event.id === updatedEvent.id ? updatedEvent : event
                        );
                        setEvents(updatedEvents);
                    }}
                    onDeleteEvent={(eventId) => {
                        const updatedEvents = events.filter((event) => event.id !== eventId);
                        setEvents(updatedEvents);
                    }}
                    selectedEvent={selectedEvent}
                    setSelectedEvent={setSelectedEvent}
                />
            )}
        </div>
    );
};

export default Calendar;
