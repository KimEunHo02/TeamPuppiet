import React, { useState } from 'react'
import Logo from './Logo'
import '../mypage.css'
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

import iconImage from '../icon/name.png'
import birthImage from '../icon/birthday.png'
import genderImage from '../icon/gender.png'
import dogimage from '../icon/dog_kind.png'
import weightImage from '../icon/weight.png'
import neuteredImage from '../icon/neutered.png'

import dog1pf from '../profile/profile_largedog.png'
import dog2pf from '../profile/profile_mediumdog.png'
import dog3pf from '../profile/profile_smalldog.png'

const Mypage2 = () => {

    const Box = {
        margin: '0 auto',
        width: '1200px',
        height: '700px',
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '30px'
    }

    // Signup 페이지에서 담긴 데이터
    const [data, setData] = useState({
        name: '',
        dogkind: '소형견',
        gender: '',
        birth: '',
        weight: '',
        neutered: ''
    });


    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const getImagePath = () => {
        if (data.dogkind === "소형견") {
            return dog3pf;
        } else if (data.dogkind === "중형견") {
            return dog2pf;
        } else if (data.dogkind === "대형견") {
            return dog1pf;
        } else {
            return null; // 기본 이미지 경로 또는 처리
        }
    };

    // 수정된 데이터 출력
    const handleSave = () => {
        console.log('저장된 데이터:', data);
        // 여기에 저장 또는 수정 로직을 추가할 수 있습니다.
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

                <a className='mypagetext'>마이페이지</a>

                {/* 하얀 박스 div */}
                <div style={{ ...Box }}>
                    {/* 링크 태그 div */}

                    <div style={{ display: 'flex', justifyContent: 'center'}}>

                        <Link to="/mypage" className='hideTitle'>내 정보</Link>
                        <span className='title'>강아지 정보</span>
                        </div>
                        {/* 링크 div 끝 */}

                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center',
                                    marginTop: '50px' }}>

                            {/* 이미지 */}
                            <div style={{ marginLeft: '200px' }}>
                                <img src={getImagePath()}
                                    style={{ width: '300px', height: '300px' }} alt='profile' />
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
                                        <a>이름</a>
                                        <Form.Control
                                            type="text"
                                            name="name"
                                            value={data.name}
                                            onChange={handleChange}
                                            style={{ width: '200px', marginLeft: '20px' }}
                                        />
                                    </div>
                                </Form.Group>

                                {/* 견종 */}
                                <Form.Group className="d-flex align-items-center" style={{ marginTop: '20px' }}>
                                    <Form.Label></Form.Label>
                                    <div className="d-flex align-items-center">
                                        <img src={dogimage} style={{ width: '20px', marginRight: '10px' }} alt="Icon" />
                                        <a>견종</a>
                                        <Form.Control
                                            type="text"
                                            name="dogkind"
                                            value={data.dogkind}
                                            onChange={handleChange}
                                            style={{ width: '200px', marginLeft: '20px' }} />
                                    </div>
                                </Form.Group>

                                {/* 성별 */}
                                <div className="d-flex align-items-center" style={{ marginTop: '10px' }}>
                                    <img src={genderImage} style={{ width: '20px' }} alt="Icon" />
                                    <div className='custom-box'>
                                        <div className="custom-input-box" style={{ width: '450px' }}>
                                            <a>성별</a>
                                            <input
                                                type="radio"
                                                name="gender"
                                                value="남자"
                                                checked={data.gender === "남자"}
                                                onChange={handleChange}
                                                style={{ marginLeft: '10px' }}
                                            />{' '}
                                            남자
                                            {' '}
                                            <input
                                                type="radio"
                                                name="gender"
                                                value="여자"
                                                checked={data.gender === "여자"}
                                                onChange={handleChange}
                                            />{' '}
                                            여자
                                        </div>
                                    </div>
                                </div>

                                {/* 생년월일 */}
                                <Form.Label htmlFor="inputBirth"></Form.Label>
                                <div className="d-flex align-items-center">
                                    <img src={birthImage} style={{ width: '20px', marginRight: '10px' }} alt="Icon" />
                                    <a>생년월일</a>
                                    <Form.Control
                                        type="text"
                                        name="birth"
                                        value={data.birth}
                                        onChange={handleChange}
                                        style={{ width: '200px', marginLeft: '20px' }}
                                    /></div>

                                {/* 몸무게 입력창 */}
                                <Form.Label htmlFor="inputWeight"></Form.Label>
                                <div className="d-flex align-items-center" style={{ display: 'flex' }}>
                                    <img src={weightImage} style={{ width: '20px', marginRight: '10px' }} alt="Icon" />
                                    <Form.Control
                                        type="text" // 숫자만 입력 가능하도록 수정
                                        value={data.weight}
                                        name="weight"
                                        onChange={handleChange}
                                        style={{ width: '200px', marginLeft: '20px' }}
                                    /></div>

                                {/* 중성화 여부 선택창 */}
                                <div className="d-flex align-items-center" style={{ marginTop: '10px' }}>
                                    <img src={neuteredImage} style={{ width: '20px' }} alt="Icon" />
                                    <div className='custom-box'>
                                        <div className="custom-input-box" style={{ width: '450px' }}>
                                            <a>중성화 여부</a>
                                            <input
                                                type="radio"
                                                name="neutered"
                                                value="O"
                                                checked={data.neutered === "O"}
                                                onChange={handleChange}
                                                style={{ marginLeft: '10px' }}
                                            />{' '}
                                            O
                                            {' '}
                                            <input
                                                type="radio"
                                                name="neutered"
                                                value="X"
                                                checked={data.neutered === "X"}
                                                onChange={handleChange}
                                                style={{ marginLeft: '10px' }}
                                            />{' '}
                                            X
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 수정하기 버튼 */}
                        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '100px' }}>
                            <Button variant='primary' type='submit'
                                style={{
                                    backgroundColor: '#FFC9C9', borderColor: '#FFC9C9', color: 'gray',
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