import React from 'react';
import { useParams } from 'react-router-dom';
import Logo from './Logo';

const ImageDetailFeed = () => {
  const { feedId } = useParams();

  return (
    <div>
      <Logo/>

      {/* 사료 담을 div */}
      <div style={{ display: 'flex', justifyContent: 'center', margin: '20px auto', width: '1200px', backgroundColor: 'white', marginBottom: '50px', borderRadius: '20px', padding: '20px', fontSize: '19px', fontWeight: 'bold', position: 'relative' }}>
        
        {/* 왼쪽 이미지 넣을 div */}
        <div style={{ flex: 0.5, backgroundColor: 'lightyellow', padding: '20px', fontSize: '19px', fontWeight: 'bold', textAlign: 'center' }}>
          이미지
          {/* 이미지 내용 */}
        </div>
  
        {/* 오른쪽 텍스트 넣을 div */}
        <div style={{ flex: 1, backgroundColor: 'lightblue', padding: '20px', fontSize: '19px', fontWeight: 'bold', textAlign: 'center' }}>
          {/* 텍스트 내용 */}
          <h3>사료 이름</h3><br/>
          <h5>사료 성분</h5><br/>
          <h5>사료 설명</h5>
        </div>
        
      </div>

      {/* 나중에 DB 받으면 feedId 값으로 받아오기 */}
      <h2>Feed 상세 페이지 - {feedId}</h2> 
    </div>
  );
};

export default ImageDetailFeed;
