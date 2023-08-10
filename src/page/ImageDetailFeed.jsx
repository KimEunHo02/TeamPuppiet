import React from 'react';
import { useParams } from 'react-router-dom';
import Logo from './Logo';

const ImageDetailFeed = () => {
  const { feedId } = useParams();

  return (
    <div>
      <Logo />

      {/* 사료 담을 div */}
      <div style={{ display: 'flex', justifyContent: 'center', margin: '30px auto', width: '1200px', backgroundColor: 'white', marginBottom: '50px', borderRadius: '20px', padding: '20px', fontSize: '19px', fontWeight: 'bold', position: 'relative' }}>

        {/* 왼쪽 이미지 넣을 div */}
        <div style={{ flex: 0.7, width: '400px', backgroundColor: 'white', padding: '20px', paddingTop: '30px', fontSize: '19px', fontWeight: 'bold', textAlign: 'center' }}>
          {/* 이미지 */}
          <img src={process.env.PUBLIC_URL + '/saryoimg.jpg'} alt="사료 이미지" style={{ maxWidth: '100%', maxHeight: '100%' }} />

          {/* 사료 이름 */}
          <div style={{ marginTop: '10px' }}>
            <h3 style={{ backgroundColor: '#FFC9C9', width: '140px', margin: 'auto', borderRadius: '20px', marginBottom: '10px' }}>사료 이름</h3><br />
          </div>
        </div>

        {/* 오른쪽 텍스트 넣을 div */}
        <div style={{ flex: 1, backgroundColor: 'white', padding: '20px', paddingTop: '30px', fontSize: '19px', fontWeight: 'bold', textAlign: 'center' }}>

          {/* 텍스트 내용 */}

          {/* 사료 설명 */}
          <div style={{marginBottom: '50px'}}>
            <h3 style={{ backgroundColor: '#FFC9C9', width: '140px', margin: 'auto', borderRadius: '20px', marginBottom: '10px' }}>사료 설명</h3><br />
            {/* p 태그로 감싸던지 br로 나누던지 해야함 */}
            <p>1. 맛있는 사료!</p>
            <p>2. 최고의 사료!</p>
            <p>3. 최고의 사료!</p>
            <p>4. 최고의 사료!</p>
          </div>

          {/* 사료 성분 */}
          <div>
            <h3 style={{ backgroundColor: '#FFC9C9', width: '140px', margin: 'auto', borderRadius: '20px', marginTop: '10px' }}>사료 성분</h3><br />
            <p>사료는 맛있게 뭐랑 뭐랑 뭐랑 뭐랑 들어갔다</p>
          </div>
        </div>

      </div>

      {/* 나중에 DB 받으면 feedId 값으로 받아오기 */}
      <h6>Feed 상세 페이지 - {feedId}</h6>
    </div>
  );
};

export default ImageDetailFeed;
