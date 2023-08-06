import React, { useState } from 'react'
import Logo from './Logo'
import '../mypage.css'
import Form from 'react-bootstrap/Form';

import iconImage from '../icon/name.png'
import birthImage from '../icon/birthday.png'
import genderImage from '../icon/gender.png'
import weightImage from '../icon/weight.png'
import neuteredImage from '../icon/neutered.png'


const Mypage = () => {

  // 흰색 박스
  const Box = {
    margin: '0 auto',
    width: '1200px',
    height: '600px',
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '30px'
  }

  const [data, setData] = useState({
    name: '',
    birth: '',
    gender: '',
  });


  const handleChange = (e) => {
    const { name, value } = e.target;
    setData(prevData => ({
      ...prevData,
      [name]: value
    }));
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

        <a className='mypagetext'>마이페이지</a>

        {/* 하얀 박스 div */}
        <div style={{ ...Box }}>
          {/* a 태그 div */}
          <div className='atagtext'>
            <a style={{ marginRight: '100px' }}>내 정보</a>
            <a>강아지 정보</a>
          </div>
          {/* a div 끝 */}

          <div>

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
                  style={{ width: '200px', marginLeft: '20px' }} /> </div>
            </Form.Group>

            {/* 생년월일 */}

            <Form.Label htmlFor="inputBirth"></Form.Label>
            <div className="d-flex align-items-center">
              <img src={birthImage} style={{ width: '20px', marginRight: '10px' }} alt="Icon" />
              <a>생년월일</a>
              <Form.Control
                type="text" // 숫자만 입력 가능하도록 수정
                name="birth"
                value={data.birth}
                onChange={handleChange}
                style={{ width: '200px', marginLeft: '20px' }}
              /></div>

            <div className="d-flex align-items-center" style={{ marginTop: '10px' }}>
              <img src={genderImage} style={{ width: '20px', marginRight: '10px' }} alt="Icon" />
              <div className='custom-box'>
                <div className="custom-input-box" style={{ width: '450px' }}>
                  <input
                    type="radio"
                    name="gender"
                    value="남성"
                    checked={data.gender === "남성"}
                    onChange={handleChange}
                  />{' '}
                  남성
                  {' '}
                  <input
                    type="radio"
                    name="gender"
                    value="여성"
                    checked={data.gender === "여성"}
                    onChange={handleChange}
                  />{' '}
                  여성
                </div>
              </div>
            </div>

            <button onClick={() => console.log(data)}>저장</button>
          </div>
        </div>
        {/* 하얀 박스 div 끝 */}
      </div>
      {/* 바탕화면 div 끝 */}
    </div>
  )
}

export default Mypage