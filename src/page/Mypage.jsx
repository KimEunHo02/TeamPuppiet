import React, { useState } from 'react'
import Logo from './Logo'
import '../mypage.css'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

import iconImage from '../icon/name.png'
import birthImage from '../icon/birthday.png'
import genderImage from '../icon/gender.png'

import manpf from '../profile/profile_man.png'
import womanpf from '../profile/profile_woman.png'

// GenderSelection 컴포넌트 정의 (남, 여 선택 버튼)
const GenderSelection = ({ selectedGender, handleGenderButtonClick }) => {
  return (
    <div className="d-flex align-items-center" style={{ marginTop: '20px' }}>
      <img src={genderImage} style={{ width: '20px', marginRight: '10px' }} alt="Icon" />
      성별
      <div className='custom-box'>
        <div className="custom-input-box" style={{ width: '450px', marginLeft: '-8px'}}>
          {/* "남성" 버튼 */}
          <Button
            variant={selectedGender === "남성" ? 'primary' : 'light'}
            style={{
              backgroundColor: selectedGender === "남성" ? 'skyblue' : '#F0F0F0',
              borderColor: selectedGender === "남성" ? 'skyblue' : '#F0F0F0',
              color: 'black',
              width: '60px',
              height: '40px',
              margin: '-10px 50px',
            }}
            onClick={() => handleGenderButtonClick("남성")}
          >
            남성
          </Button>
          {' '}
          {/* "여성" 버튼 */}
          <Button
            variant={selectedGender === "여성" ? 'primary' : 'light'}
            style={{
              backgroundColor: selectedGender === "여성" ? '#FFC9C9' : '#F0F0F0',
              borderColor: selectedGender === "여성" ? '#FFC9C9' : '#F0F0F0',
              color: 'black',
              width: '60px',
              height: '40px',
              margin: '1px 50px auto -15px',
            }}
            onClick={() => handleGenderButtonClick("여성")}
          >
            여성
          </Button>
        </div>
      </div>
    </div>
  );
};

const Mypage = () => {

  // 흰색 박스
  const Box = {
    margin: '0 auto',
    width: '1200px',
    height: '600px',
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '0 30px 30px 30px'
  }

  // Signup 페이지에서 담긴 데이터
  const [data, setData] = useState({
    name: '',
    birth: '',
    gender: '여성',
  });


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
    if (data.gender === "남성") {
      return manpf;
    } else if (data.gender === "여성") {
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
        <div style={{backgroundColor:'white', borderRadius:'20px 20px 0 0', width:'200px', height:'40px', marginLeft: '360px'}}>
          <a className='mypagetext' style={{padding:'10px'}}>마이페이지</a>

        </div>

        {/* 하얀 박스 div */}
        <div style={{ ...Box }}>

          {/* 링크 태그 div */}

          <div style={{ display: 'flex', justifyContent: 'center' }}>

            <span className='title'>내 정보</span>
            <Link to="/mypage2" className='hideTitle'>강아지 정보</Link>

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
                  <a>이름</a>
                  <Form.Control
                    type="text"
                    name="name"
                    value={data.name}
                    onChange={handleChange}
                    style={{ width: '200px', marginLeft: '52px' }}
                  />
                </div>
              </Form.Group>

              {/* 생년월일 */}
              <Form.Label htmlFor="inputBirth"></Form.Label>
              <div className="d-flex align-items-center">
                <img src={birthImage} style={{ width: '20px', marginRight: '10px' }} alt="Icon" />
                <a>생년월일</a>
                <Form.Control
                  type="text"
                  name="birth"
                  value={data.birth}
                  onChange={handleChange}
                  style={{ width: '200px', marginLeft: '20px', marginTop: '10px' }}
                />
              </div>

              {/* GenderSelection 컴포넌트 사용 / 남, 여 선택 */}
              <GenderSelection selectedGender={data.gender} handleGenderButtonClick={handleGenderButtonClick} />
            </div>
          </div>
          {/* 수정하기 버튼 */}
          <div style={{ marginTop: '30px', display: 'flex', justifyContent: 'center' }}>
            <Button variant='primary' type='submit'
              style={{
                backgroundColor: '#FFC9C9', borderColor: '#FFC9C9',  color: 'black',
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

export default Mypage