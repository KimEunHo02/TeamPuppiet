import React, { useState } from 'react';
import picSrc from '../img/PUPPIET_logo.png';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const Signup = () => {
  // 박스1 스타일 정의
  const box1 = {
    border: '3px solid #cccccc',
    borderRadius: '10px',
    margin: '0 auto',
    padding: '20px',
    textAlign: 'justify',
    fontSize: '19px'
  }

  // 폼 데이터 상태 초기값 설정
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    name: '',
    birth: '', // 초기값으로 빈 문자열 설정
    gender: '',
  });

  // 폼 입력값 변경 시 호출되는 핸들러
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // 비밀번호 확인 체크 핸들러
  const [isPasswordMatch, setIsPasswordMatch] = useState(true);

  const handleConfirmPasswordChange = (event) => {
    const { value } = event.target;
    setIsPasswordMatch(formData.password === value);
  };

  // 폼 유효성 검사 함수
  const isFormValid = () => {
    const idPattern = /^[a-zA-Z0-9@._+-]*$/;
    const passwordPattern = /^[a-zA-Z0-9@._+-]{8,15}$/;
    const namePattern = /^[가-힣a-zA-Z\s]+$/;

    return (
      idPattern.test(formData.username) &&
      passwordPattern.test(formData.password) &&
      formData.password === formData.confirmPassword &&
      namePattern.test(formData.name) &&
      formData.gender !== '' &&
      formData.birth.length === 8 // 생년월일이 8자리여야 유효하도록 추가
    );
  };

  // 폼 제출 시 호출되는 함수
  const handleSubmit = (event) => {
    event.preventDefault();

    if (isFormValid()) {
      console.log('회원가입 폼 데이터:', formData);
      // 여기에 회원가입 로직을 추가할 수 있습니다.
    } else {
      alert('입력값이 유효하지 않습니다. 모든 필드를 올바르게 입력해주세요.');
    }
  };

  // 입력값 유효성 검사 함수
  const validateInput = (value, type) => {
    // 정규표현식을 사용하여 입력값 제어
    const idPattern = /^[a-zA-Z0-9@._+-]*$/;
    const passwordPattern = /^[a-zA-Z0-9@._+-]{8,15}$/;

    switch (type) {
      case 'username':
        return idPattern.test(value);
      case 'password':
        return passwordPattern.test(value);
      default:
        return true;
    }
  };

  return (
    <div>
      {/* 이미지 */}
      <Link to='/'>
        <img
          className='logo'
          style={{
            display: 'block', /* img 태그를 블록 수준 요소로 변경 */
            margin: '0 auto', /* 가로 방향으로 가운데 정렬 */
            width: '200px'
          }}
          src={picSrc}
          alt="PUPPIET Logo"
        />
      </Link>



      {/* 가장 바깥 박스 */}
      <div style={box1}>
        {/* 아이디, 비밀번호 박스 */}
        <div style={box1}>
          <Form onSubmit={handleSubmit}>
            {/* 아이디 입력창 */}
            <div>
              <Form.Group className="mb-3" controlId="formBasicID">
                <Form.Label></Form.Label>
                <Form.Control
                  type="text"
                  placeholder="아이디"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  isInvalid={!validateInput(formData.username, 'username')}
                />
                <Form.Control.Feedback type="invalid">
                  영문, 숫자, 특수기호(+. @, ., _, -)만 입력 가능합니다.
                </Form.Control.Feedback>
                <Button variant="secondary">중복확인</Button> {/* 중복확인 버튼 */}
              </Form.Group>
            </div>

            {/* 비밀번호 입력창 */}
            <div>
              <Form.Label htmlFor="inputPassword5"></Form.Label>
              <Form.Control
                type="password"
                id="inputPassword5"
                aria-describedby="passwordHelpBlock"
                placeholder="비밀번호"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                isInvalid={!validateInput(formData.password, 'password')}
              />
              <Form.Control.Feedback type="invalid">
                영문 + 숫자 + 특수기호(+. @, ., _, -) 8 ~ 15자리 조합으로 입력해 주세요.
              </Form.Control.Feedback>
            </div>

            {/* 비밀번호 재입력창 */}
            <div>
              <Form.Label htmlFor="inputPassword5"></Form.Label>
              <Form.Control
                type="password"
                id="inputPassword5"
                aria-describedby="passwordHelpBlock"
                placeholder="비밀번호 확인"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleConfirmPasswordChange}
              />
              {!isPasswordMatch && <Form.Text id="passwordHelpBlock" style={{ color: 'pink' }}>입력하신 비밀번호가 맞지 않습니다. 확인 후 다시 입력해 주세요.</Form.Text>}
            </div>
          </Form>
        </div>
        {/* ------------------------------------------------------------- */}

        {/* 이름, 생년월일 박스 */}
        <div style={box1}>
          {/* 이름 입력창 */}
          <Form.Group className="mb-3" controlId="formBasicID">
            <Form.Label></Form.Label>
            <Form.Control
              type="text"
              placeholder="이름"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
          </Form.Group>

          {/* 생년월일 입력창 */}
          <Form.Group className="mb-3" controlId="formBasicbirth">
            <Form.Label></Form.Label>
            <Form.Control
              type="text"
              placeholder="생년월일 8자리 숫자로 입력해 주세요"
              name="birth"
              value={formData.birth}
              onChange={handleInputChange}
              isInvalid={!formData.birth.match(/^\d{8}$/)} // 생년월일이 8자리 숫자가 아니면 유효하지 않음
            />
            <Form.Control.Feedback type="invalid">
              생년월일은 8자리 숫자로 입력해 주세요.
            </Form.Control.Feedback>
          </Form.Group>
        </div>
        {/* ------------------------------------------------------------- */}

        {/* 성별 박스 */}
        <div style={box1}>
          {/* 성별 입력 */}
          <div>
            <input
              type="radio"
              name="gender"
              value="남성"
              onChange={handleInputChange}
            />{' '}
            남성
            {' '}
            <input
              type="radio"
              name="gender"
              value="여성"
              onChange={handleInputChange}
            />{' '}
            여성
          </div>
        </div>

        {/* ------------------------------------------------------------- */}

        {/* 회원가입 버튼 클릭 시 반려견 정보 페이지로 이동 */}
        <Link to='/petinfo'>
          <Button variant="outline-dark">다음</Button>
        </Link>
      </div>
    </div>
  );
};

export default Signup;
