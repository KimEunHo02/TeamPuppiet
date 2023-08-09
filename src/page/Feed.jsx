import React, { useState } from 'react';
import Logo from './Logo';
import Button from 'react-bootstrap/Button';

import { BrowserRouter, Route, Link, Routes } from 'react-router-dom';
import ImageDetailFeed from './ImageDetailFeed';

const Feed = () => {

  // 이미지 상세 페이지 라우팅을 생성하는 함수
  const generateRoutes = () => {
    const dummyFeeds = Array.from({ length: 237 }, (_, index) => index + 1);

    return (
      <Routes>
        {dummyFeeds.map((feedId) => (
          <Route
            key={feedId}
            path={`/ImageDetailFeed/:feedId`}
            element={<ImageDetailFeed />}
          />
        ))}
      </Routes>
    );
  }

  // ------------------------------------ 사료별 선택 박스 --------------------------------------
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedNutrients, setSelectedNutrients] = useState([]);
  const [isResetActive, setIsResetActive] = useState(false); // 초기화 버튼 활성화 상태 관리
  const [isSearchActive, setIsSearchActive] = useState(false); // 검색하기 버튼 활성화 상태 관리

  const categories = ['소형견', '중형견', '대형견'];
  const types = ['건식', '습식'];
  const nutrients = ['조단백', '조지방', '조섬유', '조회분', '칼슘', '인', '수분'];

  // 카테고리 선택 핸들러
  const handleCategoryClick = (category) => {
    setSelectedCategories((prevSelectedCategories) => {
      if (prevSelectedCategories.includes(category)) {
        return prevSelectedCategories.filter((c) => c !== category);
      } else {
        return [...prevSelectedCategories, category];
      }
    });
  };

  // 유형 선택 핸들러
  const handleTypeClick = (type) => {
    setSelectedTypes((prevSelectedTypes) => {
      if (prevSelectedTypes.includes(type)) {
        return prevSelectedTypes.filter((t) => t !== type);
      } else {
        return [...prevSelectedTypes, type];
      }
    });
  };

  // 영양소 선택 핸들러
  const handleNutrientClick = (nutrient) => {
    setSelectedNutrients((prevSelectedNutrients) => {
      if (prevSelectedNutrients.includes(nutrient)) {
        return prevSelectedNutrients.filter((n) => n !== nutrient);
      } else {
        return [...prevSelectedNutrients, nutrient];
      }
    });
  };

  // 초기화 버튼 클릭 핸들러
  const handleResetClick = () => {
    setSelectedCategories([]);
    setSelectedTypes([]);
    setSelectedNutrients([]);
    setIsResetActive(true); // 초기화 상태로 설정
    setTimeout(() => {
      setIsResetActive(false); // 일정 시간 후에 초기화 상태 해제
    }, 300); // 300ms (0.3초) 후에 초기화 상태 해제
  };

  // 초기화 버튼 스타일
  const resetButtonStyle = {
    width: '100px',
    height: '40px',
    marginRight: '30px',
    backgroundColor: isResetActive ? '#FFC9C9' : '#F0F0F0',
    color: 'black',
    fontSize: '20px',
    border: 'none', // 기본 테두리 제거
    boxShadow: 'none', // 기본 박스 쉐도우 제거
    outline: 'none', // 포커스 테두리 제거
  };

  // 검색하기 버튼 스타일
  const searchButtonStyle = {
    width: '100px',
    height: '40px',
    backgroundColor: isSearchActive ? '#FFC9C9' : '#F0F0F0',
    color: 'black',
    fontSize: '20px',
    border: 'none', // 기본 테두리 제거
    boxShadow: 'none', // 기본 박스 쉐도우 제거
    outline: 'none', // 포커스 테두리 제거
  };


  // 검색하기 버튼 클릭 핸들러
  const handleSearchClick = () => {
    // 검색 로직 구현
    setIsSearchActive(true); // 활성화 상태로 설정
    setTimeout(() => {
      setIsSearchActive(false); // 일정 시간 후에 검색하기 상태 해제
    }, 300); // 300ms (0.3초) 후에 검색하기 상태 해제
  };

  // 초기화 버튼 마우스 오버 이벤트 핸들러
  const handleResetMouseOver = () => {
    if (!isResetActive) {
      setIsResetActive(true);
    }
  };

  // 초기화 버튼 마우스 아웃 이벤트 핸들러
  const handleResetMouseOut = () => {
    if (isResetActive) {
      setIsResetActive(false);
    }
  };

  // 검색하기 버튼 마우스 오버 이벤트 핸들러
  const handleSearchMouseOver = () => {
    if (!isSearchActive) {
      setIsSearchActive(true);
    }
  };

  // 검색하기 버튼 마우스 아웃 이벤트 핸들러
  const handleSearchMouseOut = () => {
    if (isSearchActive) {
      setIsSearchActive(false);
    }
  };

  // 선택된 카테고리/유형/영양소에 따라 스타일 적용
  // 구분 버튼 스타일
  const getCategoryButtonStyle = (category) => ({
    backgroundColor: selectedCategories.includes(category) ? '#FFC9C9' : '#F0F0F0',
    color: 'black',
    border: 'none',
    fontSize: '20px',
    width: '90px',
    height: '40px',
    marginBottom: '10px',
    marginLeft: '100px',
    marginRight: '-80px',
  });

  // 건조별 버튼 스타일
  const getTypeButtonStyle = (type) => ({
    backgroundColor: selectedTypes.includes(type) ? '#FFC9C9' : '#F0F0F0',
    color: 'black',
    border: 'none',
    fontSize: '20px',
    width: '90px',
    height: '40px',
    marginBottom: '10px',
    marginLeft: '93px',
    marginRight: '-75px',
  });

  // 성분 버튼 스타일
  const getNutrientButtonStyle = (nutrient) => ({
    backgroundColor: selectedNutrients.includes(nutrient) ? '#FFC9C9' : '#F0F0F0',
    color: 'black',
    border: 'none',
    fontSize: '20px',
    width: '90px',
    height: '40px',
    marginBottom: '10px',
    marginLeft: '100px',
    marginRight: '-80px',
  });

  const strongStyle = {
    fontSize: '25px',
    marginLeft: '50px',
    padding: '5px'
  }

  // ---------------------------------------- 사료 추천 박스 --------------------------------------------------
  // 이미지 박스 스타일
  const imageBoxStyle = {
    display: 'inline-block',
    width: 'calc(25% - 40px)',
    margin: 'auto',
    overflow: 'hidden',
    position: 'relative'
  };

  // 이미지 박스 컨테이너 스타일
  const imageBoxContainerStyle = {
    display: 'flex',
    flexWrap: 'wrap', // 한 줄에 4개씩
    justifyContent: 'space-between', // 좌우 간격 맞춤
  };

  // 이미지 스타일
  const imageStyle = {
    width: '100%',
    height: 'auto',
    maxHeight: '100%'
  };


  // 이미지 설명 스타일
  const descriptionStyle = {
    textAlign: 'center',
    padding: '10px',
    color: 'black',
    textDecoration: 'none',
    transition: 'color 0.3s', // 색 변화에 트랜지션 적용
  };

  // 링크 스타일
  const linkStyle = {
    textDecoration: 'none',
    color: 'black',
    transition: 'color 0.3s', // 색 변화에 트랜지션 적용
  };

  // 이미지 박스 클릭 시 각 사료의 상세페이지 이동
  const dummyFeeds = Array.from({ length: 237 }, (_, index) => ({
    id: index + 1,
    description: `Feed ${index + 1}`,
  }));

  const imageBoxes = dummyFeeds.map((feed) => (
    <div key={feed.id} style={imageBoxStyle}>
      <Link to={`/ImageDetailFeed/${feed.id}`} style={linkStyle}>
        <div style={{ backgroundColor: 'gray', width: '100%', height: '200px' }}></div>
        <p style={descriptionStyle}>{feed.description}</p>
      </Link>
    </div>
  ));


  // ------------------------------------------------
  // 페이지 맨 위로 이동 버튼 클릭 핸들러
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 페이지 맨 아래로 이동 버튼 클릭 핸들러
  const scrollToBottom = () => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  };



  // -------------------------------------------------return문---------------------------------------------------
  return (
    <div style={{ backgroundColor: '#F0F0F0' }}>
      <Logo />

      {/* 사료 정보 선택 div */}
      <div style={{ margin: '20px auto', width: '1200px', height: '330px', backgroundColor: 'white', marginBottom: '70px', borderRadius: '20px', padding: '60px 90px 40px 50px', textAlign: 'center', fontSize: '19px', fontWeight: 'bold', position: 'relative' }}>
        <div style={{ display: 'flex', marginBottom: '10px' }}>
          <strong style={strongStyle}>구 분</strong>
          {categories.map((category, index) => (
            <Button
              key={index}
              variant="light"
              style={getCategoryButtonStyle(category)}
              onClick={() => handleCategoryClick(category)}
            >
              {category}
            </Button>
          ))}
        </div>
        <div style={{ display: 'flex', marginBottom: '10px' }}>
          <strong style={strongStyle}>건조별</strong>
          {types.map((type, index) => (
            <Button
              key={index}
              variant="light"
              style={getTypeButtonStyle(type)}
              onClick={() => handleTypeClick(type)}
            >
              {type}
            </Button>
          ))}
        </div>
        <div style={{ display: 'flex' }}>
          <strong style={strongStyle}>성 분</strong>
          {nutrients.map((nutrient, index) => (
            <Button
              key={index}
              variant="light"
              style={getNutrientButtonStyle(nutrient)}
              onClick={() => handleNutrientClick(nutrient)}
            >
              {nutrient}
            </Button>
          ))}
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
          <Button
            variant="light"
            style={resetButtonStyle}
            onClick={handleResetClick}
            onMouseOver={handleResetMouseOver}
            onMouseOut={handleResetMouseOut}
          >
            초기화
          </Button>
          <Button
            variant="light"
            style={searchButtonStyle}
            onClick={handleSearchClick}
            onMouseOver={handleSearchMouseOver}
            onMouseOut={handleSearchMouseOut}
          >
            검색하기
          </Button>
        </div>
        <strong style={{ color: 'black', fontSize: '25px', position: 'absolute', top: 'calc(100% + 20px)', left: '20px' }}>237개의 사료 추천</strong>
      </div>

      {/* 사료 추천 박스 컨테이너 */}
      <div style={{ margin: 'auto', width: '1200px', backgroundColor: 'white', borderRadius: '20px', padding: '60px 40px 10px 40px' }}>
        <div style={imageBoxContainerStyle}>{imageBoxes}</div>
      </div>

      {/* 페이지 맨 위로/아래로 이동 버튼 */}
      <div style={{ position: 'fixed', right: '20px', bottom: '20px', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', zIndex: 999 }}>
        <Button variant="light" onClick={scrollToTop} style={{ marginBottom: '10px' }}>
          <span style={{ color: 'black' }}>▲</span>
        </Button>
        <Button variant="light" onClick={scrollToBottom}>
          <span style={{ color: 'black' }}>▼</span>
        </Button>
      </div>
      {generateRoutes()}
    </div>
  );
};

export default Feed;
