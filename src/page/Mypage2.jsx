import React, { useState } from 'react'
import Logo from './Logo'
import '../css/mypage.css'
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import '../css/input.css'


import iconImage from '../icon/name.png'
import birthImage from '../icon/birthday.png'
import genderImage from '../icon/gender.png'
import dogimage from '../icon/dog_kind.png'
import weightImage from '../icon/weight.png'
import neuteredImage from '../icon/neutered.png'

import dog1pf from '../profile/profile_largedog.png'
import dog2pf from '../profile/profile_mediumdog.png'
import dog3pf from '../profile/profile_smalldog.png'

// GenderSelection 컴포넌트 정의 (남, 여 선택 버튼)
const GenderSelection = ({ selectedGender, handleGenderButtonClick }) => {
    return (
        <div className="d-flex align-items-center" style={{ marginTop: '20px', marginBottom: '10px' }}>
            <img src={genderImage} style={{ width: '20px', marginRight: '10px', marginTop: '5px' }} alt="Icon" />
            <a style={{ marginTop: '5px', marginLeft: '20px' }}>성별</a>
            <div className='custom-box'>
                <div className="custom-input-box" style={{ width: '450px', marginLeft: '-16px' }}>
                    {/* "수컷" 버튼 */}
                    <Button
                        variant={selectedGender === "수컷" ? 'primary' : 'light'}
                        style={{
                            backgroundColor: selectedGender === "수컷" ? 'skyblue' : '#F0F0F0',
                            borderColor: selectedGender === "수컷" ? 'skyblue' : '#F0F0F0',
                            color: 'black',
                            width: '60px',
                            height: '40px',
                            margin: '-10px 50px',
                        }}
                        onClick={() => handleGenderButtonClick("수컷")}
                    >
                        수컷
                    </Button>
                    {' '}
                    {/* "암컷" 버튼 */}
                    <Button
                        variant={selectedGender === "암컷" ? 'primary' : 'light'}
                        style={{
                            backgroundColor: selectedGender === "암컷" ? '#FFC9C9' : '#F0F0F0',
                            borderColor: selectedGender === "암컷" ? '#FFC9C9' : '#F0F0F0',
                            color: 'black',
                            width: '60px',
                            height: '40px',
                            margin: '1px 50px auto -15px',
                        }}
                        onClick={() => handleGenderButtonClick("암컷")}
                    >
                        암컷
                    </Button>
                </div>
            </div>
        </div>
    );
};

