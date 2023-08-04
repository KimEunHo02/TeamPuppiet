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
      <Logo/>

      {/* 다이어트 정보 표시 영역 */}

      <div style={{ ...Box, width: '3000px', height: '500px' }}>
        <a className='additional'>다이어트 정보 표시 영역</a>
      </div>

      {/* 사료 추천 */}
      <a style={textstyle}>사료 추천</a>
      <div style={{ ...Box, width: '3000px', height: '200px' }}>
      </div>

      {/* 간식 레시피 추천 */}
      <a style={textstyle}>간식 레시피 추천</a>
      <div style={{ ...Box, width: '3000px', height: '200px' }}>
      </div>


      {sessionData == 'puppiet'
        ? <p></p>
        : <p>로그인이 필요합니다.</p>}
      {mainArr.map(item => <Login key={item.url} obj={item} />)}
    </div>
  )
}

export default Mainpage2