import React, { useState } from 'react';
import picSrc from '../img/PUPPIET_logo.png';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
// import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../css/input.css';

import iconImage from '../icon/name.png'
import pwImage from '../icon/password.png'
import birthImage from '../icon/birthday.png'
import genderImage from '../icon/gender.png'


import './Signup.css';

// firebase 회원가입 - 정희석
import { auth, createUserWithEmailAndPassword } from "../config/firebase";


// `회원가입` 버튼의 onClick에 할당

// 유민 추가 0817
import Modal from 'react-bootstrap/Modal'; // 모달을 사용하기 위해 추가
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";

// Firebase 연동 코드 추가
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyC6Tx6JUBz4zqGNIBG-P_4ovjG29vt8Io0",
  authDomain: "puppiet.firebaseapp.com",
  projectId: "puppiet",
  storageBucket: "puppiet.appspot.com",
  messagingSenderId: "6767777206",
  appId: "1:6767777206:web:335d5cb3896564ccc35d17",
  measurementId: "G-WJF95GGBHF"
};

// Firebase 앱 초기화
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);



// GenderSelection 컴포넌트 정의 (남, 여 선택 버튼)
const GenderSelection = ({ selectedGender, handleGenderButtonClick }) => {

  return (
    <div className="d-flex align-items-center" style={{ marginTop: '10px' }}>
      <img src={genderImage} style={{ width: '20px', marginRight: '10px' }} alt="Icon" />
      <p style={{ marginTop: '15px', marginLeft: '12px' }}>성별</p>
      <div className='custom-box'>
        <div className="custom-input-box d-flex" style={{ width: '250px', marginLeft: '100px', display: 'flex' }}>
          {/* "남성" 버튼 */}
          <Button
            variant={selectedGender === "남성" ? 'primary' : 'light'}
            style={{
              backgroundColor: selectedGender === "남성" ? 'skyblue' : '#F0F0F0',
              borderColor: selectedGender === "남성" ? 'skyblue' : '#F0F0F0',
              color: 'black',
              width: '60px',
              height: '40px',
              marginRight: '10px', // 간격을 조절하여 가로로 나열
              marginLeft: '12px'
            }}
            onClick={() => handleGenderButtonClick("남성")}
          >
            남성
          </Button>
          {/* "여성" 버튼 */}
          <Button
            variant={selectedGender === "여성" ? 'primary' : 'light'}
            style={{
              backgroundColor: selectedGender === "여성" ? '#FFC9C9' : '#F0F0F0',
              borderColor: selectedGender === "여성" ? '#FFC9C9' : '#F0F0F0',
              color: 'black',
              width: '60px',
              height: '40px',
              marginRight: '10px', // 간격을 조절하여 가로로 나열
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


const Signup = () => {

  const nav = useNavigate()

  // 중복확인 모달 창 상태
  const [showModal, setShowModal] = useState(false);
  const [isUsernameDuplicate, setIsUsernameDuplicate] = useState(false);


  // 중복확인 버튼 클릭 시 호출되는 함수
  const handleCheckUsernameDuplicate = async () => {
    const usernameToCheck = formData.username;

    if (usernameToCheck === '') {
      setIsUsernameDuplicate(false); // 사용 가능한 아이디로 설정
      return;
    }

    try {
    const userCollection = collection(db, 'users');

    const q = query(userCollection, where("userEmail", "==", usernameToCheck));
    const querySnapshot = await getDocs(q);

    const isDuplicate = !querySnapshot.empty;

    setIsUsernameDuplicate(isDuplicate);
  } catch (error) {
    console.error('Error checking username duplicate:', error);
  }

  setShowModal(true);
};

  // 모달 닫기 버튼 클릭 시 호출되는 함수
  const handleCloseModal = () => {
    setShowModal(false);
  };

  // 박스1 스타일 정의
  const box1 = {
    margin: '0 auto',
    padding: '20px',
    width: '600px',
    backgroundColor: 'white',
    marginBottom: '100px',
    borderRadius: '20px',
  }

  // 폼 데이터 상태 초기값 설정
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    name: '',
    birth: '',
  });

  // 폼 입력값 변경 시 호출되는 핸들러
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));

    // 입력값이 있을 때만 비밀번호 오류 상태를 변경
    if (name === 'password') {
      setIsPasswordInvalid(!validateInput(value, 'password'));
    }

    // 아이디, 비밀번호, 이름, 생년월일에 대한 오류 메시지 상태
    let idErrorMessage = '';
    let passwordErrorMessage = '';
    let nameErrorMessage = '';
    let birthErrorMessage = '';

    if (name === 'username') {
      idErrorMessage = value === '' ? '이메일을 입력해 주세요.' : '';
    } else if (name === 'password') {
      passwordErrorMessage = value === '' ? '비밀번호를 입력해 주세요.' : '';
      setIsPasswordInvalid(!validateInput(value, 'password'));
    } else if (name === 'name') {
      nameErrorMessage = value === '' ? '이름을 입력해 주세요.' : '';
      setIsPasswordInvalid(!validateInput(value, 'name'));
    } else if (name === 'birth') {
      birthErrorMessage = value === '' ? '생년월일을 입력해 주세요.' : '';
      setIsPasswordInvalid(!validateInput(value, 'birth'));
    }

    // 오류 메시지 상태 업데이트
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
      idErrorMessage,
      passwordErrorMessage,
      nameErrorMessage,
      birthErrorMessage,
    }));
  };

  // 비밀번호 확인 체크 핸들러
  const [isPasswordMatch, setIsPasswordMatch] = useState(true);

  // 비밀번호 오류 여부를 상태로 저장
  const [isPasswordInvalid, setIsPasswordInvalid] = useState(false);

  // 비밀번호 확인 체크 핸들러
  const handleConfirmPasswordChange = (event) => {
    const { value } = event.target;
    setFormData((prevData) => ({ ...prevData, confirmPassword: value })); // 입력된 값으로 confirmPassword 업데이트
    setIsPasswordMatch(value === formData.password);
  };

  // 폼 유효성 검사 함수
  const isFormValid = () => {
    const idPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordPattern = /^[a-zA-Z0-9@._+-]{8,15}$/;
    const namePattern = /^[가-힣a-zA-Z\s]+$/;

    return (
      idPattern.test(formData.username) &&
      passwordPattern.test(formData.password) &&
      formData.password === formData.confirmPassword &&
      namePattern.test(formData.name) &&
      // formData.gender !== '' &&
      isBirthValid(formData.birth)
    );
  };

  // 생년월일 유효성 검사 함수
  const isBirthValid = (value) => {
    const birthPattern = /^\d{8}$/;
    return birthPattern.test(value);
  };

  // 폼 제출 시 호출되는 함수
  const handleSubmit = async (event) => {
    event.preventDefault();

    // 생년월일 유효성 검사
    if (!isBirthValid(formData.birth)) {
      alert('생년월일은 8자리 숫자로 입력해주세요.');
      return;
    }

    if (isFormValid()) {
      console.log('회원가입 폼 데이터:', formData);
      try {
        const createdUser = await createUserWithEmailAndPassword(
          auth,
          formData.username,
          formData.password
        );
        console.log(createdUser);
        // 회원가입 성공 후 품종 선택 정보 저장 -- 추가 230815
        //await saveBreedSelection(createdUser.user.uid, selectedBreed);

        sessionStorage.setItem('userId', createdUser.user.email);
        nav('/petinfo', { state: formData });
      } catch (err) {
        console.log(err.code);
      }
    } else {
      alert('입력값이 유효하지 않습니다. 모든 필드를 올바르게 입력해주세요.');
    }
  };

  const isNextButtonEnabled = isFormValid() && (!formData.birth || isBirthValid(formData.birth));


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

  // 성별 선택 버튼 클릭 이벤트 핸들러
  const handleGenderButtonClick = (gender) => {
    setData((prevData) => ({
      ...prevData,
      gender: gender,
    }));
  };

  // Signup 페이지에서 담긴 데이터
  const [data, setData] = useState({
    gender: '',
  });

  // 유효성 검사 콘솔출력 해보기
  console.log('isFormValid:', isFormValid());
  console.log('isBirthValid:', isBirthValid(formData.birth));
  console.log('isNextButtonEnabled:', isNextButtonEnabled);


  const [isResetActive, setIsResetActive] = useState(false); // 닫기 버튼 활성화 상태 관리

  // 닫기 버튼 스타일
  const closeButtonStyle = {
    backgroundColor: isResetActive ? '#FFC9C9' : '#F0F0F0',
    color: 'black',
    fontSize: '18px',
    border: 'none', // 기본 테두리 제거
    boxShadow: 'none', // 기본 박스 쉐도우 제거
    outline: 'none', // 포커스 테두리 제거
};

  // 닫기 버튼 마우스 오버 이벤트 핸들러
  const handleResetMouseOver = () => {
    if (!isResetActive) {
        setIsResetActive(true);
    }
};

