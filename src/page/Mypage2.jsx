import React, { useEffect, useState } from 'react'
import Logo from './Logo'
import '../css/mypage.css'
import Form from 'react-bootstrap/Form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import '../css/input.css'

import iconImage from '../icon/name.png'
import birthImage from '../icon/birthday.png'
import genderImage from '../icon/gender.png'
import dogimage from '../icon/dog_kind.png'
import weightImage from '../icon/weight.png'
import neuteredImage from '../icon/neutered.png'

import dog1pf from '../profile/profile_largedog.png'
import dog2pf from '../profile/profile_mediumdog.png'
import dog3pf from '../profile/profile_smalldog.png'

import firebase from 'firebase/app';
import 'firebase/auth';
import { auth, db } from '../config/firebase';
import 'firebase/firestore';

const jsonFilePath = '/강아지정보총합.json';


// GenderSelection 컴포넌트 정의 (남, 여 선택 버튼)
const GenderSelection = ({ selectedGender, handleGenderButtonClick }) => {
  const [selected, setSelected] = useState(selectedGender);

  const handleButtonClick = (value) => {
    setSelected(value);
    handleGenderButtonClick(value);
  };

  return (
    <div className="d-flex align-items-center" style={{ marginTop: '20px', marginBottom: '10px' }}>
      <img src={genderImage} style={{ width: '20px', marginRight: '10px', marginTop: '5px' }} alt="Icon" />
      <a style={{ marginTop: '5px', marginLeft: '20px' }}>성별</a>
      <div className='custom-box'>
        <div className="custom-input-box" style={{ width: '450px', marginLeft: '-16px' }}>
          {/* "수컷" 버튼 */}
          <Button
            variant={selected === "남성" ? 'primary' : 'light'}
            onClick={() => handleButtonClick("남성")}
            style={{
              width: '60px',
              height: '40px',
              margin: '-10px 50px',
              backgroundColor: selected === "남성" ? 'skyblue' : null,
              borderColor: selected === "남성" ? 'skyblue' : '#F0F0F0',
              color: selected === "남성" ? 'black' : null
            }}

          >
            수컷
          </Button>
          {' '}
          {/* "암컷" 버튼 */}
          <Button
            variant={selected === "여성" ? 'primary' : 'light'}
            onClick={() => handleButtonClick("여성")}
            style={{
              width: '60px',
              height: '40px',
              margin: '1px 50px auto -15px',
              backgroundColor: selected === "여성" ? '#FFC9C9' : null,
              borderColor: selected === "여성" ? '#FFC9C9' : '#F0F0F0',
              color: selected === "여성" ? 'black' : null
            }}

          >
            암컷
          </Button>
        </div>
      </div>
    </div>
  );
};

// 중성화 여부 선택 버튼
const NeuteredSelection = ({ selectedNeutered, handleNeuteredButtonClick }) => {

  const [selected, setSelected] = useState(selectedNeutered);

  const handleButtonClick = (value) => {
    setSelected(value);
    handleNeuteredButtonClick(value);
  };

  return (
    <div className="d-flex align-items-center" style={{ marginTop: '10px' }}>
      <img src={neuteredImage} style={{ width: '20px', marginTop: '19px' }} alt="Icon" />
      <div className='custom-box'>
        <div className="custom-input-box" style={{ width: '450px', marginTop: '10px' }}>
          <a style={{ marginTop: '10px', marginLeft: '15px' }}>중성화</a>
          <Button
            variant={selected === "O" ? 'primary' : 'light'}
            onClick={() => handleButtonClick("O")}
            style={{
              width: '60px',
              height: '40px',
              margin: '-10px 50px -10px 34px',
              backgroundColor: selected === "O" ? '#F6E781' : null,
              borderColor: selected === "O" ? '#F6E781' : '#F0F0F0',
              color: selected === "O" ? 'black' : null,
            }}
          >
            O
          </Button>

          <Button
            variant={selected === "X" ? 'primary' : 'light'}
            onClick={() => handleButtonClick("X")}
            style={{
              width: '60px',
              height: '40px',
              margin: '21px 50px 20px -15px',
              backgroundColor: selected === "X" ? '#F6E781' : null,
              borderColor: selected === "X" ? '#F6E781' : '#F0F0F0',
              color: selected === "X" ? 'black' : null,
            }}
          >
            X
          </Button>
        </div>
      </div>
    </div>
  );
};

