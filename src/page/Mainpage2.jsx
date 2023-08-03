import React from 'react'
import Login from '../pages/Login'

const Mainpage2 = ({mainArr}) => {
  let sessionData = sessionStorage.getItem('userId')
  console.log('session :', sessionData)

  return (
    <div>
      {sessionData == 'puppiet'
      ? <p>app쁘조님 환영합니다! 메인2 페이지입니다</p>
      : <p>로그인이 필요합니다.</p>}
      {mainArr.map(item => <Login key={item.url} obj={item} />)}
    </div>
  )
}

export default Mainpage2