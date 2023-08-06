import React, { useState } from 'react';
import Logo from './Logo';
import Button from 'react-bootstrap/Button';

const Recipe = () => {
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [searchText, setSearchText] = useState('');

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
    color: 'gray',
    border: 'none',
    fontSize: '13px',
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


  // -----------------------------------------------------------------------------------------------------------------------------------------
  // return문
  return (
    <div style={{ backgroundColor: '#F0F0F0' }}>
      <Logo />

      <div style={{ margin: '20px auto', width: '1000px', backgroundColor: 'white', marginBottom: '50px', borderRadius: '20px', padding: '20px', textAlign: 'center', fontSize: '19px', fontWeight: 'bold', position: 'relative' }}>
        <p style={{ color: 'gray', fontSize: '15px', margin: '10px', marginBottom: '25px' }}>재료를 선택해 주세요</p>

        {ingredientsRows}

        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
          <Button variant="light" style={{ ...ingredientButtonStyle, marginRight: '20px', backgroundColor: '#F0F0F0', color: 'gray', width: '100px' }}>
            초기화
          </Button>
          <Button variant="primary" style={{ ...ingredientButtonStyle, marginRight: '100px', backgroundColor: '#F0F0F0', color: 'gray', width: '100px' }}>
            검색하기
          </Button>
        </div>
        <strong style={{ color: 'gray', fontSize: '18px', position: 'absolute', top: 'calc(100% + 20px)', left: '20px' }}>n개의 간식 레시피 추천</strong>
      </div>
      <div style={{ margin: 'auto', width: '1000px', height: '1000px', backgroundColor: 'white', borderRadius: '20px', padding: '10px' }}>

      </div>
    </div>
  );
};

export default Recipe;