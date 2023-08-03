import React from 'react'
import picSrc from '../img/PUPPIET_logo.png'
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const Signup = () => {

  // 박스1
  const box1 = {

    border: '3px solid #cccccc',
    borderRadius: '10px',
    margin: '0 auto',
    padding: '20px',
    textAlign: 'justify',
    fontSize: '19px'
  }

  
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
          alt="PUPPIET Logo">
        </img>
      </Link>

      {/* 로고 */}
      <h1 style={{ textAlign: 'center', fontSize: '60px' }}>PUPPIET</h1>

      {/* 가장 바깥 박스 */}
      <div style={box1}>

        {/* 아이디, 비밀번호 박스 */}
        <div style={box1}>

          {/* 아이디 입력창 */}
        
            <div>
            <Form.Group className="mb-3" controlId="formBasicID">
          <Form.Label></Form.Label>
          <Form.Control type="text" placeholder="아이디 입력"/>
          </Form.Group>
            </div>

            <hr />



            {/* 비밀번호 입력창 */}
            <div>
            <Form.Label htmlFor="inputPassword5"></Form.Label>
          <Form.Control
            type="password"
            id="inputPassword5"
            aria-describedby="passwordHelpBlock"
            placeholder="비밀번호 입력"
          />
          <Form.Text id="passwordHelpBlock" muted>
          </Form.Text>
              
            </div>

            <hr />

            <div>
            <Form.Label htmlFor="inputPassword5"></Form.Label>
          <Form.Control
            type="password"
            id="inputPassword5"
            aria-describedby="passwordHelpBlock"
            placeholder="비밀번호 재입력"

          />
          <Form.Text id="passwordHelpBlock" muted>
          </Form.Text>
            </div>
          
        </div><br />
        {/* ------------------------------------------------------------- */}

        {/* 이름, 생년월일 박스 */}
        <div style={box1}>

          {/* 이름 입력창 */}
          <Form.Group className="mb-3" controlId="formBasicID">
          <Form.Label></Form.Label>
          <Form.Control type="text" placeholder="이름"/>
          </Form.Group>
          <hr />
          {/* 생년월일 입력창 */}
          <Form.Group className="mb-3" controlId="formBasicbirth">
          <Form.Label></Form.Label>
          <Form.Control type="text" placeholder="생년월일 8자리 ex)19990101"/>
          </Form.Group>
        </div><br />
        {/* ------------------------------------------------------------- */}

        {/* 이메일, 성별 박스/ */}
        <div style={box1}>

          {/* 이메일 입력창 */}
          <Form.Group className="mb-3" controlId="formBasicbirth">
          <Form.Label></Form.Label>
          <Form.Control type="text" placeholder="이메일 입력"/>
          </Form.Group>
          <hr />
          <input type='radio' /> 남성
          {" "}
          <input type='radio' /> 여성
        </div><br />

        {/* ------------------------------------------------------------- */}

        <Button variant="outline-dark">회원가입</Button>



        <div>
          
          
        </div>
      </div>
    </div>
  )
}

export default Signup