import React, { useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import picSrc from '../img/PUPPIET_logo.png';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import '../Main.css';

const Login = () => {
  const box1 = {
    border: '3px solid #cccccc',
    borderRadius: '10px',
    margin: '0 auto',
    padding: '20px',
    textAlign: 'justify',
    fontSize: '19px',
  };

  const box2 = {
    border: '3px solid #cccccc',
    margin: '0 auto',
    padding: '20px',
    textAlign: 'center',
    fontSize: '19px',
    fontWeight: 'bold',
  };

  // 로그인 버튼 구현 - 유민
  const idRef = useRef(); // 사용자 아이디
  const pwRef = useRef(); // 사용자 비번
  const nav = useNavigate();

  // 로그인 기능 함수
  const handleLogin = (e) => {
    e.preventDefault();
    console.log('handle Login Function', idRef.current.value, pwRef.current.value);
    if (idRef.current.value === 'puppiet' && pwRef.current.value === '1234') {
      sessionStorage.setItem('userId', idRef.current.value); // sessionStorage에 로그인 데이터 저장
      nav('/main2');

    } else {
      alert('로그인 실패')
      idRef.current.value = '';
      pwRef.current.value = '';
      idRef.current.focus();
    }
  };

  return (
    <div>
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

      <h1 style={{ textAlign: 'center', fontSize: '60px' }}>PUPPIET</h1>

      <div style={box1}>
        <div>

          <Form onSubmit={handleLogin}>
            {/* 아이디 입력란 */}
            <Form.Group className='mb-3' controlId='formBasicID'>
              <Form.Label></Form.Label>
              <Form.Control type='text' placeholder='아이디' ref={idRef} />
            </Form.Group>

            {/* 비밀번호 입력란 */}
            <Form.Group className='mb-3' controlId='formBasicPassword'>
              <Form.Label></Form.Label>
              <Form.Control type='password' placeholder='비밀번호' ref={pwRef} />
            </Form.Group>

            {/* 로그인 버튼 */}
            <div style={box2}>
              <Button variant='primary' type='submit'>
                로그인
              </Button>
            </div>
          </Form>
          <br />

          <div className='logintext' style={{ display: 'flex', justifyContent: 'center' }}>
            <Link to='/findid' className='txt'>
              아이디 찾기
            </Link>
            <Link to='/findpw' className='txt'>
              비밀번호 찾기
            </Link>
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
