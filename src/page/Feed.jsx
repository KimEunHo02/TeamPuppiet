import React, { useState, useEffect } from 'react';
import Logo from './Logo';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { BrowserRouter, Route, Link, Routes } from 'react-router-dom';
import ImageDetailFeed from './ImageDetailFeed';
import dummyFeeds from './dummyFeedsData'; // dummyFeeds 데이터를 가져옵니다.



const Feed = () => {
  const [dryFoodData, setDryFoodData] = useState([]);
  const [wetFoodData, setWetFoodData] = useState([]);
  const [filteredBrands, setFilteredBrands] = useState([]);

  useEffect(() => {
    // JSON 파일 경로
    const dryJsonFilePath = '건식사료-성분.json';
    const wetJsonFilePath = '습식사료-성분.json';

    // JSON 파일 가져오기
    axios.get(dryJsonFilePath)
    .then(response => {
      setDryFoodData(response.data);
      console.log('Dry food data:', response.data);
    })
    .catch(error => {
      console.error('Error fetching dry food data:', error);
    });

  // 습식 사료 데이터 가져오기
    axios.get(wetJsonFilePath)
    .then(response => {
      setWetFoodData(response.data);
      console.log('wet food data:', response.data);
    })
    .catch(error => {
      console.error('Error fetching wet food data:', error);
    });
    }, []);




  

  // 이미지 상세 페이지 라우팅을 생성하는 함수
  const generateRoutes = () => {
    const dummyFeeds = Array.from({ length: 214 }, (_, index) => ({
      id : index + 1,
      description: `Feed ${index + 1}`,
      image: `건식${index + 1}.jpg`,}));

    return (
      <Routes>
      {dummyFeeds.map((feed) => (
        <Route
          key={feed.id}
          path={`/ImageDetailFeed/${feed.id}`}
          element={<ImageDetailFeed feed={feed} />}
        />
      ))}
    </Routes>
    );
  }

  // ------------------------------------ 사료별 선택 박스 --------------------------------------
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedNutrients, setSelectedNutrients] = useState([]);
  const [isResetActive, setIsResetActive] = useState(false); // 초기화 버튼 활성화 상태 관리


  const categories = ['소형견', '중형견', '대형견'];
  const types = ['건식', '습식'];
  const nutrients = ['로얄캐닌', '뉴트리나', '네츄럴코어', '기타', '시저', '테라카니스', '네이처스', '기타'];

  // 선택된 유형에 따른 영양소 버튼
  const availableNutrients = selectedTypes.includes('건식') ? ['로얄캐닌', '뉴트리나', '네츄럴코어', '기타'] : ['시저', '테라카니스', '네이처스', '기타'];

  // 카테고리 선택 핸들러
  const handleCategoryClick = (category) => {
    setSelectedCategories([category]); // 선택한 카테고리만 선택된 상태로 설정
  };

  // 유형 선택 핸들러
  const handleTypeClick = (type) => {
    console.log("handleNutrientClick:", type);
    setSelectedTypes([type]); // 선택한 유형만 선택된 상태로 설정
  };

  // 브랜드 선택 핸들러
  const handleNutrientClick = (nutrient) => {
    setSelectedNutrients((prevSelectedNutrients) => {
      if (prevSelectedNutrients.includes(nutrient)) {
        return prevSelectedNutrients.filter((n) => n !== nutrient);
      } else {
        return [...prevSelectedNutrients, nutrient];
      }
    });
  };

  // 초기화 버튼 클릭 핸들러
  const handleResetClick = () => {
    setSelectedCategories([]);
    setSelectedTypes([]);
    setSelectedNutrients([]);
    setIsResetActive(true); // 초기화 상태로 설정
    setTimeout(() => {
      setIsResetActive(false); // 일정 시간 후에 초기화 상태 해제
    }, 300); // 300ms (0.3초) 후에 초기화 상태 해제
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

 
  // 선택된 카테고리/유형/영양소에 따라 스타일 적용
  // 구분 버튼 스타일
  const getCategoryButtonStyle = (category) => ({
    backgroundColor: selectedCategories.includes(category) ? '#FFC9C9' : '#F0F0F0',
    color: 'black',
    border: 'none',
    fontSize: '20px',
    width: '110px',
    height: '40px',
    marginBottom: '10px',
    marginLeft: '100px',
    marginRight: '-78px',
  });

  // 건조별 버튼 스타일
  const getTypeButtonStyle = (type) => ({
    backgroundColor: selectedTypes.includes(type) ? '#FFC9C9' : '#F0F0F0',
    color: 'black',
    border: 'none',
    fontSize: '20px',
    width: '110px',
    height: '40px',
    marginBottom: '10px',
    marginLeft: '93px',
    marginRight: '-72px',
  });

  // 성분 버튼 스타일
  const getNutrientButtonStyle = (nutrient) => ({
    backgroundColor: selectedNutrients.includes(nutrient) ? '#FFC9C9' : '#F0F0F0',
    color: 'black',
    border: 'none',
    fontSize: '20px',
    width: '110px',
    height: '40px',
    marginBottom: '10px',
    marginLeft: '90px',
    marginRight: '-70px',
  });

  const strongStyle = {
    fontSize: '25px',
    marginLeft: '50px',
    padding: '5px'
  }

  // ---------------------------------------- 사료 추천 박스 --------------------------------------------------
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
const handleImageBoxMouseOver = (event) => {
  event.currentTarget.style.transform = 'scale(1.05)'; // 이미지 박스 확대
};

// 이미지 박스 마우스 아웃 효과 설정
const handleImageBoxMouseOut = (event) => {
  event.currentTarget.style.transform = 'scale(1)'; // 이미지 박스 원래 크기로 복원
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

  // 이미지 박스 클릭 시 각 사료의 상세페이지 이동
  const dummyFeeds = Array.from({ length: 214 }, (_, index) => ({
    id: index + 1,
    description: `사료 이름 ${index + 1}`,
    image: `건식${index + 1}.jpg`,
    nutrient: `브랜드명 ${index + 1}`, // 브랜드명 추가
  }));
  
  

  // 이미지 박스 클릭 시 각 사료의 상세페이지 이동
const imageBoxes = dummyFeeds.map((feed, index) => {
  const isDry = feed.id <= 181;
  const isWet = feed.id > 181;
  const isDrySelected = selectedTypes.includes('건식');
  const isWetSelected = selectedTypes.includes('습식');
  const brandName = feed.id <= 181 ? dryFoodData[feed.id - 1]?.브랜드명 : wetFoodData[feed.id - 182]?.브랜드명;
  const isOtherBrand = ['내추로','스텔라앤츄이스','RAWZ','NOW', 'ANF', '오리젠',  '뉴웨이브',  '내추럴발란스', '하림펫푸드', '아카나', '나인케어', 'GO', '지그니쳐', '퓨어비타', '아보덤', '시리우스', '아투', '힐스', '더마독', '인섹트도그', '마이펫닥터'].includes(brandName);

  if (
    (selectedTypes.length === 0 || (isDry && isDrySelected) || (isWet && isWetSelected))
    && (selectedNutrients.length === 0 || selectedNutrients.includes(brandName) || (selectedNutrients.includes('기타') && isOtherBrand))
  ) {
    return (
      <div key={feed.id} style={imageBoxStyle} onMouseOver={handleImageBoxMouseOver} onMouseOut={handleImageBoxMouseOut}>
        <Link to={`/ImageDetailFeed/${feed.id}`} style={linkStyle}>
          <div
            style={{
              backgroundImage: `url(${index < 181
                ? `건식사진/건식${feed.id}.jpg`
                : `건식사진/습식${feed.id - 181}.jpg`
              })`,
              backgroundSize: 'cover',
              width: '100%',
              height: '200px',
            }}
          ></div>
          {/* 사료 이름 표시 */}
          <p style={descriptionStyle}>
            {feed.id <= 181 ? dryFoodData[feed.id - 1]?.Column2 : wetFoodData[feed.id - 182]?.Column2}
          </p>
        </Link>
      </div>
    );
  } else {
    return null; // 선택되지 않은 유형의 사료는 표시하지 않습니다.
  }
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

      {/* 사료 정보 선택 div */}
      <div style={{ margin: '20px auto', width: '1200px', height: '330px', backgroundColor: 'white', marginBottom: '70px', borderRadius: '20px', padding: '60px 90px 40px 50px', textAlign: 'center', fontSize: '19px', fontWeight: 'bold', position: 'relative' }}>
        <div style={{ display: 'flex', marginBottom: '10px' }}>
          <strong style={strongStyle}>구 분</strong>
          {categories.map((category, index) => (
            <Button
              key={index}
              variant="light"
              style={getCategoryButtonStyle(category)}
              onClick={() => handleCategoryClick(category)}
            >
              {category}
            </Button>
          ))}
        </div>
        <div style={{ display: 'flex', marginBottom: '10px' }}>
          <strong style={strongStyle}>건조별</strong>
          {types.map((type, index) => (
            <Button
              key={index}
              variant="light"
              style={getTypeButtonStyle(type)}
              onClick={() => handleTypeClick(type)}
            >
              {type}
            </Button>
          ))}
        </div>
        <div style={{ display: 'flex' }}>
          <strong style={strongStyle}>브랜드</strong>
          {availableNutrients.map((nutrient, index) => (
            <Button
              key={index}
              variant="light"
              style={getNutrientButtonStyle(nutrient)}
              onClick={() => handleNutrientClick(nutrient)}
            >
              {nutrient}
            </Button>
          ))}
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
          <Button
            variant="light"
            style={resetButtonStyle}
            onClick={handleResetClick}
            onMouseOver={handleResetMouseOver}
            onMouseOut={handleResetMouseOut}
          >
            초기화
          </Button>
      
        </div>
        <strong style={{ color: 'black', fontSize: '25px', position: 'absolute', top: 'calc(100% + 20px)', left: '20px' }}>사료 추천</strong>
      </div>

      {/* 사료 추천 박스 컨테이너 */}
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

export default Feed;
export { dummyFeeds }; 