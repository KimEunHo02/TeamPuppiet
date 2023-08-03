import React from 'react'
import Boxs from './Boxs'
import { Link } from 'react-router-dom';
import picSrc from '../img/PUPPIET_logo.png'


// 유정) 로고 이미지 눌렀을 때 Main 화면 보이게 설정한 페이지입니다.

const Mainpage = () => {

    const textstyle = {
        fontWeight: 'bold',
        fontSize: '18px',
    };

    return (
        <div>

            {/* ----------- 상단바 ------------ */}
            <header className="header">

                {/* 이미지 */}

                <Link to='/'>
                    <img className='logo'
                        src={picSrc}
                        width='150px'>
                    </img>
                </Link>

                {/* 타이틀 */}
                <Link to="/information" className='bartext'>반려견 정보</Link>
                <Link to="/feed" className='bartext'>사료 추천</Link>
                <Link to="/recipe" className='bartext'>간식 레시피 추천</Link>
                <Link to="/calendar" className='bartext'>캘린더</Link>

                <Link to="/login" className='login'>로그인</Link>
                <Link to="/signup" className='signUp'>회원가입</Link>

            </header>

            {/* ------------------------------------ */}

            {/* 서비스 소개 */}

            <Boxs />

            <br />

            {/* 다이어트 정보 예시 */}

            <Boxs />

            <br />

            {/* 이벤트 캘린더 */}

            <Boxs />

            <br />

            {/* 사료 추천 */}

            <a style={textstyle}>사료 Top 10</a>
            <Boxs />

            <br />

            {/* 간식 레시피 추천 */}

            <a style={textstyle}>간식 레시피 Top 10</a>
            <Boxs />

        </div>
    )
}

export default Mainpage