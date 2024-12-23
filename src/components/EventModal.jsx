import React, { useState, useEffect } from 'react';
import Alert from '@mui/material/Alert';

const EventModal = ({ day, setShowModal, setEvents, events, onAddEvent, onUpdateEvent, onDeleteEvent, selectedEvent, setSelectedEvent }) => {
    const [name, setName] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [description, setDescription] = useState('');
    const [eventType, setEventType] = useState('work');  // Default to 'work'

    const [alert,setAlert ] = useState('');

    useEffect(() => {
        if (selectedEvent) {
            setName(selectedEvent.name);
            setStartTime(selectedEvent.startTime);
            setEndTime(selectedEvent.endTime);
            setDescription(selectedEvent.description);
            setEventType(selectedEvent.type); // Set event type for editing
        }
    }, [selectedEvent]);

    const handleSave = () => {
        if(name.length==0 || startTime.length==0 || endTime.length==0){
            setAlert('Please fill all the required fields');
            return;
        }

        if(startTime>endTime){
            setAlert('Please enter a valid time interval');
            return;
        }

        const newEvent = {
            id: selectedEvent ? selectedEvent.id : Date.now(),
            name,
            startTime,
            endTime,
            description,
            type: eventType,  // Include the event type
            day: day.format('YYYY-MM-DD')
        };

        if (selectedEvent) {
            // Update existing event
            onUpdateEvent(newEvent);
        } else {
            // Add new event
            onAddEvent(newEvent);
        }
        setShowModal(false);
    };

    const handleDelete = () => {
        onDeleteEvent(selectedEvent.id);
        setShowModal(false);
    };

    return (
        <div className="event-modal">
            
            <div className="event-modal-content">
            
                <h3>{selectedEvent ? 'Edit Event' : 'Add Event'}</h3>
                {alert.length!=0 && <Alert severity="error">{alert}</Alert>}
                <br />
                <div>
                    <label>Event Name</label>
                    <input required={true} type="text" value={name} onChange={(e) => {setAlert(''); setName(e.target.value)}} />
                </div>
                <div>
                    <label>Start Time</label>
                    <input required={true} type="time" value={startTime} onChange={(e) =>  {setAlert('');setStartTime(e.target.value)}} />
                </div>
                <div>
                    <label>End Time</label>
                    <input required={true} type="time" value={endTime} onChange={(e) => {setAlert('');setEndTime(e.target.value)}} />
                </div>
                <div>
                    <label>Description (optional)</label>
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
                </div>
                <div>
                    <label>Event Type</label>
                    <select value={eventType} onChange={(e) => setEventType(e.target.value)}>
                        <option value="work">Work</option>
                        <option value="personal">Personal</option>
                        <option value="others">Others</option>
                    </select>
                </div>
                <div className="modal-actions">
                    <button onClick={() => setShowModal(false)}>Cancel</button>
                    <button onClick={handleSave}>Save</button>
                    {selectedEvent && (
                        <button onClick={handleDelete}>Delete</button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default EventModal;
