import React from 'react'
import { Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import picSrc from '../img/PUPPIET_logo.png';

const Findpw2 = () => {

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

                        비밀번호 재설정</a>
                </div>

                <br />
                <a style={{ fontSize: '13px', padding: '30px' }}>
                    비밀번호 조합 시 영문 대/소문자 + 숫자 + 특수기호(+,@,!,$)</a>


                <div style={{ margin: '30px'}}>
                    {/* 이름 입력란 */}
                    <Form.Group className='mb-3' controlId='formBasicID'>
                        <Form.Label></Form.Label>
                        <Form.Control type='text' placeholder='비밀번호 입력' />
                    </Form.Group>


                    {/* 인증 번호 입력란 */}
                    <Form.Group className='mb-3' controlId='formBasicID'>
                        <Form.Label></Form.Label>
                        <Form.Control type='text' placeholder='비밀번호 재입력' />
                    </Form.Group>



                    <div style={{ display: 'flex', justifyContent: 'center', margin: '90px' }}>
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

export default Findpw2