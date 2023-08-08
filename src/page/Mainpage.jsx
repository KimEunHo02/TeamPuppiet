import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import picSrc from '../img/logo_name(x).png'
import logotext from '../img/logo_name.png'
import '../Main.module.css';
import '../Main.css'

import dietGif from '../images/diet.gif'; // 이미지 가져오기
import calendarGif from '../images/calendar.gif'; // 이미지 가져오기

// 유정) 로고 이미지 눌렀을 때 Main 화면 보이게 설정한 페이지입니다.

const Mainpage = () => {

    const textstyle = {
        fontWeight: 'bold',
        fontSize: '18px',
    };

    const Box = {
        width: '1200px',
        height: '150px',
        backgroundColor: 'white',

    }

    const imgbox = {
        width: '200px',
        height: '200px',
        backgroundColor: '#F0F0F0',
    }


    // 로그인하지 않은 상태이므로 메뉴바 눌렀을 때 로그인 페이지로 이동하게 설정
    const handleMenuClick = () => {
        alert("로그인이 필요합니다.");
        window.location.href = '/login'; // 로그인 페이지 경로로 변경
    };


    return (

        <div style={{ marginBottom: '44px' }}>

            {/* ----------- 상단바 ------------ */}

            <header style={{ backgroundColor: '#F0F0F0' }}
                className="header" >

                <div style={{
                    display: 'flex', alignItems: 'center',
                    justifyContent: 'space-between', padding: '10px'
                }}>

                    {/* 텍스트 이미지 */}
                    <div>
                        <img className='' src={logotext}
                            style={{ width: '150px', marginLeft: '30px' }}></img>
                    </div>

                    {/* 이미지 */}
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Link to='/'>
                            <img className='logo' src={picSrc} width='150px' alt="Logo"></img>
                        </Link>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Link to="/login" style={{ marginRight: '30px' }} className='maintext'>로그인</Link>
                        <Link to="/signup" style={{ marginRight: '30px' }} className='maintext'>회원가입</Link>
                    </div>

                </div>
            </header>

            {/* 타이틀 */}
            <div className='bar-container'>
                <Link href="#" onClick={handleMenuClick} className='bartext'>정보 보기</Link>
                <Link href="#" onClick={handleMenuClick} className='bartext'>사료 추천</Link>
                <Link href="#" onClick={handleMenuClick} className='bartext'>간식 레시피 추천</Link>
                <Link href="#" onClick={handleMenuClick} className='bartext'>캘린더</Link>
            </div>

            {/* ------------------------------------ */}

            {/* 서비스 소개 */}
            <div style={{
                marginLeft: '350px',
                marginRight: '350px'
            }}>

                <div style={{ ...Box }} className='maingraybox'>
                    <a className='additional'>서비스 소개</a>
                </div>

                {/* 반려견 다이어트 정보 */}
                <div style={{ height: '404px', width: '1200px', background: `url(${dietGif}) no-repeat center`, backgroundSize: 'cover' }}></div>

                {/* 이벤트 캘린더 이미지 */}
                <div style={{ height: '404px', width: '1200px', background: `url(${calendarGif}) no-repeat center`, backgroundSize: 'cover' }}></div>


                {/* 사료 추천 */}
                <div style={{ ...Box, height: '1050px' }} className='maintopbox'>
                    <a style={{ ...textstyle, margin: '50px' }} className='mainboxcontent'>사료 Top 10</a>

                    <div style={{
                        display: 'flex', flexDirection: 'row', justifyContent: 'space-between',
                        margin: '60px'
                    }}
                        className='mainboxcontainer'>
                        <div style={imgbox} className='mainboxcontent'>
                            <div className='imgboxcontent'>
                                제품명
                            </div>
                        </div>
                        <div style={imgbox} className='mainboxcontent'>
                            <div className='imgboxcontent'>
                                제품명
                            </div>
                        </div>
                        <div style={imgbox} className='mainboxcontent'>
                            <div className='imgboxcontent'>
                                제품명
                            </div>
                        </div>
                        <div style={imgbox} className='mainboxcontent'>
                            <div className='imgboxcontent'>
                                제품명
                            </div>
                        </div>
                        <div style={imgbox} className='mainboxcontent'>
                            <div className='imgboxcontent'>
                                제품명
                            </div>
                        </div>
                    </div>


                    {/* 간식 레시피 추천 */}
                    <a style={{ ...textstyle, margin: '50px' }} className='mainboxcontent'>간식 레시피 Top 10</a>

                    <div style={{
                        display: 'flex', flexDirection: 'row', justifyContent: 'space-between',
                        margin: '60px'
                    }}
                        className='mainboxcontainer'>
                        <div style={imgbox} className='mainboxcontent'>
                            <div className='imgboxcontent'>
                                레시피명
                            </div>
                        </div>
                        <div style={imgbox} className='mainboxcontent'>
                            <div className='imgboxcontent'>
                                레시피명
                            </div>
                        </div>
                        <div style={imgbox} className='mainboxcontent'>
                            <div className='imgboxcontent'>
                                레시피명
                            </div>
                        </div>
                        <div style={imgbox} className='mainboxcontent'>
                            <div className='imgboxcontent'>
                                레시피명
                            </div>
                        </div>
                        <div style={imgbox} className='mainboxcontent'>
                            <div className='imgboxcontent'>
                                레시피명
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    )
}

export default Mainpage