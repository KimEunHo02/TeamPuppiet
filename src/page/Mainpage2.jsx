import React from 'react'
import { Link } from 'react-router-dom';
import picSrc from '../img/PUPPIET_logo.png'


const Mainpage2 = () => {

  const Box = {
    border: '2px solid white',
    padding: '20px',
    marginBottom: '10px',
    backgroundColor: 'lightgray',
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    maxWidth: '100%'
  }

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

        <Link to="/petinfo" className='main2txt'>개견 정보</Link>
        <Link to="/mypage" className='main2txt'>마이페이지</Link>
        <Link to="/" className='main2txt'>로그아웃</Link>

      </header>

      {/* ------------------------------------ */}

      {/* 다이어트 정보 표시 영역 */}

      <div style={{ ...Box, width: '3000px', height: '500px' }}>
        <a className='additional'>다이어트 정보 표시 영역</a>
      </div>

      {/* 사료 추천 */}
      <a style={textstyle}>사료 추천</a>
      <div style={{ ...Box, width: '3000px', height: '200px' }}>
      </div>

      {/* 사료 추천 */}
      <a style={textstyle}>간식 레시피 추천</a>
      <div style={{ ...Box, width: '3000px', height: '200px' }}>
      </div>
    </div>
  )
}

export default Mainpage2