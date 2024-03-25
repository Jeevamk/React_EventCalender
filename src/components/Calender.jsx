import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { GenerateDate, months } from './GenerateDate';
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import { BiAddToQueue } from "react-icons/bi";
import cn from './cn';
import EventForm from './EventForm';
import { MdOutlineDelete } from "react-icons/md";


const Calendar = () => {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    const currentDate = dayjs();
    const [today, setToday] = useState(currentDate);
    const [selectDate, setSelectDate] = useState(currentDate);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [events, setEvents] = useState([])

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleSubmit = (formData) => {
        const updatedEvents = [...events, formData]
        localStorage.setItem('events', JSON.stringify(updatedEvents))
        setEvents(updatedEvents)

        console.log("Submitted Event Data:", formData);
        closeModal();
    };

    const handleDeleteEvent = (index) => {
        const updatedEvents = [...events];
        updatedEvents.splice(index, 1);
        localStorage.setItem('events', JSON.stringify(updatedEvents));
        setEvents(updatedEvents);
    };


    useEffect(() => {
        const storedEvents = JSON.parse(localStorage.getItem('events')) || [];
        setEvents(storedEvents)
    }, [])

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-6">
            <div className="w-full max-w-screen-lg bg-white rounded-lg shadow-lg">
                <div className="flex justify-between items-center px-6 py-4">
                    <h1 className="text-lg font-semibold">{months[today.month()]}, {today.year()}</h1>
                    <div className="flex items-center space-x-4">
                        <GrFormPrevious
                            className="w-6 h-6 cursor-pointer hover:scale-105 transition-all"
                            onClick={() => {
                                setToday(today.month(today.month() - 1));
                            }}
                        />
                        <h1
                            className="cursor-pointer hover:scale-105 transition-all"
                            onClick={() => {
                                setToday(currentDate);
                            }}
                        >
                            Today
                        </h1>
                        <GrFormNext
                            className="w-6 h-6 cursor-pointer hover:scale-105 transition-all"
                            onClick={() => {
                                setToday(today.month(today.month() + 1));
                            }}
                        />
                        <button onClick={() => openModal()} className='text-2xl'><BiAddToQueue /></button>
                    </div>
                </div>
                <div className="grid grid-cols-7 bg-gray-100">
                    {days.map((day, index) => (
                        <h1 key={index} className="py-2 text-center text-sm font-semibold">{day}</h1>
                    ))}
                </div>
                <div className="grid grid-cols-7 gap-1">
                    {GenerateDate(today.month(), today.year()).map(({ date, currentMonth, today }, index) => (
                        <div key={index} className="flex justify-center items-center h-16 border border-gray-200">
                            <h1
                                className={cn(
                                    currentMonth ? "" : "text-gray-400",
                                    today ? "bg-red-500 text-white h-10 w-10" : "",
                                    selectDate.toDate().toDateString() === date.toDate().toDateString()
                                        ? "bg-black text-white h-10 w-10"
                                        : "", "h-10 w-10  grid place-content-center hover:bg-black hover:text-white transition-all cursor-pointer select-none"
                                )}
                                onClick={() => {
                                    setSelectDate(date);
                                }}
                            >
                                {date.date()}
                            </h1>
                        </div>
                    ))}
                </div>

            </div>


            {events.filter(event => event.eventDate === selectDate.format("YYYY-MM-DD")).length > 0 && (
                <div className="mt-4 w-96">
                    <h2 className="text-lg font-semibold mb-2 text-center">Events for {selectDate.format("YYYY-MM-DD")}</h2>
                    {events.filter(event => event.eventDate === selectDate.format("YYYY-MM-DD")).map((event, index) => (
                        <div key={index} className="border shadow-md p-4 mb-2 flex justify-between items-center">
                            <div>
                                <strong className="font-semibold block">{event.eventName}</strong>
                                <span className="text-gray-500">Time: {event.startTime} - {event.endTime}</span>
                            </div>
                            <div>
                                
                                <button onClick={() => handleDeleteEvent(index)} className="text-red-600 hover:text-red-700 text-2xl">
                                    <MdOutlineDelete />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}





            {isModalOpen && (
                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50">
                    <div className="bg-white p-8 rounded shadow-lg">
                        <h1 className="font-semibold mb-4 text-slate-900">
                            Schedule for {selectDate.format("YYYY-MM-DD")}
                        </h1>
                        <EventForm onSubmit={handleSubmit} onCancel={closeModal} selectedDate={selectDate} />
                    </div>
                </div>
            )}


        </div>


    );
}

export default Calendar;




