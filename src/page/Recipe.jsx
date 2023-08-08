import React, { useState } from 'react';
import Logo from './Logo';
import Button from 'react-bootstrap/Button';

import { BrowserRouter, Route, Link, Routes } from 'react-router-dom';
import ImageDetail from './ImageDetail';

const Recipe = () => {

  // 이미지 상세 페이지 라우팅을 생성하는 함수
  const generateRoutes = () => {
    const dummyRecipes = Array.from({ length: 627 }, (_, index) => index + 1);

    return (
      <Routes>
        {dummyRecipes.map((recipeId) => (
          <Route
            key={recipeId}
            path={`/ImageDetail/:recipeId`}
            element={<ImageDetail />}
          />
        ))}
      </Routes>
    );
  }

  // ------------------------------------ 레시피 재료 선택 박스 --------------------------------------
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [searchText, setSearchText] = useState(''); // 검색어 입력 상태 관리

  const ingredients = [
    '고구마', '감자', '당근', '호박', '닭고기', '돼지고기', '소고기', '연어',
    '사과', '바나나', '꿀', '귀리', '우유', '요거트', '치즈', '달걀'
  ];

  // 재료 선택/해제 핸들러
  const handleIngredientClick = (ingredient) => {
    if (selectedIngredients.includes(ingredient)) {
      setSelectedIngredients(selectedIngredients.filter(item => item !== ingredient));
    } else {
      setSelectedIngredients([...selectedIngredients, ingredient]);
    }
  };

  // 재료 버튼 스타일
  const ingredientButtonStyle = {
    backgroundColor: '#F0F0F0',
    color: 'black',
    border: 'none',
    fontSize: '15px',
    width: '90px',
    height: '40px',
    marginBottom: '10px',
  };

  // 재료 버튼 두 줄로 나눠 표시하기 위한 배열
  const ingredientsRows = [];
  const firstRowIngredients = ingredients.slice(0, 8);
  const secondRowIngredients = ingredients.slice(8);

  // 첫 번째 줄에 재료 버튼 추가
  ingredientsRows.push(
    <div key={1} style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>
      {firstRowIngredients.map((ingredient, index) => (
        <Button
          key={index}
          variant={selectedIngredients.includes(ingredient) ? 'secondary' : 'primary'}
          size="lg"
          style={{ ...ingredientButtonStyle, marginRight: '10px', backgroundColor: selectedIngredients.includes(ingredient) ? '#FFC9C9' : '#F0F0F0' }}
          onClick={() => handleIngredientClick(ingredient)}
        >
          {ingredient}
        </Button>
      ))}
    </div>
  );

  // 두 번째 줄에 재료 버튼 추가
  ingredientsRows.push(
    <div key={2} style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>
      <div style={{ flex: '1' }}></div>
      {secondRowIngredients.map((ingredient, index) => (
        <Button
          key={index}
          variant={selectedIngredients.includes(ingredient) ? 'secondary' : 'primary'}
          size="lg"
          style={{ ...ingredientButtonStyle, marginRight: '10px', backgroundColor: selectedIngredients.includes(ingredient) ? '#FFC9C9' : '#F0F0F0' }}
          onClick={() => handleIngredientClick(ingredient)}
        >
          {ingredient}
        </Button>
      ))}
      <div style={{ flex: '1' }}></div>
    </div>
  );


  // ---------------------------------------- 레시피 추천 박스 --------------------------------------------------
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

  // 이미지 박스 클릭 시 각 레시피의 상세페이지 이동
  const dummyRecipes = Array.from({ length: 627 }, (_, index) => ({
    id: index + 1,
    description: `Recipe ${index + 1}`,
  }));

  const imageBoxes = dummyRecipes.map((recipe) => (
    <div key={recipe.id} style={imageBoxStyle}>
      <Link to={`/ImageDetail/${recipe.id}`} style={linkStyle}>
        <div style={{ backgroundColor: 'gray', width: '100%', height: '200px' }}></div>
        <p style={descriptionStyle}>{recipe.description}</p>
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

      <div style={{ margin: '20px auto', width: '1200px', backgroundColor: 'white', marginBottom: '50px', borderRadius: '20px', padding: '20px', textAlign: 'center', fontSize: '19px', fontWeight: 'bold', position: 'relative' }}>
        <p style={{ color: 'black', fontSize: '17px', margin: '10px', marginBottom: '25px' }}>재료를 선택해 주세요</p>

        {ingredientsRows}

        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
          <Button variant="light" style={{ ...ingredientButtonStyle, marginRight: '20px', backgroundColor: '#F0F0F0', color: 'black', width: '100px' }}>
            초기화
          </Button>
          <Button variant="primary" style={{ ...ingredientButtonStyle, marginRight: '100px', backgroundColor: '#F0F0F0', color: 'black', width: '100px' }}>
            검색하기
          </Button>
        </div>
        <strong style={{ color: 'black', fontSize: '20px', position: 'absolute', top: 'calc(100% + 20px)', left: '20px' }}>627개의 간식 레시피 추천</strong>
      </div>

      {/* 레시피 추천 박스 컨테이너 */}
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

export default Recipe;
