import React from 'react'
import { Link } from 'react-router-dom';
import picSrc from '../img/PUPPIET_logo.png'


const Mainpage2 = () => {
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
        
        <Link to="/petinfo" className='petinfo'>개견 정보</Link>
        <Link to="/login" className='login'>로그인</Link>
        <Link to="/signup" className='signUp'>회원가입</Link>

      </header>
    </div>
  )
}

export default Mainpage2