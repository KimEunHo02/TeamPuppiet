import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import picSrc from '../img/PUPPIET_logo.png'
import Button from 'react-bootstrap/Button';
import '../input.css'
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import Signup from './Signup';
// import Mainpage2 from '../page/Mainpage2';
import Dogkind from './Dogkind';

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
        backgroundColor: 'white',
        marginBottom: '100px',
        borderRadius: '20px',
    }

    // 견종 데이터 선택 기능
    const dataOptions = [
        { label: '김은호', value: 'option1' },
        { label: '류하경', value: 'option2' },
        { label: '서유민', value: 'option3' },
        { label: '서유정', value: 'option4' },
        { label: '정희석', value: 'option5' },
    ];

    // 값이 다 입력됐을 때 완료 버튼 누르게 하는 기능

    const [inputValues, setInputValues] = useState({
        // 여러 개의 입력창의 상태를 객체로 관리
        name: '',
        dogkind: '',
        gender: '',
        birth: '',
        neutered: '',
    });

    const isInputsValid = Object.values(inputValues).every((value) => value.trim() !== '');

    const handleInputChange = (inputName, inputValue) => {
        setInputValues((prevValues) => ({
            ...prevValues,
            [inputName]: inputValue,
        }));

    };
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
                                <Form.Control type="text" placeholder="이름" className="custom-input"
                                    value={inputValues.name}
                                    onChange={(e) => handleInputChange('name', e.target.value)} /> </div>
                        </Form.Group>

                        {/* 견종 */}
                        <Form.Group className="mb-3">
                            <Form.Label></Form.Label>
                            <div className="d-flex align-items-center">
                                <img src={dogimage} style={{ width: '20px', marginRight: '10px' }} alt="Icon" />
                                {/* input.css에 스타일 정의 */}
                                    <Dogkind options={dataOptions}/>

                            </div>
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
                                    checked={inputValues.gender === '남성'}
                                    onChange={(e) => handleInputChange('gender', '남성')}
                                />{' '}
                                남성
                                {' '}
                                <input
                                    type="radio"
                                    name="gender"
                                    checked={inputValues.gender === '여성'}
                                    onChange={(e) => handleInputChange('gender', '여성')}
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
                            value={inputValues.birth}
                            onChange={(e) => handleInputChange('birth', e.target.value)}
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
                            value={inputValues.weight}
                            onChange={(e) => handleInputChange('weight', e.target.value)}
                        /></div>

                    {/* 중성화 여부 선택창 */}
                    <div className="d-flex align-items-center" style={{ marginTop: '20px' }}>
                        <img src={neuteredImage} style={{ width: '20px', marginRight: '10px' }} alt="Icon" />
                        <div className='custom-box'>
                            <div className="custom-input-box" style={{ width: '450px' }}>
                                <a style={{ color: 'gray' }}>중성화 여부</a>
                                <input
                                    type="radio"
                                    name="neutered"
                                    style={{ marginLeft: '10px' }}
                                    checked={inputValues.neutered === 'O'}
                                    onChange={(e) => handleInputChange('neutered', 'O')}
                                />{' '}
                                O
                                {' '}
                                <input
                                    type="radio"
                                    name="neutered"
                                    checked={inputValues.neutered === 'X'}
                                    onChange={(e) => handleInputChange('neutered', 'X')}
                                />{' '}
                                X
                            </div>
                        </div>
                    </div>


                    {/* 로그인 버튼 */}

                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '40px' }}>
                        <Link to="/signup">
                            <Button variant='primary' style={{
                                backgroundColor: '#FFC9C9', borderColor: '#FFC9C9', color: 'gray',
                                width: '160px', height: '50px', margin: '0 50px'
                            }}>
                                이전
                            </Button>
                        </Link>
                        <Link to={isInputsValid ? '/main2' : '#'}>
                            <Button variant='primary' style={{
                                backgroundColor: '#FFC9C9', borderColor: '#FFC9C9', color: 'gray',
                                width: '160px', height: '50px', margin: ' 0 50px'
                            }} disabled={!isInputsValid}>
                                완료
                            </Button>
                        </Link>
                    </div>

                </div>
            </div>
        </div>

    )
}

export default Petinfo