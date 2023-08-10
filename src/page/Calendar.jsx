import React, {useEffect, useState} from 'react'
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
import calendar_explanation from '../stamp/calendar_explanation.png'

// 랜덤 운동 목록
const ExerciseContent = ({challengeCompleted, setChallengeCompleted}) => {
  const dogExercises = [
    "산책 15분하기",
    "산책 20분하기",
    "산책 30분하기",
    "공놀이 10분하기",
    "공놀이 20분하기"
  ];

  const randomExercise = dogExercises[Math.floor(Math.random()*dogExercises.length)];

  const handleChallengeComplete = () =>{
    if(!challengeCompleted){
      setChallengeCompleted(true);

    }
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
const Stamp = ({challengeCompleted, selectedDate,stamps, setStamps, setChallengeCompleted})=>{
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
      if(selectedImageIndex !== index){
      setSelectedImageIndex(index);
      }
    }
  }

  const handleStampClick = () => {
    if (challengeCompleted && selectedImageIndex !== -1) {
      const stampDate = format(selectedDate, 'yyyy-MM-dd');
      const newStamps = [...stamps];
      const stampIndex = newStamps.findIndex(
        (stamp) => isSameDay(parse(stamp.date, 'yyyy-MM-dd', new Date()), selectedDate)
      );
      if (stampIndex !== -1) {
        newStamps[stampIndex].imageIndex = selectedImageIndex;
      } else {
        newStamps.push({ date: stampDate, imageIndex: selectedImageIndex });
      }
      setStamps(newStamps);
      
    
  
      // 이미지 선택 초기화
      setSelectedImageIndex(-1);

      // 챌린지 완료 상태를 false로 변경
      // setChallengeCompleted(false);
    
    }
  };

  return(
    <div className='stamp_area'>
      <p className='stamp_content'>스탬프를 선택해주세요</p>
      <div>
        {/* 스탬프 목록 */}
        {stampImages.map((image, index) => (
          <img
            key={index}
            src={selectedImageIndex === index ? image.clicked : image.normal}
            className={`stamp-image ${!challengeCompleted ? 'disabled' : ''}`}
            width='120px'
            onClick={()=> handleImageClick(index)}>
          </img>
        ))}
      </div>
      <button
        className={`challenge_btn ${!challengeCompleted ? 'disabled' : ''}`}
        id='stamp_btn'
        disabled={!challengeCompleted || selectedImageIndex === -1}
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
                    <span className='text month'>
                        {format(currentMonth,'M')}월
                    </span>
                    <span className='text year'>
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
const RenderCells = ({ currentMonth, selectedDate, onDateClick, stamps, stampImages }) => {
  const monthStart = startOfMonth(currentMonth);
  // monthEnd : 오늘이 속한 달의 마자막일
  const monthEnd = endOfMonth(monthStart);
  // startDate : monthStart가 속한 주의 시작일
  const startDate = startOfWeek(monthStart);
  // endDate : monthEnd가 속한 주의 마지막일
  const endDate = endOfWeek(monthEnd);

  const [selectedImageIndex, setSelectedImageIndex] = useState(-1);

  const rows = [];  //[일월화수목금토] 한 주 * 4주 or 5주
  let days = [];    //[일월화수목금토] 한 주
  let day = startDate;  
  let formattedDate = '';

  const today = new Date();

  while (day <= endDate) {
    for (let i = 0; i < 7; i++) {
      formattedDate = format(day, 'd');
      const cloneDay = new Date(day);
      const isToday = isSameDay(day, today);
      const isSelected = isSameDay(day, selectedDate);

      // 현재 날짜에 스탬프가 있는지 확인
      const stampedInfo = stamps.find(
        (stamp) =>
          isSameDay(parse(stamp.date, 'yyyy-MM-dd', new Date()), day) &&
          stamp.imageIndex !== -1
      );

      days.push(
        <div
          className={`col cell
            ${!isSameMonth(day, monthStart) ? 'disabled' : ''}
            ${isSameDay(day, selectedDate) ? 'selected' : ''}
            ${format(currentMonth, 'M') !== format(day, 'M') ? 'not-valid' : ''}
            ${isSameDay(day, new Date()) ? 'today' : ''}
            ${stampedInfo ? 'stamped' : ''}`}
          key={day}
          onClick={() => onDateClick(cloneDay)}
        >
          <span
            className={
              format(currentMonth, 'M') !== format(day, 'M')
                ? 'text not-valid'
                : ''
            }
          >
            {formattedDate}
            {stampedInfo && isToday && (
              <img
                src={stampedInfo.imageIndex === selectedImageIndex ? stampImages[stampedInfo.imageIndex].clicked : stampImages[stampedInfo.imageIndex].normal}
                alt=""
                className="stamp-icon today"
              />
            )}
          </span>
        </div>
      );
      day = addDays(day, 1);
    }
    rows.push(
      <div className='row' key={day}>
        {days}
      </div>
    );
    days = [];
  }
  return <div className='body'>{rows}</div>;
};




export const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [challengeCompleted, setChallengeCompleted] = useState(false);
  const [stamps, setStamps] = useState([])

  const stampImages = [
    { normal: stamp1, clicked: stamp1_1 },
    { normal: stamp2, clicked: stamp2_1 },
    { normal: stamp3, clicked: stamp3_1 },
    { normal: stamp4, clicked: stamp4_1 }
  ];

  const preMonth = () =>{
    setCurrentMonth(subMonths(currentMonth,1));
  };

  const nextMonth = () =>{
    setCurrentMonth(addMonths(currentMonth,1));
  };

  const onDateClick =(day) =>{
    // setSelectedDate(day);
  }
  
  return (
    <div>
      <Logo/>
      <div id='area' style={{width:'1920px', height:'950px'}}>
        <div className='explanation'>
          <p style={{marginTop:'18px'}}>① 오늘의 운동은 하루에 한 번 초기화 됩니다!</p>
          <p>② 챌린지 완료 버튼을 누르면 스탬프를 선택할 수 있어요!</p>
          <p>③ 스탬프찍기 버튼을 누르면 오늘 날짜에 스탬프가 올라가요</p>
          <p>④ 스탬프를 20개 모았을 때 알려드려요! 반려견에게 수고했다는 보상을 선물해 주세요</p>
        </div>
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
              stamps={stamps}
              stampImages={stampImages}
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
              setStamps={setStamps}
              setChallengeCompleted={setChallengeCompleted}/>
          </div>
        </div>
      </div>
    </div>
  )
}


export default Calendar