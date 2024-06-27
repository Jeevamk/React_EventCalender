import React, { useEffect, useState } from 'react';

// eslint-disable-next-line react/prop-types
const EventForm = ({ onSubmit, onCancel,selectedDate }) => {
    const [eventName, setEventName] = useState('');
    const [eventDate, setEventDate] = useState(selectedDate.format("YYYY-MM-DD"));
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');

    const handleEventNameChange = (e) => {
        setEventName(e.target.value);
    };

    const handleEventDateChange = (e) => {
        setEventDate(e.target.value);
    };

    const handleStartTimeChange = (e) => {
        setStartTime(e.target.value);
    };

    const handleEndTimeChange = (e) => {
        setEndTime(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({
            eventName,
            eventDate,
            startTime,
            endTime
        });
    };

    useEffect(() => {
        // eslint-disable-next-line react/prop-types
        setEventDate(selectedDate.format("YYYY-MM-DD"));
    }, [selectedDate]);

    return (
        <div className='w-72 shadow-md'>
        <form onSubmit={handleSubmit}>
            <div className="mb-4">
                <label htmlFor="eventName" className="block text-sm font-medium text-gray-700">Event Name</label>
                <input type="text" id="eventName" value={eventName} onChange={handleEventNameChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full" required />
            </div>
            <div className="mb-4">
                <label htmlFor="eventDate" className="block text-sm font-medium text-gray-700">Event Date</label>
                <input type="date" id="eventDate" value={eventDate} onChange={handleEventDateChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                    <label htmlFor="startTime" className="block text-sm font-medium text-gray-700">Start Time</label>
                    <input type="time" id="startTime" value={startTime} onChange={handleStartTimeChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full" required />
                </div>
                <div>
                    <label htmlFor="endTime" className="block text-sm font-medium text-gray-700">End Time</label>
                    <input type="time" id="endTime" value={endTime} onChange={handleEndTimeChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full" required />
                </div>
            </div>
            <button type="submit" className="bg-black text-white px-4 py-2 rounded-md hover:bg-black">Save Event</button>
            <button type="button" onClick={onCancel} className="ml-2 bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400">Cancel</button>
        </form>
        </div>
    );
}


export default EventForm;
