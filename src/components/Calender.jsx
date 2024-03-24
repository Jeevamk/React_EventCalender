// import dayjs from 'dayjs';
// import { GenerateDate, months } from './GenerateDate';
// import { useState } from 'react';
// import { GrFormNext, GrFormPrevious } from "react-icons/gr";
// import cn from './cn';



// const Calendar = () => {
//     const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

//     const currentDate = dayjs()
//     const [today, SetToday] = useState(currentDate)
//     const [selectDate, setSelectDate] = useState(currentDate);

//     return (
//         <div className="flex gap-10 sm:divide-x justify-center sm:w-1/2 mx-auto  h-screen items-center sm:flex-row flex-col">
//             <div className='w-96 h-96'>
//                 <div className='flex justify-between'>
//                     <h1 className='font-semibold'>{months[today.month()]},{today.year()}</h1>

//                     <div className="flex gap-10 items-center ">
//                         <GrFormPrevious
//                             className="w-5 h-5 cursor-pointer hover:scale-105 transition-all"
//                             onClick={() => {
//                                 SetToday(today.month(today.month() - 1));
//                             }}
//                         />
//                         <h1
//                             className=" cursor-pointer hover:scale-105 transition-all"
//                             onClick={() => {
//                                 SetToday(currentDate);
//                             }}
//                         >
//                             Today
//                         </h1>
//                         <GrFormNext
//                             className="w-5 h-5 cursor-pointer hover:scale-105 transition-all"
//                             onClick={() => {
//                                 SetToday(today.month(today.month() + 1));
//                             }}
//                         />
//                     </div>
//                 </div>

//                 <div className='w-full grid grid-cols-7'>
//                     {days.map((day, index) => {
//                         return( <h1 key={index} className='h-14 grid place-content-center text-sm font-bold'>{day}</h1> )

//                     })}
//                 </div>
//               <div className='w-full grid grid-cols-7'>
//                     {GenerateDate(today.month(),today.year()).map(({ date, currentMonth, today }, index) => {
//                         return (
//                             <div key={index} className='h-14 border-t-2 grid place-content-center text-sm'>
//                                 <h1 className={cn(
//                                     currentMonth ? "" : "text-gray-400",
//                                     today ? "bg-red-600 text-white " : "",
//                                     selectDate
//                                     .toDate()
//                                     .toDateString() ===
//                                     date.toDate().toDateString()
//                                     ? "bg-black text-white"
//                                     : "", "h-10 w-10 rounded-full grid place-content-center hover:bg-black hover:text-white transition-all cursor-pointer select-none",

//                                 )} onClick={() => {
//                                     setSelectDate(date);
//                                 }}>
//                                     {date.date()}
//                                 </h1>
//                             </div>

//                         );
//                     })}
//                 </div> 
//             </div>
//             <div className="h-96 w-96 sm:px-5">
//                 <h1 className=" font-semibold">
//                     Schedule for {selectDate.toDate().toDateString()}
//                 </h1>
//                 <p className="text-gray-400">No meetings for today.</p>
//             </div>
//         </div>

//     );
// }

// export default Calendar;


import { useState } from 'react';
import dayjs from 'dayjs';
import { GenerateDate, months } from './GenerateDate';
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import cn from './cn';
import EventForm from './EventForm';

const Calendar = () => {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    const currentDate = dayjs();
    const [today, setToday] = useState(currentDate);
    const [selectDate, setSelectDate] = useState(currentDate);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleSubmit = (formData) => {
        console.log("Submitted Event Data:", formData);
        closeModal();
    };

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
                    </div>
                </div>
                <div className="grid grid-cols-7 bg-gray-100">
                    {days.map((day, index) => (
                        <h1 key={index} className="py-2 text-center text-sm font-semibold">{day}</h1>
                    ))}
                </div>
                <div className='w-full grid grid-cols-7'>
                    {GenerateDate(today.month(), today.year()).map(({ date, currentMonth, today }, index) => {
                        return (
                            <div key={index} className='h-14 border-t-2 grid place-content-center text-sm'>
                                <h1 className={cn(
                                    currentMonth ? "" : "text-gray-400",
                                    today ? "bg-red-600 text-white h-10 w-10" : "",
                                    selectDate
                                        .toDate()
                                        .toDateString() ===
                                        date.toDate().toDateString()
                                        ? "bg-black text-white h-10 w-10"
                                        : "", "h-10 w-10  grid place-content-center hover:bg-black hover:text-white transition-all cursor-pointer select-none",

                                )} onClick={() => {
                                    setSelectDate(date);
                                }}>
                                    {date.date()}
                                </h1>
                            </div>

                        );
                    })}
                </div>

            </div>
            {isModalOpen && (
                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50">
                    <div className="bg-white p-8 rounded shadow-lg">
                        <h1 className="font-semibold mb-4">
                            Schedule for {selectDate.toDate().toDateString()}
                        </h1>
                        <EventForm onSubmit={handleSubmit} onCancel={closeModal} />
                    </div>
                </div>
            )}
        </div>
    );
}

export default Calendar;
