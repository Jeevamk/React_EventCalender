import dayjs from "dayjs"

export const GenerateDate = (month = dayjs().month(),year = dayjs().year()) => {

    const firstDateofMonth = dayjs().year(year).month(month).startOf("month");
    const lastDateofMonth = dayjs().year(year).month(month).endOf("month");

    const arrayofDate = [];

    //create prefix date
    for (let i=0;i<firstDateofMonth.day();i++){
        arrayofDate.push(firstDateofMonth.day(i))
    }   


    //generate current date
    for (let i = firstDateofMonth.date() ; i<= lastDateofMonth.date() ; i++){
        arrayofDate.push(firstDateofMonth.date(i))
    }

    const remaining = 42-arrayofDate.length

    for (let i=lastDateofMonth.date()+1;i<= lastDateofMonth.date()+remaining;i++){
        arrayofDate.push(lastDateofMonth.date(i))
    }

  return arrayofDate

}

