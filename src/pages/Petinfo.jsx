import React from 'react'
import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import picSrc from '../img/PUPPIET_logo.png'
import Button from 'react-bootstrap/Button';
import '../input.css'

import genderImage from '../icon/gender.png'
import Image from '../icon/name.png'
import dogimage from '../icon/dog_kind.png'
import birthImage from '../icon/birthday.png'
import weightImage from '../icon/weight.png'
import neuteredImage from '../icon/neutered.png'


const Petinfo = () => {

    const box1 = {
        margin: '0 auto',
        padding: '20px',
        width: '600px',
        height: '600px',
        backgroundColor: '#F0F0F0',
        marginBottom: '100px',
        borderRadius: '20px',
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

                <div style={{ margin: '30px' }}>
                    <div>
                        <Form.Group className="mb-3">
                            <Form.Label></Form.Label>
                            <div className="d-flex align-items-center">
                                <img src={Image} style={{ width: '20px', marginRight: '10px' }} alt="Icon" />
                                <Form.Control type="text" placeholder="이름" className="custom-input" /> </div>
                        </Form.Group>

                        {/* 견종 */}
                        <Form.Group className="mb-3">
                            <Form.Label></Form.Label>
                            <div className="d-flex align-items-center">
                                <img src={dogimage} style={{ width: '20px', marginRight: '10px' }} alt="Icon" />
                                <Form.Control type="text" placeholder="견종" className="custom-input" /> </div>
                        </Form.Group>

                    </div>
                    {/* 성별 입력 */}
                    <div className="d-flex align-items-center" style={{ marginTop: '10px' }}>
                        <img src={genderImage} style={{ width: '20px', marginRight: '10px' }} alt="Icon" />
                        <div className='custom-box'>
                            <div className="custom-input-box" style={{ width: '450px' }}>
                                <input
                                    type="radio"
                                    name="gender"
                                    value="남성"
                                />{' '}
                                남성
                                {' '}
                                <input
                                    type="radio"
                                    name="gender"
                                    value="여성"
                                />{' '}
                                여성
                            </div>
                        </div>
                    </div>

                    {/* 생년월일 입력창 */}
                    <Form.Label htmlFor="inputBirth"></Form.Label>
                    <div className="d-flex align-items-center" style={{ display: 'flex' }}>
                        <img src={birthImage} style={{ width: '20px', marginRight: '10px' }} alt="Icon" />
                        <Form.Control
                            type="text" // 숫자만 입력 가능하도록 수정
                            id="inputBirth"
                            placeholder="생년월일 8자리 ex)19990101"
                            name="birth"
                        /></div>

                    {/* 몸무게 입력창 */}
                    <Form.Label htmlFor="inputWeight"></Form.Label>
                    <div className="d-flex align-items-center" style={{ display: 'flex' }}>
                        <img src={weightImage} style={{ width: '20px', marginRight: '10px' }} alt="Icon" />
                        <Form.Control
                            type="text" // 숫자만 입력 가능하도록 수정
                            id="inputWeight"
                            placeholder="        kg"
                            name="weight"
                        /></div>

                    {/* 중성화 여부 선택창 */}
                    <div className="d-flex align-items-center" style={{ marginTop: '10px' }}>
                        <img src={neuteredImage} style={{ width: '20px', marginRight: '10px' }} alt="Icon" />
                        <div className='custom-box'>
                            <div className="custom-input-box" style={{ width: '450px' }}>
                                <a style={{color: 'gray'}}>중성화 여부</a>
                                <input
                                    type="radio"
                                    name="neutered"
                                    value="남성"
                                    style = {{marginLeft: '10px'}}
                                />{' '}
                                O
                                {' '}
                                <input
                                    type="radio"
                                    name="neutered"
                                    value="여성"
                                />{' '}
                                X
                            </div>
                        </div>
                    </div>


                    {/* 로그인 버튼 */}

                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '50px'}}>
                        <Button variant='primary' type='submit' style={{
                            backgroundColor: '#FFC9C9', borderColor: '#FFC9C9', color: 'gray',
                            width: '160px', height: '50px', margin:'0 50px'
                        }}>
                            이전
                        </Button>
                        <Button variant='primary' type='submit' style={{
                            backgroundColor: '#FFC9C9', borderColor: '#FFC9C9', color: 'gray',
                            width: '160px', height: '50px', margin:' 0 50px'
                        }}>
                            완료
                        </Button>

                    </div>

                </div>
            </div>
        </div>

    )
}

export default Petinfo