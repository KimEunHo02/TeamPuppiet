import React, {useEffect, useState} from 'react'
import Logo from './Logo'
import {format, addMonths, subMonths} from 'date-fns';
import {startOfMonth, endOfMonth, startOfWeek, endOfWeek} from 'date-fns';
import {isSameMonth, isSameDay, addDays, parse} from 'date-fns';
import '../calendar.css';
import CalendarAlert from './CalendarAlert';

import stamp1 from '../stamp/stamp1.png'
import stamp2 from '../stamp/stamp2.png'
import stamp3 from '../stamp/stamp3.png'
import stamp4 from '../stamp/stamp4.png'
import stamp1_1 from '../stamp/stamp1_click.png'
import stamp2_1 from '../stamp/stamp2_click.png'
import stamp3_1 from '../stamp/stamp3_click.png'
import stamp4_1 from '../stamp/stamp4_click.png'

// 파이어베이스

import { initializeApp } from 'firebase/app';
import { firebaseApp, getFirestore } from '../config/firebase';
import { firebaseConfig } from '../config/firebase';
import { updateDoc, doc, addDoc, collection } from "@firebase/firestore";
import { getDocs} from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

// 랜덤 운동 목록
const ExerciseContent = ({challengeCompleted, setChallengeCompleted, randomExerciseProp,setRandomExerciseProp, dogExercises }) => {

  const [randomExercise, setRandomExercise] = useState(randomExerciseProp); // 랜덤 운동 상태 추가

  useEffect(() => {
    if (!challengeCompleted) {
      const initialRandomExercise = dogExercises[Math.floor(Math.random() * dogExercises.length)];
      setRandomExercise(initialRandomExercise);
      setRandomExerciseProp(initialRandomExercise);
    }
  }, [challengeCompleted, setRandomExerciseProp, dogExercises]); // 챌린지 완료 시 랜덤 운동 갱신

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

  // Stamp 20개 보상
  const [showAlert, setShowAlert] = useState(false); // showAlert 상태 변수 추가

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


  // Firebase (유정)
  
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const stampsCollection = collection(db, "stamps");

// 스탬프 찍기 처리 함수
const handleStampClick = async () => {
  const auth = getAuth();
  const user = auth.currentUser; // 현재 로그인된 사용자 정보 가져오기

  if (!user) {
    // 사용자가 로그인되어 있지 않으면 처리하지 않음
    return;
  }

  if (challengeCompleted && selectedImageIndex !== -1) {
    const stampDate = format(selectedDate, 'yyyy-MM-dd'); // 날짜와 시간 형식으로 변환
    const newStamps = [...stamps];
    const stampIndex = newStamps.findIndex(
      (stamp) => isSameDay(parse(stamp.date, 'yyyy-MM-dd', new Date()), selectedDate)
    );

    // Firestore에 데이터 추가 또는 업데이트
    if (stampIndex !== -1) {
      newStamps[stampIndex].imageIndex = selectedImageIndex;
      await updateDoc(doc(db, "userstamp", user.uid, "stamps", newStamps[stampIndex].id), {
        imageIndex: selectedImageIndex,
        timestamp: new Date(), // 현재 시간 저장
      });
    } else {
      const newStampData = {
        date: stampDate,
        imageIndex: selectedImageIndex,
        timestamp: new Date(), // 현재 시간 저장
      };
      const docRef = await addDoc(collection(db, "userstamp", user.uid, "stamps"), newStampData);
      newStampData.id = docRef.id;
      newStamps.push(newStampData);
    }

    setStamps(newStamps);
    setSelectedImageIndex(-1);
    setShowAlert(true);
  }
};


return (
  <div className='stamp_area'>
    <p className='stamp_content'>스탬프를 선택해 주세요</p>
    <div>
      {/* 스탬프 목록 */}
      {stampImages.map((image, index) => (
        <img
          key={index}
          src={selectedImageIndex === index ? image.clicked : image.normal}
          className={`stamp-image ${!challengeCompleted ? 'disabled' : ''}`}
          width='120px'
          onClick={() => handleImageClick(index)}
        />
      ))}
      {showAlert && (
        // {/* showAlert 상태에 따라 CalendarAlert 컴포넌트 조건부 렌더링 */}
        <CalendarAlert onClose={() => setShowAlert(false)} />
      )}
    </div>
    
    <button
      className={`challenge_btn ${!challengeCompleted ? 'disabled' : ''}`}
      id="stamp_btn"
      disabled={!challengeCompleted || selectedImageIndex === -1}
      onClick={handleStampClick}
    >
      스탬프 찍기
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
  const [randomExercise, setRandomExercise] = useState("");

  const [user, setUser] = useState(null); // 사용자 정보를 담을 상태 변수

  const dogExercises = [
    "산책 15분하기",
    "산책 20분하기",
    "산책 30분하기",
    "공놀이 10분하기",
    "공놀이 20분하기"
  ];

  // useEffect를 사용하여 초기 랜덤 운동을 설정
  useEffect(() => {
    const initialRandomExercise = dogExercises[Math.floor(Math.random() * dogExercises.length)];
    setRandomExercise(initialRandomExercise);
  }, [])

  useEffect(() => {
    // 사용자 인증 상태가 변경될 때마다 호출됨
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        // 사용자가 로그인된 경우, Firestore에서 스탬프 데이터 불러오기
        const fetchData = async () => {
          const db = getFirestore(firebaseApp);
          const stampsCollection = collection(db, 'userstamp', user.uid, 'stamps');

          const querySnapshot = await getDocs(stampsCollection);
          const fetchedStamps = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setStamps(fetchedStamps);
        };
        fetchData();
      } else {
        setUser(null);
        setStamps([]); // 사용자가 로그아웃된 경우 스탬프 데이터 초기화
      }
    });

    return () => unsubscribe(); // cleanup 함수로 리스너 제거
  }, []);

  

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
    <div style={{backgroundColor: '#F0F0F0'}}>
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
              setChallengeCompleted={setChallengeCompleted}
              randomExerciseProp={randomExercise}
              setRandomExerciseProp={setRandomExercise}
              dogExercises={dogExercises}/>
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