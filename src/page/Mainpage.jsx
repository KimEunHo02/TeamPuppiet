import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import picSrc from '../img/logo_name(x).png'
import '../css/Main.module.css';
import '../css/Main.css'
import ImageSlider from '../pages/ImageSlider';
import SnackImageSlider from '../pages/SnackImageSlider';
import { Modal, Button } from 'react-bootstrap';

// import dietGif from '../images/diet.gif'; // 이미지 가져오기
// import calendarGif from '../images/calendar.gif'; // 이미지 가져오기
// import serviceGif from '../images/service.gif'; // 이미지 가져오기
import maininfoGif from '../images/main_230813.gif'; // 이미지 가져오기

// 유정) 로고 이미지 눌렀을 때 Main 화면 보이게 설정한 페이지입니다.

const Mainpage = () => {

    const [showModal, setShowModal] = useState(false); // 모달의 열림/닫힘 상태를 관리하는 상태

    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);


    const textstyle = {
        fontWeight: 'bold',
        fontSize: '23px',
    };

    const Box = {
        width: '1200px',
        height: '150px',
        backgroundColor: 'white',

    }

    // 이미지 슬라이더 기능 (이미지 넣을 곳!!!!!!) -- 임시

    // 사료 이미지 빈리스트만남겨놓고 내용지워도됨
    const feedImages = ['/feedimg/습식사료4.jpg', '/feedimg/습식사료6.jpg', '/feedimg/습식사료8.jpg', '/feedimg/습식사료10.jpg',
        '/feedimg/습식사료12.jpg', '/feedimg/습식사료15.jpg', '/feedimg/습식사료17.jpg', '/feedimg/습식사료19.jpg'
    ];

    // 간식 이미지 
    const snackImages = ['/snackimg/간식1.png', '/snackimg/간식2.png', '/snackimg/간식3.png', '/snackimg/간식4.png',
        '/snackimg/간식5.png', '/snackimg/간식6.png', '/snackimg/간식7.png', '/snackimg/간식8.png',
    ];

    // // 로그인하지 않은 상태이므로 메뉴바 눌렀을 때 로그인 페이지로 이동하게 설정
    // const handleMenuClick = () => {
    //     alert("로그인이 필요합니다.");
    //     window.location.href = '/login'; // 로그인 페이지 경로로 변경
    // };

    // 로그인 버튼 클릭 시 로그인 페이지로 이동하는 함수
    const handleLoginClick = () => {
        handleClose(); // 모달 닫기
        window.location.href = '/login'; // 로그인 페이지로 이동
    };

    const [isResetActive, setIsResetActive] = useState(false); // 닫기 버튼 활성화 상태 관리
    const [isSearchActive, setIsSearchActive] = useState(false); // 로그인 버튼 활성화 상태 관리

    // 닫기 버튼 스타일
    const closeButtonStyle = {
        backgroundColor: isResetActive ? '#FFC9C9' : '#F0F0F0',
        color: 'black',
        fontSize: '18px',
        border: 'none', // 기본 테두리 제거
        boxShadow: 'none', // 기본 박스 쉐도우 제거
        outline: 'none', // 포커스 테두리 제거
    };

    // 검색하기 버튼 스타일
    const searchButtonStyle = {
        backgroundColor: isSearchActive ? '#FFC9C9' : '#F0F0F0',
        color: 'black',
        fontSize: '18px',
        border: 'none', // 기본 테두리 제거
        boxShadow: 'none', // 기본 박스 쉐도우 제거
        outline: 'none', // 포커스 테두리 제거
    };

    // 닫기 버튼 마우스 오버 이벤트 핸들러
    const handleResetMouseOver = () => {
        if (!isResetActive) {
            setIsResetActive(true);
        }
    };

    // 닫기 버튼 마우스 아웃 이벤트 핸들러
    const handleResetMouseOut = () => {
        if (isResetActive) {
            setIsResetActive(false);
        }
    };

    // 검색하기 버튼 마우스 오버 이벤트 핸들러
    const handleSearchMouseOver = () => {
        if (!isSearchActive) {
            setIsSearchActive(true);
        }
    };

    // 검색하기 버튼 마우스 아웃 이벤트 핸들러
    const handleSearchMouseOut = () => {
        if (isSearchActive) {
            setIsSearchActive(false);
        }
    };

    return (

        <div style={{ marginBottom: '44px', backgroundColor: '#F0F0F0' }}>

            {/* ----------- 상단바 ------------ */}

            <header style={{ backgroundColor: '#F0F0F0' }}
                className="header" >

                <div style={{
                    display: 'flex', alignItems: 'center',
                    justifyContent: 'space-between', padding: '10px'
                }}>

                    {/* 텍스트 이미지 */}
                    <div>
                        <h1 className='puppiettxt'>PUPPIET</h1>
                    </div>

                    {/* 이미지 */}
                    <div
                        style={{ marginRight: '94px' }}
                    >
                        <Link to='/'>
                            <img className='logo'
                                src={picSrc}
                                alt="Logo"></img>
                        </Link>
                    </div>
                    <div>
                        <Link to="/login" style={{ marginRight: '30px' }} className='maintext'>로그인</Link>
                        <Link to="/signup" style={{ marginRight: '30px' }} className='maintext'>회원가입</Link>
                    </div>

                    {/* 모달 컴포넌트 사용 */}
                    <Modal show={showModal} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>PUPPIET🐾</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>로그인이 필요합니다.</Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary"
                                onClick={handleClose}
                                style={closeButtonStyle}
                                onMouseOver={handleResetMouseOver}
                                onMouseOut={handleResetMouseOut}>
                                닫기
                            </Button>
                            <Button variant="secondary"
                                onClick={handleLoginClick}
                                style={searchButtonStyle}
                                onMouseOver={handleSearchMouseOver}
                                onMouseOut={handleSearchMouseOut}>
                                로그인
                            </Button>
                        </Modal.Footer>
                    </Modal>

                </div>
            </header>

            {/* 타이틀 */}
            <div className='bar-container'>
                <Link href="#" onClick={handleShow} className='bartext'>정보 보기</Link>
                <Link href="#" onClick={handleShow} className='bartext'>사료 추천</Link>
                <Link href="#" onClick={handleShow} className='bartext'>간식 레시피 추천</Link>
                <Link href="#" onClick={handleShow} className='bartext'>캘린더</Link>
            </div>

            {/* ------------------------------------ */}

            {/* 서비스 소개 */}
            <div style={{
                marginLeft: '350px',
                marginRight: '350px'
            }}>
                {/* 서비스 소개 */}
                {/* <div style={{ height: '404px', width: '1200px', background: `url(${serviceGif}) no-repeat center`, backgroundSize: 'cover' }}></div> */}

                {/* 반려견 다이어트 정보 */}
                {/* <div style={{ height: '404px', width: '1200px', background: `url(${dietGif}) no-repeat center`, backgroundSize: 'cover' }}></div> */}

                {/* 이벤트 캘린더 이미지 */}
                {/* <div style={{ height: '404px', width: '1200px', background: `url(${calendarGif}) no-repeat center`, backgroundSize: 'cover' }}></div> */}

                <div style={{ height: '1222px', width: '1200px', background: `url(${maininfoGif}) no-repeat center`, backgroundSize: 'cover' }}></div>

                {/* 사료 추천 */}

                {/* 사료~간식 전체 div(흰색) */}
                <div style={{ ...Box, height: '1100px' }}>
                    <br />
                    {/* 사료 추천 텍스트, 더보기 */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin: '50px' }}>
                        <a style={textstyle} className='mainboxcontent'>🍖 사료 추천 🍖</a>
                    </div>

                    <div style={{
                        display: 'flex', flexDirection: 'row', justifyContent: 'space-between',
                        margin: '80px', marginTop: '-30px'
                    }}
                        className='mainboxcontainer'>

                        {/* 사료 추천 이미지 ImageSlider 컴포넌트 */}
                        {/* Mainpage1은 이미지 슬라이더 사용하여 데이터 이 페이지 feedImage, snackImage 안에 데이터 넣으면 됨 */}
                        <div className="app">
                            <ImageSlider images={feedImages} />
                        </div>

                    </div>
                    {/* 사료 추천 전체 div 끝 */}

                    {/* 간식 레시피 추천 */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin: '50px' }}>
                        <a style={textstyle} className='mainboxcontent'>🦴 간식 레시피 🦴</a>
                    </div>

                    <div style={{
                        display: 'flex', flexDirection: 'row', justifyContent: 'space-between',
                        margin: '80px', marginTop: '-30px'
                    }}
                        className='mainboxcontainer'>

                        {/* snack 추천 이미지 ImageSlider 컴포넌트 */}

                        <div className="app">
                            <SnackImageSlider images={snackImages} />
                        </div>
                    </div>
                    {/* 간식 레시피 추천 div 끝 */}

                </div>

            </div>
        </div>
    )
}

export default Mainpage