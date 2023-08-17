import React, { useState, useEffect } from 'react'
import Login from '../pages/Login'
import Logo from './Logo'

import door from '../main2Image/door.png'
import kongsoon from '../main2Image/kongsoon2.png'
import feedicon from '../main2Image/feedicon.png'
import exerciseicon from '../main2Image/exerciseicon.png'

import { Link, useNavigate } from 'react-router-dom';

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



  let sessionData = sessionStorage.getItem('userId')


  console.log('session :', sessionData)

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
              우리 콩순이는 과체중이에요<br />
              평균 체중까지 1.5kg 감량이 필요해요
            </h2>
            <div style={{ display: 'flex', alignItems: 'center', marginTop: '100px', marginLeft: '480px' }}>
              <img src={feedicon} style={{ width: '100px' }} />
              <h4 style={{ marginLeft: '10px', fontWeight: 'bold' }}>
                권장하는 일일 사료량은 70g이에요<br />
                하루에 두 번 나누어 주세요
              </h4>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', marginTop: '50px', marginLeft: '580px' }}>
              <h4 style={{ fontWeight: 'bold' }}>
                권장하는 하루 소모<br />
                칼로리는 500kcal이에요
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