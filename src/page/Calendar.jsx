import React, {useState} from 'react'
import Logo from './Logo'
import {format, addMonths, subMonths} from 'date-fns';
import {startOfMonth, endOfMonth, startOfWeek, endOfWeek} from 'date-fns';
import {isSameMonth, isSameDay, addDays, parse} from 'date-fns';
import '../calendar.css';

import stamp1 from '../stamp/stamp1.png'
import stamp2 from '../stamp/stamp2.png'
import stamp3 from '../stamp/stamp3.png'
import stamp4 from '../stamp/stamp4.png'
import stamp1_1 from '../stamp/stamp1_click.png'
import stamp2_1 from '../stamp/stamp2_click.png'
import stamp3_1 from '../stamp/stamp3_click.png'
import stamp4_1 from '../stamp/stamp4_click.png'

// 랜덤 운동 목록
const ExerciseContent = ({challengeCompleted, setChallengeCompleted}) => {
  // const[challengeCompleted, setChallengeCompleted] = useState(false);
  const dogExercises = [
    "산책 15분하기",
    "산책 20분하기",
    "산책 30분하기",
    "공놀이 10분하기",
    "공놀이 20분하기"
  ];

  const randomExercise = dogExercises[Math.floor(Math.random()*dogExercises.length)];

  const handleChallengeComplete = () =>{
    setChallengeCompleted(true);
  }

  return(
    <div className='exercise-content'>
      <p className='challenge_title'>오늘의 운동!</p>
      <p className='challenge_content'>{randomExercise} 🐶</p>
      <button 
        className={`challenge_btn ${challengeCompleted? '':'disabled'}`}
        id='exercise_btn'
        onClick={handleChallengeComplete}
        disabled={challengeCompleted}>
        챌린지 완료
      </button>
    </div>
  )

};

// Stamp선택
const Stamp = ({challengeCompleted, selectedDate,stamps, setStamps})=>{
  // 선택된 이미지를 인덱스에 저장
  const[selectedImageIndex,setSelectedImageIndex] = useState(-1);
  // const[stamps, setStamps] = useState([])

  const stampImages = [
    {normal : stamp1, clicked : stamp1_1},
    {normal : stamp2, clicked : stamp2_1},
    {normal : stamp3, clicked : stamp3_1},
    {normal : stamp4, clicked : stamp4_1}
  ]

  // 이미지 클릭 시 인덱스 변경
  const handleImageClick = (index) => {
    if(challengeCompleted){
      setSelectedImageIndex(index);
    }
  }

  const handleStampClick = () =>{
    if (selectedImageIndex !== -1){
      // const stampDate = format(selectedDate, 'yyyy-MM-dd');
      const stampDate = selectedDate.toISOString().split('T')[0];
      // console.log('stampDate:', stampDate)
      const newStamps = [...stamps];
      newStamps.push({date:stampDate, imageIndex: selectedImageIndex});
      setStamps(newStamps)
    }
  }

  return(
    <div className='stamp_area'>
      <p className='stamp_content'>스탬프를 선택해주세요</p>
      <div>
        {stampImages.map((image, index) => (
          <img
            key={index}
            src={selectedImageIndex === index ? image.clicked : image.normal}
            className='stamp-image'
            width='120px'
            onClick={()=> handleImageClick(index)}>
          </img>
        ))}
      </div>
      <button 
        className={`challenge_btn $ {!challengeCompleted ? 'disabled' : ''}`}
        id='stamp_btn'
        disabled={!challengeCompleted}
        onClick={handleStampClick}>
        스탬프찍기
      </button>
    </div>
  );
};


// 월, 년 표시 & 전월, 명월 버튼
const RenderHeader = ({currentMonth, preMonth, nextMonth}) => {
    return (
        <div className='header row'>
            <div className='col col-start'>
                <span className='cal_title'>캘린더</span>
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
const RenderCells = ({currentMonth, selectedDate, onDateClick, stamps, stampImages}) =>{
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

  const today = new Date();
  
  while (day <= endDate){
    for (let i = 0; i<7; i++){
      formattedDate = format(day, 'd');
      const cloneDay = day;
      const isStamped = 
      stamps && stamps.some(
        (stamp) =>
        isSameDay(parse(stamp.date), day) && stamp.imageIndex !== -1
        );

        const isToday = isSameDay(day, today);

        days.push(
        <div 
          className={`col cell ${
            // disabled : 현재 월에 속하지 않은 날짜
            !isSameMonth(day, monthStart)
            ? 'disabled'
            // selected : 선택된 날짜
            : isSameDay(day, selectedDate)
            ? 'selected'
            // not-valid : 현재 월과 날짜의 월이 다른 경우
            : format(currentMonth,'M') !== format(day, 'M')
            ? 'not-valid'
            // valid : 위 조건 해당 x
            : 'valid'
          }${isToday?'today':''}${isStamped ? 'stemped' : ''}`}
          key={day}
          onClick={()=> onDateClick(cloneDay)}
          >
            <span 
              className={
                format(currentMonth, 'M')!== format(day, 'M')
                ? 'text not-valid'
                : ''
                }
              >
                {formattedDate}
                {isStamped && (
                  <img
                  src={
                    stampImages[
                      stamps.find(
                        (stamp) => isSameDay(parse(stamp.date), day)
                      ).imageIndex
                    ].normal
                  }
                  className={`stamp-icon ${
                    isSameDay(today, day) ? 'today' : ''
                  }`}
                  ></img>
                )}

            </span>
          
        </div>
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
  const [challengeCompleted, setChallengeCompleted] = useState(false);
  const [stamps, setStamps] = useState([])

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
    <div>
      <Logo/>
      <div className='calender_container'>
        <div className='calendar'>
          <RenderHeader 
            currentMonth = {currentMonth}
            preMonth = {preMonth}
            nextMonth = {nextMonth}>
          </RenderHeader>
          <RenderDays/>
          <RenderCells
            currentMonth={currentMonth}
            // selectedDate={preMonth}
            // nextMonth={onDateClick}
            selectedDate={selectedDate}
            onDateClick={onDateClick}
            >

          </RenderCells>
        </div>
        <div className='exercise-container'>
          <ExerciseContent 
            challengeCompleted={challengeCompleted} 
            setChallengeCompleted={setChallengeCompleted}/>
          <Stamp 
            challengeCompleted={challengeCompleted}
            selectedDate={selectedDate}
            stamps={stamps}
            setStamps={setStamps}/>
        </div>
      </div>
    </div>
  )
}


export default Calendar