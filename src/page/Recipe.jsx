import React, { useState, useEffect } from 'react';
import Logo from './Logo';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { BrowserRouter, Route, Link, Routes } from 'react-router-dom';
import ImageDetail from './ImageDetail';

const Recipe = () => {
  const [recipeData, setRecipeData] = useState([]);
  const [hoveredImageIndex, setHoveredImageIndex] = useState(null); // 이미지 hover

useEffect(() => {
  const recipefilePath = 'recipebom.json';
  //간식레시피데이터 가져오기
  axios.get(recipefilePath)
  .then(response => {
    setRecipeData(response.data);
  })
  .catch(error => {
    console.error('Error fetching dry food data:', error);
  })
}, []);




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
  const [isResetActive, setIsResetActive] = useState(false); // 초기화 버튼 활성화 상태 관리
  // const [isSearchActive, setIsSearchActive] = useState(false); // 검색하기 버튼 활성화 상태 관리

  const ingredients = [
    '채소', '육류', '과일', '달걀', '유제품'
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
    fontSize: '20px',
    width: '110px',
    height: '40px',
    marginBottom: '10px',
    marginRight: '40px'
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

  // 초기화 버튼 클릭 핸들러
  const handleResetClick = () => {
    setSelectedIngredients([]);
    setIsResetActive(true); // 초기화 상태로 설정
    setTimeout(() => {
      setIsResetActive(false); // 일정 시간 후에 초기화 상태 해제
    }, 300); // 300ms (0.3초) 후에 초기화 상태 해제
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

  // 재료 버튼 두 줄로 나눠 표시하기 위한 배열
  const ingredientsRows = [];

  // 재료 버튼 추가
  ingredientsRows.push(
    <div key={1} style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>
      {ingredients.map((ingredient, index) => (
        <Button
          key={index}
          variant={selectedIngredients.includes(ingredient) ? 'secondary' : 'primary'}
          size="lg"
          style={{ ...ingredientButtonStyle, marginRight: '30px', backgroundColor: selectedIngredients.includes(ingredient) ? '#FFC9C9' : '#F0F0F0' }}
          onClick={() => handleIngredientClick(ingredient)}
        >
          {ingredient}
        </Button>
      ))}
    </div>
  );


  // ---------------------------------------- 레시피 추천 박스 --------------------------------------------------
  // 이미지 박스 스타일
  const imageBoxStyle = {
    display: 'inline-block',
    width: 'calc(25% - 40px)',
    margin: '15px auto',
    overflow: 'hidden',
    position: 'relative',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', // 그림자 효과
    transition: 'transform 0.1s ease', // 트랜지션 설정
  };

  // 이미지 박스 컨테이너 스타일
  const imageBoxContainerStyle = {
    display: 'flex',
    flexWrap: 'wrap', // 한 줄에 4개씩
    justifyContent: 'space-between', // 좌우 간격 맞춤
  };

  // 이미지 박스 마우스 오버 효과 설정
  const handleImageBoxMouseOver = (event, index) => {
    setHoveredImageIndex(index); // 호버된 이미지 인덱스 설정
    event.currentTarget.style.transform = 'scale(1.05)'; // 이미지 확대
  };

  // 이미지 박스 마우스 아웃 효과 설정
  const handleImageBoxMouseOut = (event) => {
    setHoveredImageIndex(null); // 호버된 이미지 인덱스 초기화
    event.currentTarget.style.transform = ''; // 이미지 크기 원래대로 복원
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
  
  const imageBoxes = dummyRecipes.map((recipe, index) => {
    const recipeInfo = recipeData[recipe.id - 1];
    if (!recipeInfo) {
      return null; // 해당 레시피 정보가 없을 경우 빈 컴포넌트 반환
    }
  
    const ingredientsList = JSON.parse(recipeInfo['재료 (고구마, 감자, 호박, 닭, 돼지, 소, 연어, 당근, 사과, 바나나, 꿀, 귀리, 우유, 요거트, 치즈, 달걀)']);
  
    // 기준에 따라 재료 카테고리 분류
    const categories = {
      채소: ['고구마', '감자', '호박', '당근'],
      육류: ['닭', '돼지', '소', '연어', '고기'], // '고기'도 육류에 속한다고 가정
      과일: ['사과', '바나나'],
      유제품: ['우유', '요거트', '치즈'],
      달걀: ['달걀'],
    };
  
    // 선택한 재료 중에 각 카테고리에 속하는 재료가 있는지 체크
    const shouldRender = selectedIngredients.length === 0 || selectedIngredients.some(ingredient => {
      if (categories[ingredient]) {
        return ingredientsList.some(listIngredient => {
          if (ingredient === '육류' && listIngredient.includes('고기')) {
            return true;
          }
          return categories[ingredient].includes(listIngredient);
        });
      }
      return false;
    });
  
    // 렌더링 조건 충족 시에만 레시피 렌더링
    if (!shouldRender) {
      return null;
    }

    return (
      <div
        key={recipe.id}
        style={{ ...imageBoxStyle, transform: index === hoveredImageIndex ? 'scale(1.05)' : '' }}
        onMouseOver={(event) => handleImageBoxMouseOver(event, index)} // 인덱스 전달
        onMouseOut={handleImageBoxMouseOut}
      >
        <Link to={`/ImageDetail/${recipe.id}`} style={linkStyle}>
          <div style={{ backgroundImage: `url('/간식2/image (${recipe.id}).png')`, width: '100%', height: '200px', backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
          <p style={descriptionStyle}>{recipeInfo.레시피명}</p>
        </Link>
      </div>
    );
  });


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

      <div style={{ margin: '20px auto', width: '1200px', backgroundColor: 'white', marginBottom: '70px', borderRadius: '20px', padding: '20px', textAlign: 'center', fontSize: '19px', fontWeight: 'bold', position: 'relative' }}>
        <p style={{ color: 'black', fontSize: '20px', margin: '10px', marginBottom: '30px' }}>재료를 선택해 주세요</p>

        {ingredientsRows}

        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
          <Button
            variant="light"
            style={{ ...resetButtonStyle, marginRight: '20px', marginBottom: '20px', color: 'black', width: '100px' }}
            onClick={handleResetClick}
            onMouseOver={handleResetMouseOver}
            onMouseOut={handleResetMouseOut}
          >
            초기화
          </Button>
        </div>
        <strong style={{ color: 'black', fontSize: '25px', position: 'absolute', top: 'calc(100% + 20px)', left: '20px' }}>간식 레시피 추천</strong>
      </div>

      {/* 레시피 추천 박스 컨테이너 */}
      <div style={{ margin: 'auto', width: '1200px', backgroundColor: 'white', borderRadius: '20px', padding: '40px 40px 10px 40px' }}>
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
