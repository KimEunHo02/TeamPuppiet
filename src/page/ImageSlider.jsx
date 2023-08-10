import React, { useState } from 'react';
import '../ImageSlider.css'; // 스타일링을 위한 CSS 파일

const ImageSlider = ({ images }) => {
  const [startIndex, setStartIndex] = useState(0);

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
            <img src={image} alt={`Image ${startIndex + index + 1}`} />

            {/* 제품명 들어갈 텍스트 공간 -> 데이터 넣을 시 수정 필요 */}
            <a className="foodtext">사료{startIndex + index + 1}</a>
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