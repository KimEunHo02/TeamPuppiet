import React, { useState, useEffect } from 'react'
import Logo from './Logo'
import '../css/mypage.css'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import '../css/input.css'

import iconImage from '../icon/name.png'
import birthImage from '../icon/birthday.png'
import genderImage from '../icon/gender.png'

import manpf from '../profile/profile_man.png'
import womanpf from '../profile/profile_woman.png'

import { auth } from '../config/firebase';
import { db } from '../config/firebase';
import { getDoc, doc, collection, getDocs, updateDoc } from 'firebase/firestore'
import { onAuthStateChanged } from "firebase/auth";

// GenderSelection 컴포넌트 정의 (남, 여 선택 버튼)
const GenderSelection = ({ selectedGender, handleGenderButtonClick }) => {
  const [selected, setSelected] = useState(selectedGender);

  const handleButtonClick = (value) => {
    setSelected(value);
    handleGenderButtonClick(value);
  };
  return (
    <div className="d-flex align-items-center" style={{ marginTop: '20px' }}>
      <img src={genderImage} style={{ width: '20px', marginRight: '10px' }} alt="Icon" />
      <a style={{ marginLeft: '15px' }}>성별</a>
      <div className='custom-box'>
        <div className="custom-input-box" style={{ width: '450px', marginLeft: '-8px' }}>
          {/* "남성" 버튼 */}
          <Button
            variant={selected === "남성" ? 'primary' : 'light'}
            onClick={() => handleButtonClick("남성")}
            style={{
              width: '60px',
              height: '40px',
              margin: '-10px 50px',
              marginLeft: '42px',
              backgroundColor: selected === "남성" ? 'skyblue' : null,
              borderColor: selected === "남성" ? 'skyblue' : '#F0F0F0',
              color: selected === "남성" ? 'black' : null

            }}


          >
            남성
          </Button>
          {' '}
          {/* "여성" 버튼 */}
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
            여성
          </Button>
        </div>
      </div>
    </div>
  );
};

const Mypage = () => {
  const location = useLocation();
  const userData = location.state; // 추가 230815
  console.log('전달된 품종 데이터:', userData);

  // 흰색 박스
  const Box = {
    margin: '0 auto',
    width: '1200px',
    height: '600px',
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '0 30px 30px 30px'
  }

  const [data, setData] = useState({
    userName: '',
    userGender: '',
    userBirth: '',
    userWeight: '',
    userNeutered: '',
    userKind: '', // 이전에는 dogCate라는 이름으로 사용되던 값인데, 수정함
  });

  const [currentUser, setCurrentUser] = useState({});


  // 현재 유저 정보를 currentUser에 저장
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);

      console.log(user);
    });
  }, []);



  // user 데이터 가져오기
  // firebase에서 현재 유저의 이메일 가져오기
  const userId = currentUser.email;

  const getUsers = async () => {
    const docRef = doc(db, "users", String(userId));
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      setData(docSnap.data());
    } else {
      console.log("No such document!");
    }
  };
  
  useEffect(() => {
    if (currentUser.email) {
      getUsers();
    }
  }, [currentUser]); // currentUser 업데이트 시 getUsers() 호출

  // 마이페이지 2 이동
  const nav = useNavigate();
  const moveToMy2 = () => {
    nav('/mypage2', { state: data })
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  

  // 성별 선택 버튼 클릭 이벤트 핸들러
  const handleGenderButtonClick = (gender) => {
    setData({ ...data, gender: gender });
  };

  const getImagePath = () => {
    if (data.userGender === "남성") {
      return manpf;
    } else if (data.userGender === "여성") {
      return womanpf;
    } else {
      return null; // 기본 이미지 경로 또는 처리
    }
  };

  // 수정된 데이터 출력
  const handleSave = () => {
    console.log('저장된 데이터:', data);
    // 여기에 저장 또는 수정 로직을 추가할 수 있습니다.
  };

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

            <span className='title' style={{ cursor: 'pointer' }}>내 정보</span>
            <a onClick={moveToMy2} className='hideTitle'
              style={{ cursor: 'pointer' }}>강아지 정보</a>

          </div>
          {/* 링크 div 끝 */}

          <div style={{
            display: 'flex', flexDirection: 'row', justifyContent: 'center',
            marginTop: '20px'
          }}>

            {/* 이미지 */}
            <div style={{ marginLeft: '200px' }}>
              <img src={getImagePath()}
                style={{ width: '300px', height: '300px' }} alt='profile' />
            </div>
            {/* 정보 입력 */}
            <div style={{
              marginLeft: '100px', display: 'flex', flexDirection: 'column',
              marginTop: '50px'
            }}>

              {/* 이름 */}
              <Form.Group className="mb-3">
                <Form.Label></Form.Label>
                <div className="d-flex align-items-center">
                  <img src={iconImage} style={{ width: '20px', marginRight: '10px' }} alt="Icon" />
                  <a style={{ marginLeft: '15px' }}>이름</a>
                  <Form.Control
                    type="text"
                    name="name"
                    placeholder={data.userName}
                    onChange={handleChange}
                    style={{ width: '200px', marginLeft: '42px' }}
                  />
                </div>
              </Form.Group>

              {/* 생년월일 */}
              <Form.Label htmlFor="inputBirth"></Form.Label>
              <div className="d-flex align-items-center">
                <img src={birthImage} style={{ width: '20px', marginRight: '10px' }} alt="Icon" />
                <a style={{ marginLeft: '5px' }}>생년월일</a>
                <Form.Control
                  type="text"
                  name="birth"
                  placeholder={data.userBirth}
                  onChange={handleChange}
                  style={{ width: '200px', marginLeft: '29px', marginTop: '10px' }}
                />
              </div>

              {/* GenderSelection 컴포넌트 사용 / 남, 여 선택 */}
              <GenderSelection selectedGender={data.userGender} handleGenderButtonClick={handleGenderButtonClick} />
            </div>
          </div>
          {/* 수정하기 버튼 */}
          <div style={{ marginTop: '30px', display: 'flex', justifyContent: 'center' }}>
            <Button variant='primary' type='submit'
              style={{
                backgroundColor: '#FFC9C9', borderColor: '#FFC9C9', color: 'black',
                width: '160px', height: '50px', margin: '0 50px',
              }}
              onClick={handleSave}>
              수정하기
            </Button>

          </div>

        </div>
        {/* 하얀 박스 div 끝 */}
      </div>
      {/* 바탕화면 div 끝 */}
    </div>
  );
};

export default Mypage