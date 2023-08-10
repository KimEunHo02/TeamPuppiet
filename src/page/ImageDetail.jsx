import React from 'react';
import { useParams } from 'react-router-dom';
import Logo from './Logo';

const ImageDetail = () => {
  const { recipeId } = useParams();

  return (
    <div>
      <Logo/>
  
      {/* 간식 레시피 담을 div */}
      <div style={{ display: 'flex', justifyContent: 'center', margin: '30px auto', width: '1200px', backgroundColor: 'white', marginBottom: '50px', borderRadius: '20px', padding: '20px', fontSize: '19px', fontWeight: 'bold', position: 'relative' }}>
        
        {/* 왼쪽 이미지 넣을 div */}
        <div style={{ flex: 1, backgroundColor: 'white', padding: '20px', paddingTop: '30px', fontSize: '19px', fontWeight: 'bold', textAlign: 'center' }}>
          
          {/* 이미지 */}
          <img src={process.env.PUBLIC_URL + '/recipeimg.png'} alt="사료 이미지" style={{ maxWidth: '100%', maxHeight: '100%' }} />

          {/* 레시피 이름 */}
          <div style={{marginTop: '40px'}}>
            <h3 style={{backgroundColor: '#FFC9C9', width: '400px', margin: 'auto', borderRadius: '20px', marginBottom: '10px'}}>레시피 이름</h3><br/>
          </div>
        </div>
  
        {/* 오른쪽 텍스트 넣을 div */}
        <div style={{ flex: 1, backgroundColor: 'white', padding: '20px', paddingTop: '30px',fontSize: '19px', fontWeight: 'bold', textAlign: 'center' }}>
          {/* 텍스트 내용 */}

          {/* 레시피 재료 */}
          <div style={{marginBottom: '50px'}}>
            <h3 style={{backgroundColor: '#FFC9C9', width: '240px', margin: 'auto', borderRadius: '20px', marginBottom: '10px'}}>🍽️ 레시피 재료 🍽️</h3><br/>
            <p>레시피 재료들 들어가야 합니다 요기에~</p>
          </div>

          {/* 레시피 조리 순서 */}
          <div>
            {/* p 태그로 감싸던지 br로 나누던지 해야함 */}
            <h3 style={{backgroundColor: '#FFC9C9', width: '240px', margin: 'auto', borderRadius: '20px', marginBottom: '20px'}}>레시피 조리 순서</h3>
            <p>1. 어쩌고 저쩌고 한다</p>
            <p>2. 저쩌고 저쩌고 저쩌고 한다</p>
            <p>3. 어쩌고 저쩌고 어쩌고 저쩌고 한다</p>
            <p>4. 반려견에게 급여하세요!</p>
          </div>
        </div>
        
      </div>
      
      {/* 나중에 DB 받으면 recipeId 값으로 받아오기 */}
      <h6>Recipe 상세 페이지 - {recipeId}</h6>
    </div>
  );
};

export default ImageDetail;