// 중성화 여부 선택 버튼
const NeuteredSelection = ({ selectedNeutered, handleNeuteredButtonClick }) => {
    return (
        <div className="d-flex align-items-center" style={{ marginTop: '10px' }}>
            <img src={neuteredImage} style={{ width: '20px', marginTop: '19px' }} alt="Icon" />
            <div className='custom-box'>
                <div className="custom-input-box" style={{ width: '450px', marginTop: '10px' }}>
                    <a style={{ marginTop: '10px', marginLeft: '15px' }}>중성화</a>
                    <Button
                        variant={selectedNeutered === "O" ? 'primary' : 'light'}
                        style={{
                            backgroundColor: selectedNeutered === "O" ? '#F6E781' : '#F0F0F0',
                            borderColor: selectedNeutered === "O" ? '#F6E781' : '#F0F0F0',
                            color: 'black',
                            width: '60px',
                            height: '40px',
                            margin: '-10px 50px -10px 34px',
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
                            color: 'black',
                            width: '60px',
                            height: '40px',
                            margin: '21px 50px 20px -15px',
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

// 마이페이지 개견 종류 정보
// 선택창
const Dogkind2 = ({ options, onSelect }) => {

  return (
    <select className="dogkind-select2" onChange={(e) => onSelect(e.target.value)}>
      <option value="">견종을 선택하세요</option>
      {options.map((option) => (
        <option key={option.value} value={option.label}>
          {option.label}
        </option>
      ))}
    </select>
  );};


const Mypage2 = () => {

    const Box = {
        margin: '0 auto',
        width: '1200px',
        height: '700px',
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '0 30px 30px 30px'
    }

    // Signup 페이지에서 담긴 데이터
    // 이곳에 원래의 회원 정보 담겨야 함
    // 지금은 임시로 비워 놓음

    const [data, setData] = useState({
        name: '',
        gender: '',
        birth: '',
        weight: '',
        neutered: ''
    });

    // 개견 종류 선택 데이터
    
    const dataOptions = [
        { label: '소형견', value: '소형견' },
        { label: '중형견', value: '중형견' },
        { label: '대형견', value: '대형견' },
    ];

    // 수정된 데이터 출력
    const handleSave = () => {
        console.log('저장된 데이터:', data);
        console.log('견종:', selectedDogkind)
        // 여기에 저장 또는 수정 로직을 추가할 수 있습니다.
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    // 개견 종류 데이터 분류

    const [selectedDogkind, setSelectedDogkind] = useState('');

    const handleDogkindSelect = (value) => {
        setSelectedDogkind(value);
    };

    const getImagePath = () => {
        if (selectedDogkind === "소형견") {
            return dog3pf;
        } else if (selectedDogkind === "중형견") {
            return dog2pf;
        } else if (selectedDogkind === "대형견") {
            return dog1pf;
        } else {
            return null; // 기본 이미지 경로 또는 처리
        }
    };


    // 성별 선택 버튼 클릭 이벤트 핸들러
    const handleGenderButtonClick = (gender) => {
        setData({ ...data, gender: gender });
    };

    // 중성화 여부 선택 버튼 클릭 이벤트 핸들러
    const handleNeuteredButtonClick = (neutered) => {
        setData({ ...data, neutered: neutered });
    };


    return (
        <div
            style={{ backgroundColor: '#F0F0F0' }}>
            <Logo />
            {/* 바탕화면 div */}
            <div style={{
                backgroundColor: '#F0F0F0', minHeight: '1000px',
                paddingTop: '80px'
            }}>

                <div style={{ backgroundColor: 'white', borderRadius: '20px 20px 0 0', width: '200px', height: '40px', marginLeft: '360px' }}>
                    <a className='mypagetext' style={{ padding: '10px', marginLeft: '45px' }}>마이페이지</a>

                </div>

                {/* 하얀 박스 div */}
                <div style={{ ...Box }}>
                    {/* 링크 태그 div */}

                    <div style={{ display: 'flex', justifyContent: 'center' }}>

                        <Link to="/mypage" className='hideTitle'>내 정보</Link>
                        <span className='title'>강아지 정보</span>
                    </div>
                    {/* 링크 div 끝 */}

                    <div style={{
                        display: 'flex', flexDirection: 'row', justifyContent: 'center',
                        marginTop: '50px'
                    }}>

                        {/* 이미지 */}
                        <div style={{ marginLeft: '200px' }}>
                            <img src={getImagePath()}
                                style={{ width: '300px', height: '300px' }} />
                        </div>
                        {/* 정보 입력 */}
                        <div style={{
                            marginBottom: '100px',
                            marginLeft: '100px', display: 'flex', flexDirection: 'column',
                        }}>

                            {/* 이름 */}
                            <Form.Group className="d-flex align-items-center">
                                <Form.Label></Form.Label>
                                <div className="d-flex align-items-center">
                                    <img src={iconImage} style={{ width: '20px', marginRight: '10px' }} alt="Icon" />
                                    <a style={{ marginLeft: '20px' }}>이름</a>
                                    <Form.Control
                                        type="text"
                                        name="name"
                                        value={data.name}
                                        onChange={handleChange}
                                        style={{ width: '200px', marginLeft: '40px' }}
                                    />
                                </div>
                            </Form.Group>

                            {/* 견종 */}
                            <Form.Group className="d-flex align-items-center" style={{ marginTop: '20px' }}>
                                <Form.Label></Form.Label>
                                <div className="d-flex align-items-center">
                                    <img src={dogimage} style={{ width: '20px', marginRight: '10px', marginTop: '10px' }} alt="Icon" />
                                    <a style={{ marginTop: '10px', marginLeft: '20px' }}>견종</a>
                                    <div style={{ marginLeft: '42px' }}>
                                        <Dogkind2 options={dataOptions} onSelect={handleDogkindSelect} />

                                    </div>
                                </div>
                            </Form.Group>

                            {/* 성별 */}
                            {/* 남, 여 선택 버튼 */}
                            <GenderSelection selectedGender={data.gender} handleGenderButtonClick={handleGenderButtonClick} />

                            {/* 생년월일 */}
                            <Form.Label htmlFor="inputBirth"></Form.Label>
                            <div className="d-flex align-items-center" style={{ marginBottom: '10px' }}>
                                <img src={birthImage} style={{ width: '20px', marginTop: '10px', marginRight: '10px' }} alt="Icon" />
                                <a style={{ marginTop: '10px', marginLeft: '8px' }}>생년월일</a>
                                <Form.Control
                                    type="text"
                                    name="birth"
                                    value={data.birth}
                                    onChange={handleChange}
                                    style={{ width: '200px', marginLeft: '30px', marginTop: '10px' }}
                                /></div>

                            {/* 몸무게 입력창 */}
                            <Form.Label htmlFor="inputWeight"></Form.Label>
                            <div className="d-flex align-items-center" style={{ display: 'flex' }}>
                                <img src={weightImage} style={{ width: '20px', marginTop: '10px', marginRight: '10px' }} alt="Icon" />
                                <a style={{ marginTop: '10px', marginLeft: '15px' }}>몸무게</a>
                                <Form.Control
                                    type="text" // 숫자만 입력 가능하도록 수정
                                    value={data.weight}
                                    name="weight"
                                    onChange={handleChange}
                                    style={{ width: '200px', marginLeft: '33px', marginTop: '10px' }}
                                /></div>

                            {/* 중성화 여부 선택 버튼 */}
                            <NeuteredSelection selectedNeutered={data.neutered} handleNeuteredButtonClick={handleNeuteredButtonClick} />
                        </div>
                    </div>

                    {/* 수정하기 버튼 */}
                    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '100px' }}>
                        <Button variant='primary' type='submit'
                            style={{
                                backgroundColor: '#FFC9C9', borderColor: '#FFC9C9', color: 'black',
                                width: '160px', height: '50px', margin: '0 50px',
                            }}
                            // 수정했을 때 일단 console에 출력되게 구현
                            // Server 연동 후 수정 필요
                            onClick={handleSave}>
                            수정하기
                        </Button>

                    </div>

                </div>
                {/* 하얀 박스 div 끝 */}
            </div>
            {/* 바탕화면 div 끝 */}
        </div>
    )
}

export default Mypage2