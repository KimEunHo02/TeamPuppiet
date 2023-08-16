import { useEffect, useState } from 'react';
import React, { PureComponent } from 'react';
import { useParams } from 'react-router-dom';
import Logo from './Logo';
import { dummyFeeds } from './Feed'; // Feed에서 dummyFeeds를 가져옵니다.
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


const getImageFilePath = (feedId) => {
  if (feedId <= 181) {
    return {
      imagePath: `${process.env.PUBLIC_URL}/건식사진/건식${feedId}.jpg`,
      nameData: `${process.env.PUBLIC_URL}/건식사료-성분.json`,
      descriptionData: `${process.env.PUBLIC_URL}/건식사료특징.json`,
    };
  } else {
    const wetFeedId = feedId - 181;
    return {
      imagePath: `${process.env.PUBLIC_URL}/습식사진/습식${wetFeedId}.jpg`,
      nameData: `${process.env.PUBLIC_URL}/습식사료-성분.json`,
      descriptionData: `${process.env.PUBLIC_URL}/습식사료특징.json`,
    };
  }
};


const ImageDetailFeed = () => {
  const { feedId } = useParams();
  const selectedFeed = dummyFeeds.find((feed) => feed.id === parseInt(feedId));

  const [selectedFeedName, setSelectedFeedName] = useState("");
  const [selectedFeedNutrition, setSelectedFeedNutrition] = useState({});
  const [selectedFeedDescription, setSelectedFeedDescription] = useState(""); // 추가된 부분

  const [feedDescriptions, setFeedDescriptions] = useState([]);



  const fetchFeedNameData = (dataUrl, targetId) => {
    const imageInfo = getImageFilePath(targetId); // imageInfo를 가져오기

    fetch(dataUrl)
      .then((response) => response.json())
      .then((data) => {
        const info = data.find((item) => item.Column1 === targetId);
        setSelectedFeedName(info ? info.사료명 : '사료 정보 없음');

        if (targetId > 181) {
          fetchFeedDescriptionData(imageInfo.descriptionData, targetId - 181);
        } else if (targetId <= 181 && info) {
          const descriptionDataUrl = `${process.env.PUBLIC_URL}/건식사료특징.json`;
          fetchFeedDescriptionData(descriptionDataUrl, targetId);
        } else {
          setSelectedFeedDescription('사료 설명 없음');
        }
      })
      .catch((error) => {
        console.error("Error fetching name data:", error);
        setSelectedFeedName("사료 정보 없음");
        setSelectedFeedDescription("사료 설명 없음");
      });
  };

  useEffect(() => {
    // 여기서 건식사료특징.json 파일을 가져와서 데이터를 설정합니다.
    fetch(`${process.env.PUBLIC_URL}/건식사료특징.json`)
      .then((response) => response.json())
      .then((data) => {
        setFeedDescriptions(data);
      })
      .catch((error) => {
        console.error("Error fetching description data:", error);
      });
  }, []);

  useEffect(() => {
    console.log("사료 ID에 대한 데이터 가져오는 중:", selectedFeed.id);

    // getImageFilePath 함수를 호출하여 imageInfo를 가져옴
    const imageInfo = getImageFilePath(selectedFeed.id);


    // if 문으로 imageInfo가 정의되어 있는지 체크하고 데이터를 가져오는 함수 호출
    if (imageInfo.nameData) {
      fetchFeedNameData(imageInfo.nameData, selectedFeed.id);
      if (selectedFeed.id <= 181) {
        const dryDataUrl = `${process.env.PUBLIC_URL}/건식사료-성분.json`;
        fetchFeedData(dryDataUrl, selectedFeed.id);

        // fetchFeedDescriptionData를 호출하도록 수정
        fetchFeedDescriptionData(imageInfo.descriptionData, selectedFeed.id);
      } else {
        const wetDataUrl = `${process.env.PUBLIC_URL}/습식사료-성분.json`;
        fetchFeedData(wetDataUrl, selectedFeed.id - 181);

        // fetchFeedDescriptionData를 호출하도록 수정
        fetchFeedDescriptionData(imageInfo.descriptionData, selectedFeed.id - 181);
      }
    } else {
      setSelectedFeedName('사료 정보 없음');
      setSelectedFeedDescription('사료 설명 없음');
      setSelectedFeedNutrition({});
    }
  }, [selectedFeed.id]);



  const fetchFeedData = (dataUrl, targetId) => {
    fetch(dataUrl)
      .then((response) => response.json())
      .then((data) => {
        const feedInfo = data.find((item) => item.Column1 === targetId);
        setSelectedFeedNutrition(feedInfo || {});
        setSelectedFeedName(feedInfo ? feedInfo.Column2 : '사료 정보 없음');
        setSelectedFeedDescription(feedInfo ? feedInfo.Column3 : '사료 설명 없음'); // 설명 업데이트
      })
      .catch((error) => {
        console.error("데이터 가져오기 오류:", error);
        setSelectedFeedNutrition({});
        setSelectedFeedName("사료 정보 없음");
        setSelectedFeedDescription("사료 설명 없음"); // 오류 발생 시 설명 설정
      });
  };

  const fetchFeedDescriptionData = (dataUrl, targetId) => {
    fetch(dataUrl)
      .then((response) => response.json())
      .then((data) => {
        const descriptionData = data.find(
          (item) => item.Column1 === targetId
        );
        if (descriptionData) {
          const description = `${descriptionData.Column3 || ''}\n${descriptionData.Column4 || ''}\n${descriptionData.Column5 || ''}\n${descriptionData.Column6 || ''}`;
          setSelectedFeedDescription(description);
        } else {
          setSelectedFeedDescription("사료 설명 없음");
        }
      })
      .catch((error) => {
        console.error("Error fetching description data:", error);
        setSelectedFeedDescription("사료 설명 없음");
      });
  };

  // 성분 차트
  const [data, setData] = useState([]);

  useEffect(() => {
    setData([
      {
        name: '조지방',
        퍼센트: selectedFeedNutrition["조지방(%)"],
      },
      {
        name: '조섬유',
        퍼센트: selectedFeedNutrition["조섬유(%)"],
      },
      {
        name: '조회분',
        퍼센트: selectedFeedNutrition["조회분(%)"],
      },
      {
        name: '인',
        퍼센트: selectedFeedNutrition["인(%)"],
      },
      {
        name: '칼슘',
        퍼센트: selectedFeedNutrition["칼슘(%)"],
      },
      {
        name: '수분',
        퍼센트: selectedFeedNutrition["수분(%)"],
      },
    ]);
  }, [selectedFeedNutrition]);


  return (
    <div>
      <Logo />

      {/* 사료 담을 div */}
      <div style={{ display: 'flex', justifyContent: 'center', margin: '30px auto', width: '1200px', backgroundColor: 'white', marginBottom: '50px', borderRadius: '20px', padding: '20px', fontSize: '19px', fontWeight: 'bold', position: 'relative', border: 'solid #FFC9C9 7px' }}>

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
            <h3 style={{ width: '550px', margin: 'auto', marginBottom: '10px', fontSize: '25px' }}>{selectedFeedName}</h3><br />
          </div>
        </div>

        {/* 세로 선 */}
        <div style={{ width: '2px', backgroundColor: '#FFC9C9' }}></div>


        {/* 오른쪽 텍스트 넣을 div */}
        <div style={{ flex: 1, backgroundColor: 'white', padding: '20px', paddingTop: '50px', fontSize: '19px', fontWeight: 'bold', textAlign: 'center' }}>

          {/* 텍스트 내용 */}

          {/* 사료 설명 */}
          <div style={{ marginBottom: '50px', backgroundColor: 'white', marginLeft: '15px' }}>
            {/* selectedFeedDescription이 정의되어 있을 때만 split 메서드 호출 */}
            {selectedFeedDescription && selectedFeedDescription.split('\n').map((item, index) => (
              <p key={index}>{item}</p>
            ))}
          </div>

          {/* 차트 */}
          <ResponsiveContainer width="100%" height={400}>
            <LineChart
              width={500}
              height={300}
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="퍼센트" stroke="#0404B4" strokeWidth={2} activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
          {/* 차트 끝 */}

        </div>
      </div>
    </div>
  );
};

export default ImageDetailFeed;
