import { GenerateDate } from './GenerateDate'; 

const Calendar = () => {
  const dates = GenerateDate(); 

  return (
    <div className='w-96 h-96'>     
      {dates.map(({ date}, index) => { 
        return (
          <div key={index}> 
            <h1>{date.date()}</h1>
          </div>
        );
      })}
    </div>
  );
}

export default Calendar;
