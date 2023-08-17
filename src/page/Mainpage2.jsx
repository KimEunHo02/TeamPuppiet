import React, { useState, useEffect } from 'react'
import Login from '../pages/Login'
import Logo from './Logo'

import door from '../main2Image/door.png'
import kongsoon from '../main2Image/kongsoon2.png'
import feedicon from '../main2Image/feedicon.png'
import exerciseicon from '../main2Image/exerciseicon.png'

import { Link, useNavigate } from 'react-router-dom';

import { getDocs, collection, where,getDoc, query } from 'firebase/firestore';
import { initializeApp } from 'firebase/app'; // initializeApp 임포트 추가
import { db } from '../config/firebase'; // 파이어베이스 설정 파일 임포트
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firebase";
import { differenceInDays, parse } from 'date-fns'; // date-fns 라이브러리 사용



const Mainpage2 = ({ mainArr }) => {

  const nav = useNavigate()

  // 사료 이미지 불러오기
  const [feedData, setFeedData] = useState([]);
  const [randomFeedImages, setRandomFeedImages] = useState([]);

  useEffect(() => {
    fetch(`${process.env.PUBLIC_URL}/건식사료-성분.json`)
      .then((response) => response.json())
      .then((data) => {
        setFeedData(data);
      })
      .catch((error) => {
        console.error("사료 데이터 가져오기 오류:", error);
      });
  }, []);

  useEffect(() => {
    // 랜덤 사료 이미지 설정
    const newRandomFeedImages = Array.from({ length: 3 }, (_, index) => {
      const randomIndex = Math.floor(Math.random() * feedData.length);
      const selectedFeed = feedData[randomIndex];
      return selectedFeed;
    });
    setRandomFeedImages(newRandomFeedImages);

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [feedData]); // feedData 변경 시에만 실행


  // 간식 이미지 불러오기
  const [snacksData, setSnacksData] = useState([]);
  const [randomSnackImages, setRandomSnackImages] = useState([]);


  useEffect(() => {
    fetch(`${process.env.PUBLIC_URL}/recipebom.json`)
      .then((response) => response.json())
      .then((data) => {
        setSnacksData(data);
      })
      .catch((error) => {
        console.error("간식 데이터 가져오기 오류:", error);
      });
  }, []);

  useEffect(() => {
    // 랜덤 간식 이미지 설정
    const newRandomSnackImages = Array.from({ length: 3 }, (_, index) => {
      const randomIndex = Math.floor(Math.random() * snacksData.length);
      const selectedSnack = snacksData[randomIndex];
      return selectedSnack;
    });
    setRandomSnackImages(newRandomSnackImages);

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [snacksData]); // snacksData 변경 시에만 실행



  //let sessionData = sessionStorage.getItem('userId')

  // console.log('session :', sessionData)

  // 스크롤 위치 상태 추가
  const [scrollY, setScrollY] = useState(0)

  const handleScroll = () => {
    setScrollY(window.scrollY)
  }

  const getRandomSnackImage = () => {
    if (snacksData.length > 0) {
      const randomIndex = Math.floor(Math.random() * snacksData.length);
      const selectedSnack = snacksData[randomIndex];
      return (
        <div className='foodbox' key={randomIndex}>
          <div style={imgbox} className='mainboxcontent'>
            {selectedSnack && (
              <img
                src={`${process.env.PUBLIC_URL}/간식2/image (${selectedSnack.Column1}).png`}
                alt='간식 이미지'
                style={imageStyle}
              />
            )}
            <a className='foodtext'>{selectedSnack && selectedSnack.레시피명}</a>
          </div>
        </div>
      );
    } else {
      return null;
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const Box = {
    width: '1200px',
    height: '150px',
    backgroundColor: 'white',
    marginTop: '20px'
  }

  const imgbox = {
    width: '200px',
    height: '200px',
    marginTop: '-100px'
  }

  const imgbox2 = {
    width: '200px',
    height: '200px',
    marginTop: '-20px'
  }

  const textstyle = {
    fontWeight: 'bold',
    fontSize: '23px',
  }

  const kongsoonStyle = {
    width: '650PX',
    height: 'auto',
    position: 'absolute',
    marginRight: '420px',
    marginTop: scrollY > 100 ? '250px' : '300px',
    right: scrollY > 100 ? '50px' : '190px',
    zIndex: 1,
    transition: 'margin-top 0.3s ease-in-out, right 0.3s ease-in-out' //부드러운 변화를 위한 트랜지션
  }

  const overlayStyle = {
    posiiton: 'absolute',
    top: '0',
    left: '0',
    marginLeft: '-1000px',
    // margintop:'-700px',
    width: '200px',
    height: '700px',
    backgroundColor: '#FAE9BF',
    zIndex: 3
  }


  const imageStyle = {
    width: '100%',
    height: 'auto',
    maxHeight: '100%',
  };


  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    const currentUser = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
  }, []);

  const [dogName, setDogName, ] = useState('');
  const [dogKind, setDogKind] = useState(''); // 강아지 품종
  const [dogWeight, setDogWeight] = useState(); // 강아지 체중
  const [averageWeight, setAverageWeight] = useState(); // 평균 체중
  const [weightBeforeTilde, setWeightBeforeTilde] = useState(); // 체중 첫번째 값
  const [weightAfterTilde, setWeightAfterTilde] = useState(); // 체중 두번째 값
  const [calculatedWeightDifference, setCalculatedWeightDifference] = useState(); // 초기값은 0으로 설정
  const [dogNeutered, setDogNeutered] = useState();
  const [dogGender, setDogGender] = useState();
  const [per, setPer] = useState();
  const [kcal, setKcal] = useState();
  const [recommendedFeedingTimes, setRecommendedFeedingTimes] = useState();
  const [feedingTimesMessage, setFeedingTimesMessage] = useState();
 
  useEffect(() => {
    const fetchDogNameData = async () => {
        try {
            if (currentUser && currentUser.email) { // currentUser와 email이 정의되어 있는지 확인
                console.log(currentUser.email);
                const q = query(collection(db, 'users'), where("userEmail", "==", currentUser.email))
                const querySnapshot = await getDocs(q)
                
                querySnapshot.forEach((doc) => {
                    const userData = doc.data();
                    if (userData) {
                        setDogName(userData.dogName);
                        setDogWeight(Number(userData.dogWeight));
                        setDogNeutered(userData.dogNeutered);
                        setDogGender(userData.dogGender);
                        const per = 70 * parseFloat(Number(userData.dogWeight) * 0.75); // 2kg 미만일 경우
                        setPer(per);
                        const kcal = parseFloat(30 * Number(userData.dogWeight)) + 70; // 2kg 이상일 경우
                        setKcal(kcal);
                        // dogBirthString = userData.dogBirth;
                        // 여기서 강아지 생년월일을 처리
                        const dogBirthString = userData.dogBirth;
                        const year = parseInt(dogBirthString.substr(0, 4));
                        const month = parseInt(dogBirthString.substr(4, 2)) - 1;
                        const day = parseInt(dogBirthString.substr(6, 2));
                        const birthDate = new Date(year, month, day);
                        const today = new Date();
                        const daysAfterBirth = differenceInDays(today, birthDate);
                        let recommendedFeedingTimes = 0;
                        if (daysAfterBirth < 49) { // 생후 7주 = 49일
                          recommendedFeedingTimes = 5;
                        } else if (daysAfterBirth >= 49 && daysAfterBirth <= 112) { // 생후 16주 = 112일
                          recommendedFeedingTimes = 4;
                        } else if (daysAfterBirth > 112 && daysAfterBirth <= 196) { // 생후 28주 = 196일
                          recommendedFeedingTimes = 3;
                        } else {
                          recommendedFeedingTimes = 2;
                        }
                        // 권장 사료 횟수와 메시지 설정
                        let feedingTimesMessage = "";
                        if (recommendedFeedingTimes === 5) {
                          feedingTimesMessage = "하루 5번";
                        } else if (recommendedFeedingTimes === 4) {
                          feedingTimesMessage = "하루 4번";
                        } else if (recommendedFeedingTimes === 3) {
                          feedingTimesMessage = "하루 3번";
                        } else {
                          feedingTimesMessage = "하루 2번";
                        }
                        setFeedingTimesMessage(feedingTimesMessage);

                        return; // 값을 찾았으면 더 이상 순회하지 않음
                    }
                                     
                });
            }
        } catch (error) {
            console.error('Error fetching dog name:', error);
        }

    };
    fetchDogNameData();
}, [currentUser, dogWeight]); // 효과에 필요한 종속성만 포함
  
useEffect(() => {
  // 파이어베이스로부터 강아지 품종과 체중 정보 가져오기
  const fetchDogInfo = async () => {
      try {
          if (currentUser && currentUser.email) { // currentUser와 email이 정의되어 있는지 확인
              const q = query(collection(db, 'users'), where("userEmail", "==", currentUser.email))
              const querySnapshot = await getDocs(q)

              querySnapshot.forEach((doc) => {
                  const userData = doc.data();
                  if ('dogKind' in userData && 'dogWeight' in userData) {
                      setDogKind(userData.dogKind);
                      //setDogWeight(Number(userData.dogWeight));
                      return; // 값을 찾았으면 더 이상 순회하지 않음
                  }
              });
          }
      } catch (error) {
          console.error('Error fetching dog info:', error);
      }
  };

  // 강아지 정보 가져오기 실행
  fetchDogInfo();
}, [currentUser]); // currentUser를 종속성으로 추가


  useEffect(() => {
    // JSON 파일에서 평균 체중 정보 가져오기
    fetch(`${process.env.PUBLIC_URL}/강아지정보총합.json`)
      .then((response) => response.json())
      .then((data) => {
        console.log('Fetched dog info data:', data); // 콘솔 로그 추가
        // 품종에 해당하는 데이터 찾기
        const dogInfo = data.find((info) => info.품종 === dogKind);
        // setDogInfo(data.find((info) => info.품종 === dogKind));
        // const weight = data.find((info))
        //console.log(weight, 'check');

        if (dogInfo) {
          // 품종에 해당하는 평균 체중 값을 설정
          setAverageWeight(dogInfo['평균 체중']);
          console.log('확인', averageWeight);
          const weightValues = dogInfo.체중.split('~');
          const weightBeforeTilde = parseFloat(weightValues[0]);
          const weightAfterTilde = parseFloat(weightValues[1]);
          setWeightBeforeTilde(weightBeforeTilde); // 수정된 부분
          setWeightAfterTilde(weightAfterTilde); // 수정된 부분
          console.log('Weight Before Tilde:', weightBeforeTilde);
          console.log('Weight After Tilde:', weightAfterTilde);

          // 평균 체중과 강아지 체중의 차이 계산
          const calculatedWeightDifference  = Math.abs(dogWeight - averageWeight);
          setCalculatedWeightDifference(calculatedWeightDifference); // 상태 값으로 설정
          console.log('Weight Difference:', calculatedWeightDifference);
          console.log(dogWeight, "몸무게");
        }
      })
      .catch((error) => {
        console.error("강아지 정보 가져오기 오류:", error);
      });
  }, [dogKind, dogWeight, averageWeight, weightBeforeTilde, weightAfterTilde]); 



  
  
  return (
    <div style={{ marginBottom: '30px', backgroundColor: '#F0F0F0' }}>
      <Logo />

      {/* 다이어트 정보 표시 영역 */}
      <div style={{
        marginLeft: '350px',
        marginRight: '350px'
      }}>
        <div style={{ ...Box, height: '700px', marginTop: '0px', backgroundColor: '#FAE9BF', display: 'flex', flexDirection: 'row', alignItems: 'flex-start', position: 'relative' }} className='maingraybox'>
          {/* 이미지 영역 */}
          {/* <div style={{display:'flex', flexDirection:'column', alignItems:'flex-start'}}> */}
          <div style={{ zIndex: 1, flex: 5 }}>
            <img src={door} style={{ width: '330px', marginTop: '104px', marginLeft: '-270px' }}></img>
            <img src={kongsoon} style={kongsoonStyle}></img>
          </div>
          <div style={overlayStyle}></div>

          {/* 콘텐트 영역 */}
          <div style={{ flex: 5 }}>
            <h2 style={{ marginTop: '150px', marginLeft: '400px', fontWeight: 'bold' }}>
              우리 {dogName}는 {dogWeight < weightBeforeTilde ? "저체중" : dogWeight > weightAfterTilde ? "과체중" : "정상체중"}이에요<br />
              평균 체중까지 {calculatedWeightDifference}kg {dogWeight < weightBeforeTilde ? "증가가 필요해요" : dogWeight > weightAfterTilde ? "감량이 필요해요" : "정상체중이에요"}
            </h2>
            <div style={{ display: 'flex', alignItems: 'center', marginTop: '100px', marginLeft: '480px' }}>
              <img src={feedicon} style={{ width: '100px' }} />
              <h4 style={{ marginLeft: '10px', fontWeight: 'bold' }}>
                권장하는 일일 사료 적정량은 {parseInt((dogWeight < 2 ? per : dogWeight >= 5 ? kcal : '0') * 1000 / 630) }g이에요<br />
                하루에 {feedingTimesMessage} 나누어 주세요<br/>
                (사료 10kg 기준)
              </h4>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', marginTop: '50px', marginLeft: '580px' }}>
              <h4 style={{ fontWeight: 'bold' }}>
                권장하는 하루 소모<br />
                칼로리는 {dogWeight < 2 ? per : dogWeight >= 5 ? kcal : '0' }kcal이에요
              </h4>
              <img src={exerciseicon} style={{ width: '100px', marginLeft: '10px' }} />
            </div>

          </div>
        </div>



        {/* 사료 추천 */}
        <div style={{ ...Box, height: '1100px', marginTop: '0px' }}>
          <br />
          <br />
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin: '50px' }}>
            <a style={textstyle} className='mainboxcontent'>🍖 사료 추천 🍖</a>
            <Link to={'/feed'} className='more' onClick={() => window.scrollTo(0, 0)}>더보기 ▷ </Link>
          </div>

          <div style={{
            display: 'flex', flexDirection: 'row', justifyContent: 'center',
            margin: '60px'
          }}
            className='mainboxcontainer'>


            {/* 여기서부터 사료 이미지 들어가는 공간입니다 */}
            {randomFeedImages.map((selectedFeed, index) => (
              <div className='foodbox' key={index}>
                <div style={imgbox} className='mainboxcontent' onClick={() => { nav(`/feed`); window.scrollTo(0, 0); }}>
                  {selectedFeed && (
                    <img
                      src={`${process.env.PUBLIC_URL}/건식사진/건식${selectedFeed.Column1}.jpg`}
                      alt='사료 이미지'
                      style={imageStyle}
                    />
                  )}
                  <a className='foodtext'>{selectedFeed && selectedFeed.Column2}</a>
                </div>
              </div>
            ))}


          </div>
          {/* 흰색 공간 div 끝 */}


          {/* 간식 레시피 추천 */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin: '50px' }}>
            <a style={textstyle} className='mainboxcontent'>🦴 간식 레시피 🦴</a>
            <Link to={'/recipe'} className='more' onClick={() => window.scrollTo(0, 0)}>더보기 ▷ </Link>
          </div>

          <div style={{
            display: 'flex', flexDirection: 'row', justifyContent: 'center',
            margin: '60px'
          }}
            className='mainboxcontainer'>


            {/* 여기서부터 간식 이미지 들어가는 공간입니다 */}



            {randomSnackImages.map((selectedSnack, index) => (
              <div className='foodbox' key={index}>
                <div style={imgbox2} className='mainboxcontent' onClick={() => { nav(`/recipe`); window.scrollTo(0, 0); }}>
                  {selectedSnack && (
                    <img
                      src={`${process.env.PUBLIC_URL}/간식2/image (${selectedSnack.Column1}).png`}
                      alt='간식 이미지'
                      style={imageStyle}
                    />
                  )}
                  <a className='foodtext'>{selectedSnack && selectedSnack.레시피명}</a>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </div>
  )
}

export default Mainpage2