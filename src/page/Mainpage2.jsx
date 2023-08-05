import React from 'react'
import Login from '../pages/Login'
import Logo from './Logo'


const Mainpage2 = ({ mainArr }) => {

  let sessionData = sessionStorage.getItem('userId')
  console.log('session :', sessionData)

  const Box = {
    border: '2px solid white',
    padding: '20px',
    marginBottom: '10px',
    backgroundColor: '#F0F0F0',
    // textAlign: 'center',
    // display: 'flex',
    // justifyContent: 'center',
    // alignItems: 'center',
    // maxWidth: '100%'
  }

  const imgbox = {
    width: '250px',
    height: '250px',
    backgroundColor: 'white',
    marginRight: '20px', 
    // flexShrink: 0 // 수정 필요(박스 고정)
}
  const textstyle = {
    fontWeight: 'bold',
    fontSize: '18px',
  };
  return (
    <div>
      <Logo />

      {/* 다이어트 정보 표시 영역 */}

      <div style={{ ...Box, height: '500px' }} className='maingraybox'>
        <a className='additional'>다이어트 정보 표시 영역</a>
      </div>

      {/* 사료 추천 */}

      <div style={{ ...Box, height: '1250px' }} className='maintopbox'>
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