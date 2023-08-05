import React from 'react'
import { Link } from 'react-router-dom';
import picSrc from '../img/logo_name(x).png'


const Recipe = () => {

  const box1 = {
    margin: '0 auto',
    padding: '20px',
    width: '800px',
    height: '300px',
    backgroundColor: 'white',
    marginBottom: '100px',
    borderRadius: '20px',
    padding: '20px',
    textAlign: 'center',
    fontSize: '19px',
    fontWeight: 'bold',
  }

  return (
    <div style={{backgroundColor : '#F0F0F0'}}>
      {/* ----------- 상단바 ------------ */}

      <header style={{ backgroundColor: '#F0F0F0' }} className="header" >

        <div style={{
          display: 'flex', alignItems: 'center',
          justifyContent: 'space-between', padding: '10px'
        }}>
          {/* 텍스트 */}
          <div>
            <h1 style={{ fontSize: '30px' }} className='puppiettxt'>PUPPIET</h1>
          </div>

          {/* 이미지 */}
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Link to='/'>
              <img className='logo' src={picSrc} width='150px' alt="Logo"></img>
            </Link>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          {/* 개견정보, 마이페이지, 로그아웃 (로고 + 링크) */}
          <Link to="/main2" style={{ marginRight: '30px' }} className='maintext'>반려견 정보</Link>
          <Link to="/mypage" style={{ marginRight: '30px' }} className='maintext'>마이페이지</Link>
          <Link to="/main2" style={{ marginRight: '30px' }} className='maintext'>로그아웃</Link>

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

      {/* ------------------------------------- */}
      {/* 재료 선택 */}
      <div style={{...box1, marginTop : '20px'}}>
        <p>재료를 선택해 주세요.</p>
      </div>

      {/* n개의 간식 레시피 추천 */}

    </div>

  )
}

export default Recipe