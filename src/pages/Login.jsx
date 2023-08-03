import React, { useRef } from 'react'
import { Link } from 'react-router-dom';
import picSrc from '../img/PUPPIET_logo.png'
import Form from 'react-bootstrap/Form';
import '../Main.css';


const Login = () => {

  const box1 = {

    border: '3px solid #cccccc',
    borderRadius: '10px',
    margin: '0 auto',
    padding: '20px',
    textAlign: 'justify',
    fontSize: '19px'
  }

  const box2 = {
    border: '3px solid #cccccc',
    margin: '0 auto',
    padding: '20px',
    textAlign: 'center',
    fontSize: '19px',
    fontWeight: 'bold'

  }

// 로그인 버튼 구현 - 유민
  const idRef = useRef()
  const pwRef = useRef()

  const handelLogin = (e) => {

    e.preventDefault();
    console.log('handle Login Function', idRef.current.value, pwRef.current.value)
    if (idRef.current.value == 'puppiet' && pwRef.current.value == 'app') {

      // 데이터 저장
      sessionStorage.setItem('userId', idRef.current.value)
      window.location.replace('/main2')

    } else {
      alert('로그인 실패' + <br>'로그인 실패하였습니다. 다시 시도해주시기 바랍니다.'</br>)
      idRef.current.value = ''
      pwRef.current.value = ''
      idRef.current.focus()
      window.location.replace('/login')
    }


    }
  return (

    <div>
      <Link to='/'>
        <img
          className='logo'
          style={{
            display: 'block', /* img 태그를 블록 수준 요소로 변경 */
            margin: '0 auto', /* 가로 방향으로 가운데 정렬 */
            width: '200px'
          }}
          src={picSrc}
          alt="PUPPIET Logo">
        </img>
      </Link>

      {/* 로고 */}
      <h1 style={{ textAlign: 'center', fontSize: '60px' }}>PUPPIET</h1>

      {/* 가장 바깥 박스 */}
      <div style={box1}>
        <div>

          {/* 아이디 입력창 */}

          <Form.Group className="mb-3" controlId="formBasicID">
            <Form.Label></Form.Label>
            <Form.Control type="text" placeholder="아이디" />
          </Form.Group>

          {/* 비밀번호 입력창 */}

          <Form.Group className="mb-3" controlId="formBasicID">
            <Form.Label></Form.Label>
            <Form.Control type="text" placeholder="비밀번호" />
          </Form.Group>

          {/* 로그인 버튼 클릭 시 메인2 이동 */}
          <div style={box2}>
            <Link to="/main2" className='mainpage2'>로그인</Link>
          </div>
          <br />

          <div className='logintext'
            style={{ display: 'flex', justifyContent: 'center' }}>
            <Link to="/findid" className='txt'>아이디 찾기</Link>
            <Link to="/findpw" className='txt'>비밀번호 찾기</Link>
            <Link to="/signup" className='txt'>회원가입</Link>

          </div>


        </div>

      </div>

    </div>


  )
}

export default Login