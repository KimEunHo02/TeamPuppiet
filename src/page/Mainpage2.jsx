import React from 'react'
import Login from '../pages/Login'
import Logo from './Logo'
import { Link } from 'react-router-dom';

const Mainpage2 = ({ mainArr }) => {

  let sessionData = sessionStorage.getItem('userId')
  console.log('session :', sessionData)

  const Box = {
    width: '1200px',
    height: '150px',
    backgroundColor: 'white',
    marginTop: '20px'
  }

  const imgbox = {
    width: '250px',
    height: '250px',
    marginRight: '20px',
    // flexShrink: 0 // 수정 필요(박스 고정)
  }
  const textstyle = {
    fontWeight: 'bold',
    fontSize: '23px',
  };

  const imageStyle = {
    width: '100%',
    height: 'auto',
    maxHeight: '100%',
  };

  return (
    <div style={{ marginBottom: '30px' }}>
      <Logo />

      {/* 다이어트 정보 표시 영역 */}
      <div style={{
        marginLeft: '350px',
        marginRight: '350px'
      }}>
        <div style={{ ...Box, height: '500px' }} className='maingraybox'>
          <a className='additional'>다이어트 정보 표시 영역</a>
        </div>

        {/* 사료 추천 */}
        <div style={{ ...Box, height: '900px' }}>
          <br />
          <br />
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
              <img src='\img\사료.jpg' alt='사료 임시 사진' style={imageStyle} />
              사료1
            </div>

            <div style={imgbox} className='mainboxcontent'>
              <img src='\img\사료.jpg' alt='사료 임시 사진' style={imageStyle} />
              사료2
            </div>

            <div style={imgbox} className='mainboxcontent'>
              <img src='\img\사료.jpg' alt='사료 임시 사진' style={imageStyle} />
              사료3
            </div>
          </div>


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
              <img src='\img\간식.jpg' alt='간식 임시 사진' style={imageStyle} />
              간식1
            </div>

            <div style={imgbox} className='mainboxcontent'>
              <img src='\img\간식.jpg' alt='간식 임시 사진' style={imageStyle} />
              간식2
            </div>

            <div style={imgbox} className='mainboxcontent'>
              <img src='\img\간식.jpg' alt='간식 임시 사진' style={imageStyle} />
              간식3
            </div>
          </div>

        </div>

        {sessionData == 'puppiet'
          ? <p></p>
          : <p>로그인이 필요합니다.</p>}
        {mainArr.map(item => <Login key={item.url} obj={item} />)}
      </div>
    </div>
  )
}

export default Mainpage2