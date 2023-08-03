import React from 'react'
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

          <div style={box2}>
            <a>로그인</a>
          </div>

          <br/>

          <div className='logintext'
                style={{ display: 'flex', justifyContent: 'center'}}>
          <span style={{ display: 'inline-block', marginRight: '100px'}}>아이디 찾기</span>
          <span style={{ display: 'inline-block', marginRight: '100px'}}>비밀번호 찾기</span>
          <span style={{ display: 'inline-block', marginRight: '100px'}}>회원가입</span>
          </div>


        </div>

      </div>
      
      <div className='logintext'
      style={{ display: 'flex', justifyContent: 'center'}}>
      <span style={{ display: 'inline-block', marginRight: '100px'}}>아이디 찾기</span>{" "}
      <span style={{ display: 'inline-block', marginRight: '100px'}}>비밀번호 찾기</span>{" "}
      <Link to="/signup">회원가입</Link>

      </div>

    </div>
  )
}

export default Login