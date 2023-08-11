import React, { useState,useEffect } from 'react';
import '../css/ImageSlider.css'; // 스타일링을 위한 CSS 파일
import axios from 'axios';

// Mainpage1에서 이미지 슬라이더에 쓰이는 컴포넌트 공간입니다
// 사료 이미지 슬라이더

const ImageSlider = ({ images }) => {
  const [startIndex, setStartIndex] = useState(0);
  const [data, setData] = useState([]); // 사료명 데이터를 저장할 상태

  useEffect(() => {
    axios.get('건식사료-성분.json') // JSON 파일의 경로를 적절히 수정해주세요.
      .then(response => {
        setData(response.data);

        const randomIndex = Math.floor(Math.random() * (images.length - 3)); // 랜덤한 시작 인덱스 계산
        setStartIndex(randomIndex);
      })
      .catch(error => {
        console.error('데이터를 불러오는데 에러 발생:', error);
      });
  }, []);


  const handleNextClick = () => {
    if (startIndex < images.length - 1) {
      setStartIndex(startIndex + 1);
    }
  };

  const handlePrevClick = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1);
    }
  };

  const visibleImages = images.slice(startIndex, startIndex + 3);

  return (
    <div className="image-slider">
      <button className="prev-button" onClick={handlePrevClick} disabled={startIndex === 0}>
        &lt;
      </button>
      <div className="image-container">
        {visibleImages.map((image, index) => (
          <div key={index} className="foodbox">
            <img src={`건식사진/건식${startIndex + index + 1}.jpg`} alt={`Image ${startIndex + index + 1}`} />

            {/* 사료 제품명 들어갈 텍스트 공간 -> 데이터 넣을 시 수정 필요 */}
            <a className="foodtext">{data[startIndex + index]?.Column2}</a>
          </div>
        ))}
      </div>
      <button className="next-button" onClick={handleNextClick} disabled={startIndex === images.length - 3}>
        &gt;
      </button>
    </div>
  );
};

export default ImageSlider;