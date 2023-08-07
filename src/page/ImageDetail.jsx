import React from 'react';
import { useParams } from 'react-router-dom';
import Logo from './Logo';

const ImageDetail = () => {
  const { recipeId } = useParams();

  return (
    <div>
      <Logo/>
  
      {/* 간식 레시피 담을 div */}
      <div style={{ display: 'flex', justifyContent: 'center', margin: '20px auto', width: '1200px', backgroundColor: 'white', marginBottom: '50px', borderRadius: '20px', padding: '20px', fontSize: '19px', fontWeight: 'bold', position: 'relative' }}>
        
        {/* 왼쪽 이미지 넣을 div */}
        <div style={{ flex: 0.5, backgroundColor: 'lightyellow', padding: '20px', fontSize: '19px', fontWeight: 'bold', textAlign: 'center' }}>
          이미지
          {/* 이미지 내용 */}
        </div>
  
        {/* 오른쪽 텍스트 넣을 div */}
        <div style={{ flex: 1, backgroundColor: 'lightblue', padding: '20px', fontSize: '19px', fontWeight: 'bold', textAlign: 'center' }}>
          {/* 텍스트 내용 */}
          <h3>레시피 이름</h3><br/>
          <h5>레시피 재료</h5><br/>
          <h5>레시피 조리 순서</h5>
        </div>
        
      </div>
      
      {/* 나중에 DB 받으면 recipeId 값으로 받아오기 */}
      <h6>Recipe 상세 페이지 - {recipeId}</h6>
    </div>
  );
};

export default ImageDetail;
