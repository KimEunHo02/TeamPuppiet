import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
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

// GenderSelection 컴포넌트 정의 (남, 여 선택 버튼)
const GenderSelection = ({ selectedGender, handleGenderButtonClick }) => {
    return (
        <div className="d-flex align-items-center" style={{ marginTop: '10px' }}>
            <img src={genderImage} style={{ width: '20px', marginRight: '10px', marginLeft: '100px' }} alt="Icon" />
            <p style={{ marginTop: '20px', marginLeft: '22px' }}>성</p><p style={{ marginTop: '20px' }}>별</p>
            <div className='custom-box'>
                <div className="custom-input-box d-flex" style={{ width: '200px', marginLeft: '100px', display: 'flex' }}>
                    {/* "남성" 버튼 */}
                    <Button
                        variant={selectedGender === "남성" ? 'primary' : 'light'}
                        style={{
                            backgroundColor: selectedGender === "남성" ? 'skyblue' : '#F0F0F0',
                            borderColor: selectedGender === "남성" ? 'skyblue' : '#F0F0F0',
                            color: 'gray',
                            width: '60px',
                            height: '40px',
                            marginRight: '35px',
                            marginLeft: '-68px'
                        }}
                        onClick={() => handleGenderButtonClick("남성")}
                    >
                        남성
                    </Button>
                    {/* "여성" 버튼 */}
                    <Button
                        variant={selectedGender === "여성" ? 'primary' : 'light'}
                        style={{
                            backgroundColor: selectedGender === "여성" ? '#FFC9C9' : '#F0F0F0',
                            borderColor: selectedGender === "여성" ? '#FFC9C9' : '#F0F0F0',
                            color: 'gray',
                            width: '60px',
                            height: '40px',
                            marginRight: '10px', // 간격을 조절하여 가로로 나열
                        }}
                        onClick={() => handleGenderButtonClick("여성")}
                    >
                        여성
                    </Button>
                </div>
            </div>
        </div>
    );
};

// 중성화 여부 선택 버튼
const NeuteredSelection = ({ selectedNeutered, handleNeuteredButtonClick }) => {
    return (
        <div className="d-flex align-items-center" style={{ marginTop: '8px', marginBottom: '8px' }}>
            <img src={neuteredImage} style={{ width: '23px', marginTop: '19px', marginLeft: '100px' }} alt="Icon" />
            <div className='custom-box'>
                <div className="custom-input-box" style={{ width: '400px', marginTop: '10px' }}>
                    <a style={{ marginTop: '13px', marginLeft: '15px' }}>중성화</a>
                    <Button
                        variant={selectedNeutered === "O" ? 'primary' : 'light'}
                        style={{
                            backgroundColor: selectedNeutered === "O" ? '#F6E781' : '#F0F0F0',
                            borderColor: selectedNeutered === "O" ? '#F6E781' : '#F0F0F0',
                            color: 'gray',
                            width: '60px',
                            height: '40px',
                            margin: '-10px 50px -10px 31px',
                        }}
                        onClick={() => handleNeuteredButtonClick("O")}
                    >
                        O
                    </Button>
                    {' '}
                    <Button
                        variant={selectedNeutered === "X" ? 'primary' : 'light'}
                        style={{
                            backgroundColor: selectedNeutered === "X" ? '#F6E781' : '#F0F0F0',
                            borderColor: selectedNeutered === "X" ? '#F6E781' : '#F0F0F0',
                            color: 'gray',
                            width: '60px',
                            height: '40px',
                            margin: '21px 50px 20px -20px',
                        }}
                        onClick={() => handleNeuteredButtonClick("X")}
                    >
                        X
                    </Button>
                </div>
            </div>
        </div>
    );
};


