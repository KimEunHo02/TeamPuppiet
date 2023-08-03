import React from 'react'
import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import picSrc from '../img/PUPPIET_logo.png'

const Petinfo = () => {

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


            {/* 가장 바깥 */}
            <div style={box1}>

                {/* 내용 박스 */}
                <div style={box1}>

                    {/* 아이디 입력창 */}

                    <div>
                        <Form.Group className="mb-3" controlId="formBasicID">
                            <Form.Label></Form.Label>
                            <Form.Control type="text" placeholder="이름" />
                        </Form.Group>
                    </div><hr/>


                    {/* 견종 입력창 */}

                    <div>
                        <Form.Group className="mb-3" controlId="formBasicID">
                            <Form.Label></Form.Label>
                            <Form.Control type="text" placeholder="견종" />
                        </Form.Group>
                    </div><hr/>

                    <input type='radio' /> 남성
                    {" "}
                    <input type='radio' /> 여성



                </div>
            </div>
        </div>
    )
}

export default Petinfo