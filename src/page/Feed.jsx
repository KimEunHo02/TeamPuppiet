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

  // ------------------------------------ 레시피 재료 선택 박스 --------------------------------------
  const [selectedCategory, setSelectedCategory] = useState(''); // 선택된 카테고리
  const [selectedType, setSelectedType] = useState(''); // 선택된 유형
  const [selectedNutrient, setSelectedNutrient] = useState(''); // 선택된 영양소
  const [isResetActive, setIsResetActive] = useState(false); // 초기화 버튼 활성화 상태 관리
  const [isSearchActive, setIsSearchActive] = useState(false); // 검색하기 버튼 활성화 상태 관리

  const categories = ['소형견', '중형견', '대형견'];
  const types = ['건식', '습식'];
  const nutrients = ['초단백질', '조단백', '조지방', '조섬유', '조회분', '칼슘', '인'];

  // 카테고리 선택 핸들러
  const handleCategoryClick = (category) => {
    setSelectedCategory(selectedCategory === category ? '' : category);
  };


  // 유형 선택 핸들러
  const handleTypeClick = (type) => {
    setSelectedType(selectedType === type ? '' : type);
  };

  // 영양소 선택 핸들러
  const handleNutrientClick = (nutrient) => {
    setSelectedNutrient(selectedNutrient === nutrient ? '' : nutrient);
  };

  // 초기화 버튼 클릭 핸들러
  const handleResetClick = () => {
    setSelectedCategory(''); // 카테고리 선택 초기화
    setSelectedType(''); // 유형 선택 초기화
    setSelectedNutrient(''); // 영양소 선택 초기화
    setIsResetActive(!isResetActive); // 활성화 상태 토글
  };

  // 초기화 버튼 스타일
  const resetButtonStyle = {
    width: '100px',
    height: '40px',
    marginRight: '20px',
    backgroundColor: isResetActive ? '#FFC9C9' : '#F0F0F0',
    color: 'gray',
    fontSize: '13px',
    border: 'none', // 기본 테두리 제거
    boxShadow: 'none', // 기본 박스 쉐도우 제거
    outline: 'none', // 포커스 테두리 제거
  };

  // 검색하기 버튼 스타일
  const searchButtonStyle = {
    width: '100px',
    height: '40px',
    marginRight: '80px',
    backgroundColor: isSearchActive ? '#FFC9C9' : '#F0F0F0',
    color: 'gray',
    fontSize: '13px',
    border: 'none', // 기본 테두리 제거
    boxShadow: 'none', // 기본 박스 쉐도우 제거
    outline: 'none', // 포커스 테두리 제거
  };


  // 검색하기 버튼 클릭 핸들러
  const handleSearchClick = () => {
    // 검색 로직 구현
    setIsSearchActive(!isSearchActive); // 활성화 상태 토글
  };

  // 선택된 카테고리/유형/영양소에 따라 스타일 적용
  // 구분
  const getCategoryButtonStyle = (category) => ({
    backgroundColor: '#F0F0F0',
    color: 'gray',
    border: 'none',
    fontSize: '13px',
    width: '90px',
    height: '40px',
    marginBottom: '10px',
    marginLeft: '110px',
    marginRight: '-80px',
    backgroundColor: selectedCategory === category ? '#FFC9C9' : '#F0F0F0',
  });

  // 건조별
  const getTypeButtonStyle = (type) => ({
    backgroundColor: '#F0F0F0',
    color: 'gray',
    border: 'none',
    fontSize: '13px',
    width: '90px',
    height: '40px',
    marginBottom: '10px',
    marginLeft: '100px',
    marginRight: '-70px',
    backgroundColor: selectedType === type ? '#FFC9C9' : '#F0F0F0',
  });

  // 성분
  const getNutrientButtonStyle = (nutrient) => ({
    backgroundColor: '#F0F0F0',
    color: 'gray',
    border: 'none',
    fontSize: '13px',
    width: '90px',
    height: '40px',
    marginBottom: '10px',
    marginLeft: '110px',
    marginRight: '-80px',
    backgroundColor: selectedNutrient === nutrient ? '#FFC9C9' : '#F0F0F0',
  });

  const strongStyle = {
    fontSize: '15px',
    marginLeft: '20px',
    padding: '10px'
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
    color: 'gray',
    textDecoration: 'none',
    transition: 'color 0.3s', // 색 변화에 트랜지션 적용
  };

  // 링크 스타일
  const linkStyle = {
    textDecoration: 'none',
    color: 'gray',
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
      <div style={{ margin: '20px auto', width: '1200px', height: '300px', backgroundColor: 'white', marginBottom: '50px', borderRadius: '20px', padding: '40px 50px 40px 50px', textAlign: 'center', fontSize: '19px', fontWeight: 'bold', position: 'relative' }}>
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
          >
            초기화
          </Button>
          <Button
            variant="light"
            style={searchButtonStyle}
            onClick={handleSearchClick}
          >
            검색하기
          </Button>
        </div>
        <strong style={{ color: 'gray', fontSize: '18px', position: 'absolute', top: 'calc(100% + 20px)', left: '20px' }}>237개의 사료 추천</strong>
      </div>

      {/* 사료 추천 박스 컨테이너 */}
      <div style={{ margin: 'auto', width: '1200px', backgroundColor: 'white', borderRadius: '20px', padding: '60px 40px 10px 40px' }}>
        <div style={imageBoxContainerStyle}>{imageBoxes}</div>
      </div>

      {/* 페이지 맨 위로/아래로 이동 버튼 */}
      <div style={{ position: 'fixed', right: '20px', bottom: '20px', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', zIndex: 999 }}>
        <Button variant="light" onClick={scrollToTop} style={{ marginBottom: '10px' }}>
          <span style={{ color: 'gray' }}>▲</span>
        </Button>
        <Button variant="light" onClick={scrollToBottom}>
          <span style={{ color: 'gray' }}>▼</span>
        </Button>
      </div>
      {generateRoutes()}
    </div>
  );
};

export default Feed;