const Petinfo = () => {

    const nav = useNavigate()

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
        // dogkind: '',
        gender: '',
        birth: '',
        neutered: '',
        weight: '',
    });


    const isInputsValid = () => {
        return (
            inputValues.name.trim() !== '' &&
            inputValues.gender.trim() !== '' &&
            inputValues.birth.trim() !== '' &&
            inputValues.weight.trim() !== '' &&
            inputValues.neutered.trim() !== ''
        );
    }

    const handleInputChange = (inputName, inputValue) => {
        setInputValues((prevValues) => ({
            ...prevValues,
            [inputName]: inputValue,
        }));

    };

    // 성별 선택 버튼 클릭 이벤트 핸들러
    const handleGenderButtonClick = (gender) => {
        setData({ ...data, gender: gender });
    };

    // 성별 담긴 데이터
    const [data, setData] = useState({
        name: '',
        birth: '',
        gender: '여성',
    });

    // 중성화 여부 선택 버튼 클릭 이벤트 핸들러
    const handleNeuteredButtonClick = (neutered) => {
        setData({ ...data, neutered: neutered });
    };

    const areAllFieldsFilled = () => {
        // 제외할 필드 이름을 배열에 저장
        const excludedFields = ['gender', 'dogkind', 'neutered'];

        for (const key in inputValues) {
            if (inputValues.hasOwnProperty(key)) {
                if (!excludedFields.includes(key) && inputValues[key] === '') {
                    return false; // 하나라도 비어있으면 false 반환
                }
            }
        }
        if (data.neutered === '') {
            return false; // 중성화 여부가 비어있으면 false 반환
        }
        return true; // 모든 필드가 채워져있을 때 true 반환
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

                <div style={{ margin: '30px', width: '400px' }}>
                    <div>
                        <Form.Group className="mb-3">
                            <Form.Label></Form.Label>
                            <div className="d-flex align-items-center">
                                <img src={Image} style={{ width: '20px', marginRight: '10px', marginLeft: '100px' }} alt="Icon" />
                                <Form.Control type="text" placeholder="이름" className="custom-input"
                                    style={{ width: '250px' }}
                                    value={inputValues.name}
                                    onChange={(e) => handleInputChange('name', e.target.value)} /> </div>
                        </Form.Group>

                        {/* 견종 */}

                        <Form.Group className="mb-3">
                            <Form.Label></Form.Label>
                            <div className="d-flex align-items-center" style={{ marginTop: '-10px' }}>
                                <img src={dogimage} style={{ width: '20px', marginRight: '10px', marginLeft: '100px' }} alt="Icon" />
                                <Dogkind options={dataOptions} onSelect={(selectedValue) => { /* 선택된 값 처리 */ }} />
                            </div>
                        </Form.Group>

                        {/* 성별 입력 */}
                        {/* GenderSelection 컴포넌트 사용 / 남, 여 선택 */}
                        <GenderSelection selectedGender={data.gender} handleGenderButtonClick={handleGenderButtonClick} />

                    {/* 중성화 여부 선택 버튼 */}
                    <NeuteredSelection selectedNeutered={data.neutered} handleNeuteredButtonClick={handleNeuteredButtonClick} />

                    {/* 생년월일 입력창 */}
                    <Form.Label htmlFor="inputBirth"></Form.Label>
                    <div className="d-flex align-items-center" style={{ display: 'flex' }}>
                        <img src={birthImage} style={{ width: '20px', marginRight: '10px', marginLeft: '100px' }} alt="Icon" />
                        <Form.Control
                            type="text" // 숫자만 입력 가능하도록 수정
                            id="inputBirth"
                            placeholder="생년월일 8자리 ex)19990101"
                            name="birth"
                            style={{ width: '250px' }}
                            value={inputValues.birth}
                            onChange={(e) => handleInputChange('birth', e.target.value)}
                        /></div>

                    {/* 몸무게 입력창 */}
                    <Form.Label htmlFor="inputWeight"></Form.Label>
                    <div className="d-flex align-items-center" style={{ display: 'flex' }}>
                        <img src={weightImage} style={{ width: '20px', marginRight: '10px', marginLeft: '100px' }} alt="Icon" />
                        <Form.Control
                            type="text" // 숫자만 입력 가능하도록 수정
                            id="inputWeight"
                            name="weight"
                            style={{ width: '50px' }}
                            value={inputValues.weight}
                            onChange={(e) => handleInputChange('weight', e.target.value)}
                        />
                        <p style={{marginLeft: '10px', marginBottom: '-7px'}}>kg</p></div>


                    {/* 이전 버튼 */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '40px' }}>
                        <Link to="/signup">
                            <Button variant='primary' style={{
                                backgroundColor: '#FFC9C9', borderColor: '#FFC9C9', color: 'gray',
                                width: '160px', height: '50px', margin: '0 50px'
                            }}>
                                이전
                            </Button>
                        </Link>

                    {/* 완료 버튼 */}
                    <div>
                        <Button
                            variant='primary'
                            style={{
                                backgroundColor: '#FFC9C9', borderColor: '#FFC9C9', color: 'gray',
                                width: '160px', height: '50px', margin: '0 50px',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                            }}
                            disabled={!areAllFieldsFilled()}
                            onClick={() => { nav('/main2'); }}
                            >
                            <p style={{marginTop: '15px'}}>완</p><p style={{marginTop: '15px'}}>료</p>
                        </Button>
                    </div>
                    </div>

                </div>
            </div>
        </div>
        </div>

    )
}

export default Petinfo