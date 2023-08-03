import React from 'react'
import { Link } from 'react-router-dom';


const Findpw = () => {
  
  const box2 = {
  border: '3px solid #cccccc',
  margin: '0 auto',
  padding: '20px',
  width: '800px',
}

return (

  <div>
   
    <div style={{ display: 'flex', justifyContent: 'center' }}>

      <Link to="/findid" className= 'hideTitle'>아이디 찾기</Link>
      <span className='findTitle'>비밀번호 찾기</span>

    </div>
    
    {/* 가장 바깥 박스 */}
    <div style={box2}>

      <a style={{ fontSize: '17px', fontWeight: 'bold' }}>
        본인확인 이메일로 인증</a>

      <br /><br />

      <a style={{ fontSize: '13px' }}>
        본인확인 이메일 주소와 입력한 이메일 주소가 같아야 인증번호를 받을 수 있습니다.</a>

    </div>
  </div>

)
}

export default Findpw