// 닫기 버튼 마우스 아웃 이벤트 핸들러
const handleResetMouseOut = () => {
    if (isResetActive) {
        setIsResetActive(false);
    }
};
  return (
    <div>

      <div style={{ marginTop: '25px' }}>
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
      </div>

      {/* 가장 바깥 박스 */}
      <div style={{ ...box1, marginTop: '40px' }}>
        <div style={{ backgroundColor: 'white' }}>
          <div style={{ margin: '30px' }}>


            {/* 회원가입 폼 */}
            <Form onSubmit={handleSubmit}>

              {/* 아이디 입력창 */}
              {/* 이메일로 변경해야함 */}
              <Form.Group controlId="formBasicID">
                <Form.Label></Form.Label>
                <div className="d-flex align-items-center" style={{ display: 'flex' }}>
                  <img src={iconImage} style={{ width: '20px', marginRight: '10px' }} alt="Icon" />
                  <Form.Control
                    type="text"
                    placeholder="ex) example@email.com"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    isInvalid={!validateInput(formData.username, 'username')}
                    style={{ width: '350px' }}
                  />
                  {/* 중복확인 버튼 */}
                  <Button variant='primary' style={{
                    marginLeft: '20px', backgroundColor: '#FFC9C9',
                    borderColor: '#FFC9C9', color: 'black', width: '110px'
                  }}
                    onClick={handleCheckUsernameDuplicate} // 중복확인 버튼 클릭 시 함수 호출
                  >
                    중복 확인
                  </Button>

                  {/* 중복 확인 모달 */}
                  <Modal show={showModal} onHide={handleCloseModal}>
                    <Modal.Header closeButton>
                      <Modal.Title>PUPPIET🐾</Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{fontSize: '18px'}}>
                      {isUsernameDuplicate ? (
                        <p>사용 불가능한 아이디입니다. 다시 입력해 주세요.</p>
                      ) : (
                        <p>사용 가능한 아이디입니다.</p>
                      )}
                    </Modal.Body>
                    <Modal.Footer>
                      <Button variant="secondary" 
                      onClick={handleCloseModal}
                      style={closeButtonStyle}
                      onMouseOver={handleResetMouseOver}
                      onMouseOut={handleResetMouseOut}>
                        닫기
                      </Button>
                    </Modal.Footer>
                  </Modal>


                </div>
              </Form.Group>
              {formData.username && !validateInput(formData.username, 'username') && (
                <div
                  className="error-message"
                  style={{
                    fontSize: '14px',
                    color: 'red',
                    marginLeft: '-250px',
                    marginTop: '2.7px',
                  }}
                >
                  올바른 이메일 형식으로 입력해 주세요.
                </div>
              )}
              {formData.idErrorMessage && (
                <Form.Text className="error-message">{formData.idErrorMessage}</Form.Text>
              )}


              {/* --------------------------------------------------------------------------------- */}

              {/* 비밀번호 입력창 */}
              <div>
                <Form.Label htmlFor="inputPassword5"></Form.Label>
                <div className="d-flex align-items-center" style={{ display: 'flex' }}>
                  <img src={pwImage} style={{ width: '20px', marginRight: '10px' }} alt="Icon" />
                  <Form.Control
                    type="password"
                    id="inputPassword5"
                    aria-describedby="passwordHelpBlock"
                    placeholder="비밀번호"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    isInvalid={isPasswordInvalid} // 오류 메시지 표시 여부
                  />
                </div>
                {formData.passwordErrorMessage && <Form.Text id="passwordHelpBlock" className="error-message">{formData.passwordErrorMessage}</Form.Text>}

                {formData.password && (
                  <div
                    className="error-message"
                    style={{
                      fontSize: '14px',
                      color: 'red',
                      marginLeft: '-90px',
                      marginTop: '2.7px',
                    }}
                  >
                    {!validateInput(formData.password, 'password') && (
                      '8~15자리의 영문, 숫자, 특수기호(+. @, ., _, -)만 입력 가능합니다.'
                    )}
                  </div>
                )}
              </div>

              {/* ------------------------------------------------------------------ */}

              {/* 비밀번호 재입력창 */}
              <Form.Label htmlFor="inputPassword5"></Form.Label>
              <div className="d-flex align-items-center" style={{ display: 'flex' }}>
                <img src={pwImage} style={{ width: '20px', marginRight: '10px' }} alt="Icon" />
                <Form.Control
                  type="password"
                  id="inputPassword5"
                  aria-describedby="passwordHelpBlock"
                  placeholder="비밀번호 확인"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleConfirmPasswordChange} // handleConfirmPasswordChange 함수를 여기서 사용
                  isInvalid={!isPasswordMatch} // 오류 메시지 표시 여부
                /></div>
              {!isPasswordMatch && <Form.Text id="passwordHelpBlock" className="error-message">입력하신 비밀번호가 맞지 않습니다. 확인 후 다시 입력해 주세요.</Form.Text>}

              {/* ------------------------------------------------------------------ */}

              {/* 이름 입력창 */}
              <Form.Group controlId="formBasicID">
                <Form.Label></Form.Label>
                <div className="d-flex align-items-center" style={{ display: 'flex' }}>
                  <img src={iconImage} style={{ width: '20px', marginRight: '10px' }} alt="Icon" />
                  <Form.Control
                    type="text"
                    placeholder="이름"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                  /></div>
                {formData.nameErrorMessage && <Form.Text className="error-message">{formData.nameErrorMessage}</Form.Text>}
              </Form.Group>

              {/* ------------------------------------------------------------------ */}

              {/* 생년월일 입력창 */}
              <Form.Label htmlFor="inputBirth"></Form.Label>
              <div className="d-flex align-items-center" style={{ display: 'flex' }}>
                <img src={birthImage} style={{ width: '20px', marginRight: '10px' }} alt="Icon" />
                <Form.Control
                  type="text" // 숫자만 입력 가능하도록 수정
                  id="inputBirth"
                  placeholder="생년월일 8자리 ex) 19990101"
                  name="birth"
                  value={formData.birth}
                  onChange={handleInputChange}
                  isInvalid={!isBirthValid(formData.birth) && formData.birth !== ''} // 숫자 8자리가 아니거나 빈 값인 경우 오류 메시지 표시
                /></div>
              {!isBirthValid(formData.birth) && formData.birth !== '' && (
                <Form.Text className="error-message">생년월일은 8자리 숫자로 입력해주세요.</Form.Text>
              )}
              {formData.birthErrorMessage && <Form.Text className="error-message">{formData.birthErrorMessage}</Form.Text>}

              {/* ------------------------------------------------------------------ */}

              {/* 성별 입력 */}
              {/* GenderSelection 컴포넌트 사용 / 남, 여 선택 */}
              <GenderSelection selectedGender={data.gender} handleGenderButtonClick={handleGenderButtonClick} />
            </Form>

            {/* 회원가입 버튼 클릭 시 반려견 정보 페이지로 이동 */}

            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
              <Button variant="outline-dark"
                disabled={!isNextButtonEnabled} onClick={handleSubmit}  // onClick={() => { register(); } -- 원래코드
                style={{
                  backgroundColor: '#FFC9C9', borderColor: '#FFC9C9', color: 'black',
                  width: '300px', height: '60px'
                }}>
                다음</Button>
            </div>

          </div>
          {/* 박스 div */}


        </div>
      </div>
    </div>
  );
};

export default Signup;

