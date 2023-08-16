import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import picSrc from '../img/logo_name(x).png'
import { Modal, Button } from 'react-bootstrap';

const Logo = () => {
    // 확인 버튼 클릭 시 메인1 페이지로 이동하는 함수
    const handleLoginClick = () => {
        handleClose(); // 모달 닫기
        window.location.href = '/'; // 메인1 페이지로 이동
    };

    const [isResetActive, setIsResetActive] = useState(false); // 취소 버튼 활성화 상태 관리
    const [isSearchActive, setIsSearchActive] = useState(false); // 확인 버튼 활성화 상태 관리

    const [showModal, setShowModal] = useState(false); // 모달의 열림/닫힘 상태를 관리하는 상태

    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);

    // 취소 버튼 스타일
    const closeButtonStyle = {
        backgroundColor: isResetActive ? '#FFC9C9' : '#F0F0F0',
        color: 'black',
        fontSize: '18px',
        border: 'none', // 기본 테두리 제거
        boxShadow: 'none', // 기본 박스 쉐도우 제거
        outline: 'none', // 포커스 테두리 제거
    };

    // 확인 버튼 스타일
    const searchButtonStyle = {
        backgroundColor: isSearchActive ? '#FFC9C9' : '#F0F0F0',
        color: 'black',
        fontSize: '18px',
        border: 'none', // 기본 테두리 제거
        boxShadow: 'none', // 기본 박스 쉐도우 제거
        outline: 'none', // 포커스 테두리 제거
    };

    // 취소 버튼 마우스 오버 이벤트 핸들러
    const handleResetMouseOver = () => {
        if (!isResetActive) {
            setIsResetActive(true);
        }
    };

    // 취소 버튼 마우스 아웃 이벤트 핸들러
    const handleResetMouseOut = () => {
        if (isResetActive) {
            setIsResetActive(false);
        }
    };

    // 확인 버튼 마우스 오버 이벤트 핸들러
    const handleSearchMouseOver = () => {
        if (!isSearchActive) {
            setIsSearchActive(true);
        }
    };

    // 확인 버튼 마우스 아웃 이벤트 핸들러
    const handleSearchMouseOut = () => {
        if (isSearchActive) {
            setIsSearchActive(false);
        }
    };
    // ----------------------- 모달 창 끝 ----------------------------

    return (

        <div>
            {/* ----------- 상단바 ------------ */}

            <header style = {{backgroundColor: '#F0F0F0'}} className="header" >

                <div style={{
                    display: 'flex', 
                    alignItems: 'center',
                    justifyContent: 'space-between', padding: '10px'
                }}>
                    {/* 텍스트 이미지 */}
                    <div>
                        <h1 style={{ fontSize: '40px', color: 'black' }} className='puppiettxt'>PUPPIET</h1>
                    </div>

                    {/* 이미지 */}
                    <div style={{ display: 'flex', alignItems: 'center', marginRight: '62px'
                                    }}>
                        <Link to='/main2'>
                            <img className='logo' src={picSrc} width='150px' alt="Logo"></img>
                        </Link>
                    </div>
                    
                    <div>
                        <Link to="/mypage" style={{ marginRight: '30px' }} className='maintext'>마이페이지</Link>
                        <Link onClick={handleShow} style={{ marginRight: '30px' }} className='maintext'>로그아웃</Link>
                    </div>

                    {/* 모달 컴포넌트 사용 */}
                    <Modal show={showModal} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>PUPPIET🐾</Modal.Title>
                        </Modal.Header>
                        <Modal.Body style={{fontSize: '18px'}}>로그아웃 하시겠습니까?</Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary"
                                onClick={handleLoginClick}
                                style={searchButtonStyle}
                                onMouseOver={handleSearchMouseOver}
                                onMouseOut={handleSearchMouseOut}>
                                확인
                            </Button>
                            <Button variant="secondary"
                                onClick={handleClose}
                                style={closeButtonStyle}
                                onMouseOver={handleResetMouseOver}
                                onMouseOut={handleResetMouseOut}>
                                취소
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            </header>

            {/* 타이틀 */}
            <div className='bar-container'>
                <Link to="/main2" className='bartext'>정보 보기</Link>
                <Link to="/feed" className='bartext'>사료 추천</Link>
                <Link to="/recipe" className='bartext'>간식 레시피 추천</Link>
                <Link to="/calendar" className='bartext'>캘린더</Link>
            </div>

            {/* ------------------------------------ */}
        </div>


    )
}

export default Logo