import React from 'react'
import { Link } from 'react-router-dom';
import picSrc from '../img/logo_name(x).png'
import '../Main.css'


// 유정) 로고 이미지 눌렀을 때 Main 화면 보이게 설정한 페이지입니다.

const Mainpage = () => {

    const textstyle = {
        fontWeight: 'bold',
        fontSize: '18px',
    };

    const Box = {
        border: '2px solid white',
        weight: '1940px',
        height: '150px',
        backgroundColor: '#F0F0F0',
        textAlign: 'center',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }
    
    const imgbox = {
        width: '200px',
        height: '200px',
        backgroundColor: 'white',
        marginRight: '20px',
      }
    
    return (
        <div>

            {/* ----------- 상단바 ------------ */}

            <header style = {{backgroundColor: '#F0F0F0'}} className="header" >

            <div style={{
                display: 'flex', alignItems: 'center',
                justifyContent: 'space-between', padding: '10px'
            }}>
                {/* 텍스트 */}
                <div>
                <h1 style={{ fontSize: '30px'}} className='puppiettxt'>PUPPIET</h1>
                </div>

                {/* 이미지 */}
                <div style={{ display: 'flex', alignItems: 'center' }}>
                <Link to='/'>
                    <img className='logo' src={picSrc} width='150px' alt="Logo"></img>
                </Link>
                </div>
                <div style = {{ display: 'flex', justifyContent : 'space-between'}}>
                    <Link to="/login" style={{ marginRight: '30px' }} className='maintext'>로그인</Link>
                    <Link to="/signup" style={{ marginRight: '30px' }} className='maintext'>회원가입</Link>
                </div>
                </div>
            </header>

            {/* 타이틀 */}
            <div className='bar-container'>
            <Link to="/information" className='bartext'>정보 보기</Link>
            <Link to="/feed" className='bartext'>사료 추천</Link>
            <Link to="/recipe" className='bartext'>간식 레시피 추천</Link>
            <Link to="/calendar" className='bartext'>캘린더</Link>
            </div>

            {/* ------------------------------------ */}
            {/* 서비스 소개 */}
            <br/>

            <div style={{ ...Box }}>
                <a className='additional'>서비스 소개</a>
            </div>

            <br />

            {/* 다이어트 정보 예시 */}

            <div style={{ ...Box }}>
                <a className='additional'>다이어트 정보 예시</a>
            </div>

            <br />

            {/* 이벤트 캘린더 */}

            <div style={{ ...Box }}>
                <a className='additional'>Event 캘린더</a>
            </div>

            <br />

            {/* 사료 추천 */}

            <a style={{...textstyle}}>사료 Top 10</a>
            <div style={{ ...Box }}>
                
                {/* <div style={imgbox}/>
                <div style={imgbox}/>
                <div style={imgbox}/>
                <div style={imgbox}/>
                <div style={imgbox}/> */}
                
                <div>
                <a className='additional'>간식 레시피 추천</a>
                </div>
            </div>

            <br />

            {/* 간식 레시피 추천 */}

            <a style={textstyle}>간식 레시피 Top 10</a>
            <div style={{ ...Box }}>
                
            </div>

        </div>
    )
}

export default Mainpage