import React, {useState} from 'react'
import Logo from './Logo'
import {format, addMonths, subMonths} from 'date-fns';
import {startOfMonth, endOfMonth, startOfWeek, endOfWeek} from 'date-fns';
import {isSameMonth, isSameDay, addDays, parse} from 'date-fns';

// 월, 년 표시 & 전월, 명월 버튼
const RenderHeader = ({currentMonth, preMonth, nextMonth}) => {
    return (
        <div className='header row'>
            <div className='col col-start'>
                <span className='text'>
                    <span className='text month'>
                        {format(currentMonth,'M')}월
                    </span>
                    {format(currentMonth, 'yyyy')}                    
                </span>
            </div>
            <div className='col col-end'>
              <button onClick={preMonth}>{"<"}</button>
              <button onClick={nextMonth}>{">"}</button>
            </div>

        </div>
    )
}

// 요일 표시
const RenderDays = () => {
  const days = [];
  const date = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  for (let i=0; i<7; i++){
    days.push(
      <div className='col' key={i}>
        {date[i]}
      </div>,
    )
  }
  return <div className='days row'>{days}</div>;
}

// 달력 그리기
const RenderCells = ({currentMonth, selectedDate, onDateClick}) =>{
  // monthStart : 오늘이 속한 달의 시작일
  const monthStart = startOfMonth(currentMonth);
  // monthEnd : 오늘이 속한 달의 마자막일
  const monthEnd = endOfMonth(monthStart);
  // startDate : monthStart가 속한 주의 시작일
  const startDate = startOfWeek(monthStart);
  // endDate : monthEnd가 속한 주의 마지막일
  const endDate = endOfWeek(monthEnd);

  const rows = [];  //[일월화수목금토] 한 주 * 4주 or 5주
  let days = [];    //[일월화수목금토] 한 주
  let day = startDate;  
  let formattedDate = '';

  while (day <= endDate){
    for (let i = 0; i<7; i++){
      formattedDate = format(day, 'd');
      const cloneDay = day;
      days.push(
        <div 
          className={`col cell ${
            !isSameMonth(day, monthStart)
            ? 'disabled'
            : isSameDay(day, selectedDate)
            ? 'selected'
            : format(currentMonth,'M') !== format(day, 'M')
            ? 'not-valid'
            : 'valid'
          }`}
          key={day}
          onClick={()=> onDateClick(parse(cloneDay))}
          >
            <span 
              className={
                format(currentMonth, 'M')!== format(day, 'M')
                ? 'text not-valid'
                : ''
                }
              >
                {formattedDate}

            </span>
          
        </div>,
      );
      day = addDays(day, 1);
    }
    rows.push(
      <div className='row' key={day}>
        {days}
      </div>,
    );
    days = [];
  }
  return <div className='body'>{rows}</div>
}

export const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  const preMonth = () =>{
    setCurrentMonth(subMonths(currentMonth,1));
  };

  const nextMonth = () =>{
    setCurrentMonth(addMonths(currentMonth,1));
  };

  const onDateClick =(day) =>{
    setSelectedDate(day);
  }
  
  return (
    <div><Logo/>

      <div className='calendar'>
        <RenderHeader 
          currentMonth = {currentMonth}
          preMonth = {preMonth}
          nextMonth = {nextMonth}>
        </RenderHeader>
        <RenderDays/>
        <RenderCells
          currentMonth={currentMonth}
          selectedDate={preMonth}
          nextMonth={onDateClick}>

        </RenderCells>
      </div>
    </div>
  )
}


export default Calendar