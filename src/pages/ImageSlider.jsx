import React, { useState, useEffect } from 'react';
import '../css/ImageSlider.css'; // 스타일링을 위한 CSS 파일
import axios from 'axios';

const ImageSlider = () => {
  const [startIndex, setStartIndex] = useState(0);
  const [data, setData] = useState([]);
  const imageCount = 181; // 사료 이미지의 총 개수

  useEffect(() => {
    axios.get('dryfeed.json') // 데이터 JSON 파일 경로를 수정해주세요
      .then(response => {
        setData(response.data);
        setRandomStartIndex(imageCount);
      })
      .catch(error => {
        console.error('데이터를 불러오는데 에러 발생:', error);
      });
  }, []);

  const setRandomStartIndex = (count) => {
    const randomIndex = Math.floor(Math.random() * (count - 3));
    setStartIndex(randomIndex);
  };

  const handleNextClick = () => {
    if (startIndex < imageCount - 3) {
      setStartIndex(startIndex + 1);
    }
  };

  const handlePrevClick = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1);
    }
  };

  return (
    <div className="image-slider">
      <button className="prev-button" onClick={handlePrevClick} disabled={startIndex === 0}>
        &lt;
      </button>
      <div className="image-container">
        {[0, 1, 2].map((index) => {
          const imageIndex = (startIndex + index) % imageCount + 1;
          const imageName = `건식사진/건식${imageIndex}.jpg`;
          const imageData = data[imageIndex - 1]?.Column2; // 이미지 인덱스에 해당하는 사료명 데이터 가져오기
          return (
            <div key={index} className="foodbox">
              <img src={imageName} alt={`Image ${imageIndex}`} />
              <a className="foodtext">{imageData}</a>
            </div>
          );
        })}
      </div>
      <button className="next-button" onClick={handleNextClick} disabled={startIndex === imageCount - 3}>
        &gt;
      </button>
    </div>
  );
};

export default ImageSlider;
