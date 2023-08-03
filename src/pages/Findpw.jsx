import React from 'react'
import { Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import picSrc from '../img/PUPPIET_logo.png';



const Findpw = () => {

  const box2 = {
    margin: '0 auto',
    padding: '20px',
    width: '800px',
    height: '600px',
    backgroundColor: '#F0F0F0',
    marginBottom: '100px',
    borderRadius: '20px'
  }

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

      {/* 가장 바깥 박스 */}
      <div style={box2}>

        {/* 아이디 찾기 / 비밀번호 찾기 */}
        <div style={{ display: 'flex', justifyContent: 'center' }}>

          <Link to="/findid" className='hideTitle'>아이디 찾기</Link>
          <span className='findTitle'>비밀번호 찾기</span>

        </div>
        {/* 설명란 */}
        <div style={{ marginTop: '10px' }}>
          <a style={{
            fontSize: '17px', fontWeight: 'bold',
            padding: '30px'
          }}>

            본인확인 이메일로 인증</a>
        </div>

        <br />
        <a style={{ fontSize: '13px', padding: '30px' }}>
        기존 아이디와 본인확인 이메일 주소를 입력해 주세요</a>


        <div>
          {/* 이름 입력란 */}
          <Form.Group className='mb-3' controlId='formBasicID'>
            <Form.Label></Form.Label>
            <Form.Control type='text' placeholder='이름' />
          </Form.Group>

          {/* 이메일 주소 번호 입력 */}
          <Form>
            <Form.Group className='mb-3' controlId='formBasicID'>
              <Form.Label></Form.Label>
              <div style={{ display: 'flex' }}>
                <Form.Control type='text' placeholder='이메일 주소' />
                <Button variant='primary' style={{
                  marginLeft: '10px', backgroundColor: '#FFC9C9',
                  borderColor: '#FFC9C9', color: 'gray'
                }}>
                  인증 번호 발송
                </Button>
              </div>
            </Form.Group>
          </Form>

          {/* 인증 번호 입력란 */}
          <Form.Group className='mb-3' controlId='formBasicID'>
            <Form.Label></Form.Label>
            <Form.Control type='text' placeholder='인증번호 입력' />
          </Form.Group>



          <div style={{ display: 'flex', justifyContent: 'center', margin: '60px' }}>
            {/* 확인 버튼 */}
            <Button variant='primary' style={{
              backgroundColor: '#FFC9C9', borderColor: '#FFC9C9', color: 'gray',
              width: '200px',
            }}>
              확인
            </Button>
            
          </div>
        </div>
      </div>
    </div>

  )
}

export default Findpw