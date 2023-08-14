import React, { useRef, useState } from 'react'; //useState 추가 - 정희석
import { Link, useNavigate } from 'react-router-dom';
import picSrc from '../img/PUPPIET_logo.png';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import '../css/login.css';
import '../css/input.css';

import iconImage from '../icon/name.png'
import pwImage from '../icon/password.png'

import { firebaseAuth, signInWithEmailAndPassword } from '../config/firebase'; // firebase login 정보 추가 - 정희석


const Login = () => {

  const box1 = {
    margin: '0 auto',
    width: '600px',
    height: '600px',
    backgroundImage: `url('/img/로그인배경.png')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    marginBottom: '100px',
    borderRadius: '20px',
    padding: '20px',
    textAlign: 'center',
    fontSize: '19px',
    fontWeight: 'bold',
  }


  // 로그인 버튼 구현 - 유민
  const idRef = useRef(); // 사용자 아이디
  const pwRef = useRef(); // 사용자 비번
  const nav = useNavigate();

  // 로그인 기능 함수
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const email = idRef.current.value;
      const password = pwRef.current.value;
      // Firebase Authentication을 통한 로그인 처리
      await signInWithEmailAndPassword(firebaseAuth, email, password);

      // 로그인 성공 처리
      sessionStorage.setItem('userId', email);
      alert(email + '님 환영합니다!');
      nav('/main2');
    } catch (error) {
      // 로그인 실패 처리
      alert('로그인 실패 - 아이디 또는 비밀번호를 올바르게 입력해 주세요.');
      idRef.current.value = '';
      pwRef.current.value = '';
      idRef.current.focus();
    }

    // try { // firebase 로그인 처리
    //   const userCredential = await signInWithEmailAndPassword(idRef.current.value, pwRef.current.value);
    //   const user = userCredential.user;

    //   // 로그인 성공 처리
    //   sessionStorage.setItem('userId', user.email);
    //   alert(user.email + '님 환영합니다!');
    //   nav('/main2');
    // } catch (error) {
    //   // 로그인 실패 처리
    //   alert('로그인 실패 - 아이디 또는 비밀번호를 올바르게 입력해 주세요.');
    //   idRef.current.value = '';
    //   pwRef.current.value = '';
    //   idRef.current.focus();
    // }
  };

    // console.log('handle Login Function', idRef.current.value, pwRef.current.value);
    // if (idRef.current.value === 'puppiet' && pwRef.current.value === '1234') {
    //   sessionStorage.setItem('userId', idRef.current.value); // sessionStorage에 로그인 데이터 저장
    //   alert(idRef.current.value + '님 환영합니다!');
    //   nav('/main2');

    // } else {
    //   alert('로그인 실패 - 아이디 또는 비밀번호를 올바르게 입력해 주세요.')
    //   idRef.current.value = '';
    //   pwRef.current.value = '';
    //   idRef.current.focus();
    // }
  

  return (
    <div>
      <br />

      <Link to='/'>
        <img
          className='logo'
          style={{
            display: 'block',
            margin: '0 auto',
            width: '200px',
          }}
          src={picSrc}
          alt='PUPPIET Logo'
        />
      </Link>


      <div style={{ ...box1, marginTop: '40px' }}>
        {/*  */}
        <div style={{ margin: '30px', marginTop: '70px' }}>


          <Form onSubmit={handleLogin}>
            {/* 아이디 입력란 */}

            <Form.Group className="mb-3" controlId="formBasicID">
              <Form.Label></Form.Label>
              <div className="d-flex align-items-center">
                <img src={iconImage} style={{ width: '20px', marginRight: '10px' }} alt="Icon" />
                <Form.Control type="text" placeholder="아이디" ref={idRef} className="custom-input" /> </div>


            </Form.Group>
            {/* 비밀번호 입력란 */}
            <Form.Group className='mb-3' controlId='formBasicPassword'>
              <Form.Label></Form.Label>
              <div className="d-flex align-items-center">
                <img src={pwImage} style={{ width: '20px', marginRight: '10px' }} alt="Icon" />
                <Form.Control type='password' placeholder='비밀번호' ref={pwRef} className="custom-input" /> </div>
            </Form.Group>

            {/* 로그인 버튼 */}

            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '70px' }}>
              <Button variant='primary' type='submit' style={{
                backgroundColor: '#FFC9C9', borderColor: '#FFC9C9', color: 'black',
                width: '300px', height: '60px', fontSize: '20px'
              }}>
                로그인
              </Button>

            </div>


          </Form>

          <br />

          <div className='logintext' style={{ display: 'flex', justifyContent: 'center' }}>
            <Link to='/signup' className='txt'>
              회원가입
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