// 마이페이지 개견 종류 정보
// 선택창
const Dogkind2 = ({ options, onSelect, dogCate, selectedDogkind }) => {
  const handleChange = (e) => {
    const selectedValue = e.target.value;
    const selectedOption = options.find(option => option.label === selectedValue);
    onSelect(selectedOption.label);
  };

  //let dogNm = "닥스훈트";

  console.log("Dogkind2:", selectedDogkind);

  return (
    <select
      className="dogkind-select2"
      //onChange={(e) => onSelect(e.target.value)} 
      onChange={handleChange}
    // value={dogCate}
    //defaultValue={selectedDogkind}
    >

      {options.map((option) => (
        <option key={option.value} value={option.label}
          selected={option.label === selectedDogkind ? true : false}>
          {option.label}
        </option>
      ))}
    </select>
  );
};



const Mypage2 = () => {
  const location = useLocation();
  const dogData = location.state; // 추가 230815
  console.log('전달된 품종 데이터:', dogData); // 확인용 출력 230815
  const Box = {
    margin: '0 auto',
    width: '1200px',
    height: '700px',
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '0 30px 30px 30px'
  }
  
  // 마이페이지 이동   
  const nav = useNavigate();
  const moveToMy1 = () => {
    nav('/mypage', { state: data })
  };
  // destory error 해결방법 230816 -----------------14:47 주석
  // const TestFunction = async() => {}

  // const userId = "사용자의 UID" // 사용자의 실제 UID로 변경
  // const breed = getBreedSelection(userId)
  // useEffect (()=> TestFunction(),[]);
  // console.log("사용자의 품종 선택 정보:", breed);

  // mypage2 컴포넌트 내에서 useEffect 등에서 품종 정보를 가져오고 사용
  //useEffect(async() => {
  // 사용자의 UID 가져오는 로직이 필요하면 추가

  // 품종 선택 정보 가져오기
  // const userId = "사용자의 UID"; // 사용자의 실제 UID로 변경
  // const breed = await getBreedSelection(userId);
  // console.log("사용자의 품종 선택 정보:", breed);
  // 가져온 품종 정보를 상태에 저장하거나 필요한 곳에 사용
  //}, []);
  // -------------------------------------------------------------------
  

  //const [data, setData] = useState([]); // 품종 데이터 옵션 ---- 230816 13:10 주석
  const [data, setData] = useState({
    dogName: '',
    dogGender: '',
    dogBirth: '',
    dogWeight: '',
    dogNeutered: '',
    dogKind: '', // 이전에는 dogCate라는 이름으로 사용되던 값인데, 수정함
  });

  // 품종 데이터 관련 상태
  const [breedsData, setBreedsData] = useState([]);
  const [dataOptions, setDataOptions] = useState([]);

  useEffect(() => {
    fetch(jsonFilePath)
      .then(response => response.json())
      .then(data => {
        setBreedsData(data);

        // 품종 데이터를 options 배열로 변환하여 데이터 옵션에 설정
        const options = data.map(breed => ({
          label: breed.품종,
          value: breed.품종,
        }));
        setDataOptions(options);
      })
      .catch(error => {
        console.error('Error fetching breeds data:', error);
      });
    //fetchUserData(); // 유저 데이터를 가져오는 비동기 함수 호출 및 데이터 설정 추가 230816 13:15
  }, []);

  const [userData, setUserData] = useState(null);

  // // 사용자 데이터를 가져오는 함수 ---- 주석 230816 13:56
  // const fetchUserData = async (userId) => {
  //     try {
  //     const userRef = db.collection('users').doc(userId);
  //     const userDoc = await userRef.get();
  //     if (userDoc.exists) {
  //         const userData = userDoc.data();
  //         setUserData(userData);
  //     } else {
  //         console.log('사용자 데이터가 존재하지 않습니다.');
  //     }
  //     } catch (error) {
  //     console.error('사용자 데이터 가져오기 실패:', error);
  //     }
  // };

  // userId는 실제 사용자의 UID로 변경해야 합니다.

  // 로그인한 사용자의 UID 가져오기
  //const userId = firebase.auth().currentUser?.uid;
  //const userId = auth().currentUser?.uid;
  const userId = auth.currentUser?.uid;
  

  useEffect(() => {
    if (userId) {
      // 사용자 데이터를 가져오는 함수
      const fetchUserData = async (userId) => {
        try {
          const userRef = db.collection('users').doc(userId);

          const userDoc = await userRef.get();
          if (userDoc.exists) {
            const userData = userDoc.data();
            setUserData(userData);
          } else {
            console.log('사용자 데이터가 존재하지 않습니다.');
          }
        } catch (error) {
          console.error('사용자 데이터 가져오기 실패:', error);
        }
      };
      // 사용자 데이터 가져오기
      fetchUserData(userId);
    }
  }, [userId]);


  // 개견 종류 선택 데이터


  // const dataOptions = [
  //     { label: '소형견', value: '소형견' },
  //     { label: '중형견', value: '중형견' },
  //     { label: '대형견', value: '대형견' },
  // ];

  // 수정된 데이터 출력   -------------------------handlesave ~ handlechange 주석 230816 13:23
  // const handleSave = () => {
  //     console.log('저장된 데이터:', data);
  //     console.log('견종:', selectedDogkind)
  //     // 여기에 저장 또는 수정 로직을 추가할 수 있습니다.
  // };
  // 이름, 생년월일, 몸무게 입력 이벤트 핸들러
  // const handleChange = (e) => {
  //     const { name, value } = e.target;
  //     setData(prevData => ({
  //         ...prevData,
  //         [name]: value
  //     }));
  // };

  // 개견 종류 데이터 분류

  const [selectedDogkind, setSelectedDogkind] = useState('');

  // 성별 선택 버튼 클릭 이벤트 핸들러
  const handleGenderButtonClick = (gender) => {
    setData(prevData => ({
      ...prevData,
      dogGender: gender,
    }));
  };

  // 중성화 여부 선택 버튼 클릭 이벤트 핸들러
  const handleNeuteredButtonClick = (neutered) => {
    setData(prevData => ({
      ...prevData,
      dogNeutered: neutered,
    }));
  };

  const handleDogkindSelect = (value) => {
    setData(prevData => ({
      ...prevData,
      dogKind: value,
    }));
  };

  // 이름, 생년월일, 몸무게 입력 이벤트 핸들러
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const Dogdata = useLocation().state
  
  const [dogCate, setDogCate] = useState('')
  useEffect(() => {
    let cate = ""
    for (let i = 0; i < breedsData.length; i++) {
      const searchCate = Object.keys(breedsData[i]).filter((key) => {
        return breedsData[i][key] === Dogdata.dogKind;
      });
      if (searchCate.length != 0) {
        cate = breedsData[i].cate
        setDogCate(cate)
      }
    }
  }, [breedsData])

  const getImagePath = () => {
    const selectedDogkind = Dogdata.dogKind;

    // breedsData에서 선택된 품종과 일치하는 데이터 찾기
    const selectedBreed = breedsData.find(breed => breed.품종 === selectedDogkind);

    if (selectedBreed) {
      const dogCate = selectedBreed.구분;

      if (dogCate === "소형견") {
        return dog3pf;
      } else if (dogCate === "중형견") {
        return dog2pf;
      } else if (dogCate === "대형견") {
        return dog1pf;
      }
    }

    return null; // 기본 이미지 경로 또는 처리
  };

  // 저장 버튼 클릭 이벤트 핸들러  -- 추가 230816 13:26
  const handleSave = () => {
    console.log('저장된 데이터:', data);
    db.collection('users').doc(userId).set(data)
    // 여기에 데이터 저장 또는 수정 로직 추가
  };
  // 마이페이지 이동  


  return (
    <div
      style={{ backgroundColor: '#F0F0F0' }}>
      <Logo />
      {/* 바탕화면 div */}
      <div style={{
        backgroundColor: '#F0F0F0', minHeight: '1000px',
        paddingTop: '80px'
      }}>

        <div style={{ backgroundColor: 'white', borderRadius: '20px 20px 0 0', width: '200px', height: '40px', marginLeft: '360px' }}>
          <a className='mypagetext' style={{ padding: '10px', marginLeft: '45px' }}>마이페이지</a>

        </div>

        {/* 하얀 박스 div */}
        <div style={{ ...Box }}>
          {/* 링크 태그 div */}

          <div style={{ display: 'flex', justifyContent: 'center' }}>

            {/* <Link to="/mypage" className='hideTitle'>내 정보</Link> */}
            <a onClick={moveToMy1} className='hideTitle' style={{ cursor: 'pointer' }}>내 정보</a>
            <span className='title' style={{ cursor: 'pointer' }}>강아지 정보</span>
          </div>
          {/* 링크 div 끝 */}

          <div style={{
            display: 'flex', flexDirection: 'row', justifyContent: 'center',
            marginTop: '50px'
          }}>

            {/* 이미지 */}
            <div style={{ marginLeft: '200px' }}>
              <img src={getImagePath(Dogdata.dogKind)}
                style={{ width: '300px', height: '300px' }} />
            </div>
            {/* 정보 입력 */}
            <div style={{
              marginBottom: '100px',
              marginLeft: '100px', display: 'flex', flexDirection: 'column',
            }}>

              {/* 이름 */}
              <Form.Group className="d-flex align-items-center">
                <Form.Label></Form.Label>
                <div className="d-flex align-items-center">
                  <img src={iconImage} style={{ width: '20px', marginRight: '10px' }} alt="Icon" />
                  <a style={{ marginLeft: '20px' }}>이름</a>
                  <Form.Control
                    type="text"
                    name="name"
                    placeholder={Dogdata.dogName}
                    onChange={handleChange}
                    style={{ width: '200px', marginLeft: '40px' }}
                  />
                </div>
              </Form.Group>

              {/* 견종 */}
              <Form.Group className="d-flex align-items-center" style={{ marginTop: '20px' }}>
                <Form.Label></Form.Label>
                <div className="d-flex align-items-center">
                  <img src={dogimage} style={{ width: '20px', marginRight: '10px', marginTop: '10px' }} alt="Icon" />
                  <a style={{ marginTop: '10px', marginLeft: '20px' }}>견종</a>
                  <div style={{ marginLeft: '42px' }}>
                    {/* <Dogkind2 options={dataOptions} dogCate={dogCate} onSelect={handleDogkindSelect} /> */}
                    {/* <Dogkind2 options={dataOptions} dogCate={dogCate} onSelect={handleDogkindSelect} selectedDogkind={selectedDogkind} /> */}
                    <Dogkind2 options={dataOptions} dogCate={dogCate} onSelect={handleDogkindSelect} selectedDogkind={dogData.dogKind} />
                  </div>
                </div>
              </Form.Group>

              {/* 성별 */}
              {/* 남, 여 선택 버튼 */}
              <GenderSelection selectedGender={Dogdata.dogGender} handleGenderButtonClick={handleGenderButtonClick} />

              {/* 생년월일 */}
              <Form.Label htmlFor="inputBirth"></Form.Label>
              <div className="d-flex align-items-center" style={{ marginBottom: '10px' }}>
                <img src={birthImage} style={{ width: '20px', marginTop: '10px', marginRight: '10px' }} alt="Icon" />
                <a style={{ marginTop: '10px', marginLeft: '8px' }}>생년월일</a>
                <Form.Control
                  type="text"
                  name="birth"
                  placeholder={Dogdata.dogBirth}
                  onChange={handleChange}
                  style={{ width: '200px', marginLeft: '30px', marginTop: '10px' }}
                /></div>

              {/* 몸무게 입력창 */}
              <Form.Label htmlFor="inputWeight"></Form.Label>
              <div className="d-flex align-items-center" style={{ display: 'flex' }}>
                <img src={weightImage} style={{ width: '20px', marginTop: '10px', marginRight: '10px' }} alt="Icon" />
                <a style={{ marginTop: '10px', marginLeft: '15px' }}>몸무게</a>
                <Form.Control
                  type="text" // 숫자만 입력 가능하도록 수정
                  placeholder={Dogdata.dogWeight}
                  // value={Dogdata.dogWeight}
                  name="weight"
                  onChange={handleChange}
                  style={{ width: '200px', marginLeft: '33px', marginTop: '10px' }}
                /></div>

              {/* 중성화 여부 선택 버튼 */}
              <NeuteredSelection selectedNeutered={Dogdata.dogNeutered} handleNeuteredButtonClick={handleNeuteredButtonClick} />
            </div>
          </div>

          {/* 수정하기 버튼 */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '100px' }}>
            <Button variant='primary' type='submit'
              style={{
                backgroundColor: '#FFC9C9', borderColor: '#FFC9C9', color: 'black',
                width: '160px', height: '50px', margin: '0 50px',
              }}
              // 수정했을 때 일단 console에 출력되게 구현
              // Server 연동 후 수정 필요
              onClick={handleSave}>
              수정하기
            </Button>

          </div>

        </div>
        {/* 하얀 박스 div 끝 */}
      </div>
      {/* 바탕화면 div 끝 */}
    </div>
  )
}

export default Mypage2