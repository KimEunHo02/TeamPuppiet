import React from 'react'
import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import picSrc from '../img/PUPPIET_logo.png'
import Button from 'react-bootstrap/Button';
import '../input.css'

import petImage from '../icon/dog_info.png'
import Image from '../icon/name.png'
import dogimage from '../icon/dog_kind.png'


const Petinfo = () => {

    const box1 = {
        margin: '0 auto',
        padding: '20px',
        width: '800px',
        height: '800px',
        backgroundColor: '#F0F0F0',
        marginBottom: '100px',
        borderRadius: '20px',
        padding: '20px',
        textAlign: 'center',
        fontSize: '19px',
        fontWeight: 'bold',
    }

    const inputstyle = {
        backgroundColor: 'white',
    }

    return (
        <div>
            <br />

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


            {/* 내용 박스 */}




            <div style={{ ...box1, marginTop: '40px' }}>

                {/* 이름 */}
                <img src={petImage} style={{ width: '50px' }} />
                <div style={{ margin: '30px' }}>
                    <div>
                        <Form.Group className="mb-3">
                            <Form.Label></Form.Label>
                            <div className="d-flex align-items-center">
                                <img src={Image} style={{ width: '25px', marginRight: '10px' }} alt="Icon" />
                                <Form.Control type="text" placeholder="이름" className="custom-input" /> </div>
                        </Form.Group>

                        {/* 견종 */}
                        <Form.Group className="mb-3">
                            <Form.Label></Form.Label>
                            <div className="d-flex align-items-center">
                                <img src={dogimage} style={{ width: '25px', marginRight: '10px' }} alt="Icon" />
                                <Form.Control type="text" placeholder="견종" className="custom-input" /> </div>
                        </Form.Group>

                    </div>
                    {/* 성별 선택창 */}
                    <div>
                        <input type='radio' /> 암컷
                        {" "}
                        <input type='radio' /> 수컷
                    </div><hr />

                    {/* 생년월일 입력창 */}
                    <div>
                        <Form.Group className="mb-3" controlId="formBasicbirth">
                            <Form.Label></Form.Label>
                            <Form.Control type="text" placeholder="생년월일 8자리 ex)19990101" />
                        </Form.Group>
                    </div><hr />

                    {/* 몸무게 입력창 */}
                    <div>
                        <Form.Group className="mb-3" controlId="formBasicID">
                            <Form.Label></Form.Label>
                            <Form.Control type="text" placeholder="                   kg" />

                        </Form.Group>
                    </div><hr />

                    {/* 중성화 여부 선택창 */}<div>
                        중성화 <input type='radio' /> O
                        {" "}
                        <input type='radio' /> X
                    </div><hr />


                    {/* 로그인 버튼 */}

                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '70px' }}>
                        <Button variant='primary' type='submit' style={{
                            backgroundColor: '#FFC9C9', borderColor: '#FFC9C9', color: 'gray',
                            width: '300px', height: '60px'
                        }}>
                            로그인
                        </Button>

                    </div>

                </div>
            </div>
        </div>

    )
}

export default Petinfo