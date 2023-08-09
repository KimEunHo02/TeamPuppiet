import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import picSrc from '../img/logo_name(x).png'
import logotext from '../img/logo_name.png'
import '../Main.module.css';
import '../Main.css'

import dietGif from '../images/diet.gif'; // 이미지 가져오기
import calendarGif from '../images/calendar.gif'; // 이미지 가져오기
import serviceGif from '../images/service.gif'; // 이미지 가져오기

// 유정) 로고 이미지 눌렀을 때 Main 화면 보이게 설정한 페이지입니다.

const Mainpage = () => {

    const textstyle = {
        fontWeight: 'bold',
        fontSize: '23px',
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

    const imageStyle = {
        width: '100%',
        height: 'auto',
        maxHeight: '100%'
      };


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
                        <h1 className='puppiettxt'>PUPPIET</h1>
                    </div>

                    {/* 이미지 */}
                    <div 
                    style={{marginRight: '94px' }}
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
            {/* 서비스 소개 */}
            <div style={{ height: '404px', width: '1200px', background: `url(${serviceGif}) no-repeat center`, backgroundSize: 'cover' }}></div>

                {/* 반려견 다이어트 정보 */}
                <div style={{ height: '404px', width: '1200px', background: `url(${dietGif}) no-repeat center`, backgroundSize: 'cover' }}></div>

                {/* 이벤트 캘린더 이미지 */}
                <div style={{ height: '404px', width: '1200px', background: `url(${calendarGif}) no-repeat center`, backgroundSize: 'cover' }}></div>
                
                {/* 사료 추천 */}
                <div style={{ ...Box, height: '900px'}}>
                    <br/>
                    <br/>
                    {/* 사료 추천 텍스트, 더보기 */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin: '50px' }}>
                        <a style={textstyle} className='mainboxcontent'>🍖 사료 추천 🍖</a>
                        <Link to={'/recipe'} className='more'>▷ 더보기</Link> 
                    </div>

                    <div style={{
                        display: 'flex', flexDirection: 'row', justifyContent: 'space-between',
                        margin: '60px'
                    }}
                        className='mainboxcontainer'>
                        <div style={imgbox} className='mainboxcontent'>
                           <img src='\img\사료.jpg' alt = '사료 임시 사진' style={imageStyle}/>
                            사료1
                        </div>
                        
                        <div style={imgbox} className='mainboxcontent'>
                           <img src='\img\사료.jpg' alt = '사료 임시 사진' style={imageStyle}/>
                            사료2
                        </div>

                        <div style={imgbox} className='mainboxcontent'>
                           <img src='\img\사료.jpg' alt = '사료 임시 사진' style={imageStyle}/>
                            사료3
                        </div>

                        <div style={imgbox} className='mainboxcontent'>
                           <img src='\img\사료.jpg' alt = '사료 임시 사진' style={imageStyle}/>
                            사료4
                        </div>

                        <div style={imgbox} className='mainboxcontent'>
                           <img src='\img\사료.jpg' alt = '사료 임시 사진' style={imageStyle}/>
                            사료5
                        </div>
                    </div>

                    <br/>

                    {/* 간식 레시피 추천 */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin: '50px' }}>
                        <a style={textstyle} className='mainboxcontent'>🦴 간식 레시피 🦴</a>
                        <Link to={'/recipe'} className='more'>▷ 더보기</Link> 
                    </div>

                    <div style={{
                        display: 'flex', flexDirection: 'row', justifyContent: 'space-between',
                        margin: '60px'
                    }}
                        className='mainboxcontainer'>


                        <div style={imgbox} className='mainboxcontent'>
                           <img src='\img\간식.jpg' alt = '간식 임시 사진' style={imageStyle}/>
                            간식1
                        </div>

                        <div style={imgbox} className='mainboxcontent'>
                           <img src='\img\간식.jpg' alt = '간식 임시 사진' style={imageStyle}/>
                            간식2
                        </div>

                        <div style={imgbox} className='mainboxcontent'>
                           <img src='\img\간식.jpg' alt = '간식 임시 사진' style={imageStyle}/>
                            간식3
                        </div>

                        <div style={imgbox} className='mainboxcontent'>
                           <img src='\img\간식.jpg' alt = '간식 임시 사진' style={imageStyle}/>
                            간식4
                        </div>

                        <div style={imgbox} className='mainboxcontent'>
                           <img src='\img\간식.jpg' alt = '간식 임시 사진' style={imageStyle}/>
                            간식5
                        </div>
                    </div>

                </div>

            </div>
        </div>
    )
}

export default Mainpage