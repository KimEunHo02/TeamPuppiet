import { useEffect, useState } from 'react';
import React from 'react';
import { useParams } from 'react-router-dom';
import Logo from './Logo';
import { dummyFeeds } from './Feed'; // Feed에서 dummyFeeds를 가져옵니다.


const getImageFilePath = (feedId) => {
  if (feedId <= 181) {
    return {
      imagePath: `${process.env.PUBLIC_URL}/건식사진/건식${feedId}.jpg`,
      nameData: `${process.env.PUBLIC_URL}/건식사료-성분.json`,
    };
  } else {
    const wetFeedId = feedId - 181;
    return {
      imagePath: `${process.env.PUBLIC_URL}/습식사진/습식${wetFeedId}.jpg`,
      nameData: `${process.env.PUBLIC_URL}/습식사료-성분.json`,
    };
  }
};


const ImageDetailFeed = ({  }) => {
  const { feedId } = useParams();
  const selectedFeed = dummyFeeds.find((feed) => feed.id === parseInt(feedId));

  const [selectedFeedName, setSelectedFeedName] = useState("");
   const [selectedFeedNutrition, setSelectedFeedNutrition] = useState([]);

  const fetchFeedNameData = (dataUrl, targetId) => {
    fetch(dataUrl)
      .then((response) => response.json())
      .then((data) => {
        const info = data.find((item) => item.Column1 === targetId);
        setSelectedFeedName(info ? info.Column2 : '사료 정보 없음');
      })
      .catch((error) => {
        console.error("Error fetching name data:", error);
        setSelectedFeedName("사료 정보 없음");
      });
  };

  useEffect(() => {
    const imageInfo = getImageFilePath(selectedFeed.id);

    if (imageInfo.nameData) {
      // 건식 사료의 경우 추가로 이름 데이터 가져오기
      if (selectedFeed.id <= 181) {
        const dryNameDataUrl = `${process.env.PUBLIC_URL}/건식사료-성분.json`;
        fetchFeedNameData(dryNameDataUrl, selectedFeed.id);
      } else {
        const wetNameDataUrl = `${process.env.PUBLIC_URL}/습식사료-성분.json`;
        fetchFeedNameData(wetNameDataUrl, selectedFeed.id - 181);
      }
    } else {
      setSelectedFeedName('사료 정보 없음');
    }
  }, [selectedFeed.id]);




  return (
    <div>
      <Logo />

      {/* 사료 담을 div */}
      <div style={{ display: 'flex', justifyContent: 'center', margin: '30px auto', width: '1200px', backgroundColor: 'white', marginBottom: '50px', borderRadius: '20px', padding: '20px', fontSize: '19px', fontWeight: 'bold', position: 'relative' }}>

        {/* 왼쪽 이미지 넣을 div */}
        <div style={{ flex: 1, width: '400px', backgroundColor: 'white', padding: '20px', paddingTop: '30px', fontSize: '19px', fontWeight: 'bold', textAlign: 'center' }}>
          {/* 이미지 */}
          <img
            src={getImageFilePath(selectedFeed.id).imagePath}
            alt="사료 이미지"
            style={{ maxWidth: '100%', maxHeight: '100%' }}
/>

          {/* 사료 이름 */}
          <div style={{ marginTop: '40px' }}>
            <h3 style={{ backgroundColor: '#FFC9C9', width: '400px', margin: 'auto', borderRadius: '20px', marginBottom: '10px' }}>{selectedFeedName}</h3><br />
          </div>
        </div>

        {/* 오른쪽 텍스트 넣을 div */}
        <div style={{ flex: 1, backgroundColor: 'white', padding: '20px', paddingTop: '30px', fontSize: '19px', fontWeight: 'bold', textAlign: 'center' }}>

          {/* 텍스트 내용 */}

          {/* 사료 설명 */}
          <div style={{marginBottom: '50px'}}>
            <h3 style={{ backgroundColor: '#FFC9C9', width: '200px', margin: 'auto', borderRadius: '20px', marginBottom: '10px' }}>🍖 사료 설명 🍖</h3><br />
            {/* p 태그로 감싸던지 br로 나누던지 해야함 */}
            <p>1. 맛있는 사료!</p>
            <p>2. 최고의 사료!</p>
            <p>3. 최고의 사료!</p>
            <p>4. 최고의 사료!</p>
          </div>

          {/* 사료 성분 */}
          <div>
            <h3 style={{ backgroundColor: '#FFC9C9', width: '200px', margin: 'auto', borderRadius: '20px', marginTop: '10px' }}>사료 성분</h3><br />
            <p>조단백질(%): {selectedFeedNutrition["조단백질(%)"]}</p>
            <p>조지방(%): {selectedFeedNutrition["조지방(%)"]}</p>
            <p>조섬유(%): {selectedFeedNutrition["조섬유(%)"]}</p>
            <p>조회분(%): {selectedFeedNutrition["조회분(%)"]}</p>
            <p>인(%): {selectedFeedNutrition["인(%)"]}</p>
            <p>칼슘(%): {selectedFeedNutrition["칼슘(%)"]}</p>
            <p>수분(%): {selectedFeedNutrition["수분(%)"]}</p>
          </div>
        </div>

      </div>

      {/* 나중에 DB 받으면 feedId 값으로 받아오기 */}
      <h6>Feed 상세 페이지 - {feedId}</h6>
    </div>
  );
};

export default ImageDetailFeed;
