import Cn from './Cn';
import { GenerateDate } from './GenerateDate';


const Calendar = () => {
    const dates = GenerateDate();
    const days = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"]

    return (
        <div className='w-96 h-96'>
            <div className='w-full grid grid-cols-7'>
                {days.map((day,index)=>{
                    return <h1 key={index}  className='h-14 grid place-content-center text-sm font-bold'>{day}</h1>
                    
                })}
            </div>
            <div className='w-full grid grid-cols-7'>
                {dates.map(({ date,currentMonth,today }, index) => {
                    return (
                        <div key={index} className='h-14 border-t-2 grid place-content-center text-sm'>
                            <h1 className={Cn(currentMonth?"":"text-gray-400")}>{date.date()}</h1>
                        </div>
                    );
                })}
            </div>

        </div>

    );
}

export default Calendar;
