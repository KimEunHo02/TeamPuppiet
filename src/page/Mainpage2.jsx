import React,{useState, useEffect} from 'react'
import Login from '../pages/Login'
import Logo from './Logo'

import door from '../main2Image/door.png'
import kongsoon from '../main2Image/kongsoon2.png'
import feedicon from '../main2Image/feedicon.png'
import exerciseicon from '../main2Image/exerciseicon.png'


const Mainpage2 = ({ mainArr }) => {

  let sessionData = sessionStorage.getItem('userId')
  console.log('session :', sessionData)

  // 스크롤 위치 상태 추가
  const[scrollY, setScrollY]=useState(0)

  const handleScroll = () =>{
    setScrollY(window.scrollY)
  }

  useEffect(()=>{
    window.addEventListener('scroll', handleScroll)
    
    return () =>{
      window.removeEventListener('scroll', handleScroll)
    }
  },[])


 const Box = {
        width: '1200px',
        height: '150px',
        backgroundColor: 'white',
        marginTop: '20px'
    }

  const imgbox = {
    width: '250px',
    height: '250px',
    backgroundColor: '#F0F0F0',
    marginRight: '20px', 
    // flexShrink: 0 // 수정 필요(박스 고정)
}
  const textstyle = {
    fontWeight: 'bold',
    fontSize: '18px',
  }

  const kongsoonStyle = {
    width:'650px',
    height:'auto', 
    position:'absolute', 
    marginRight:'420px',
    marginTop:scrollY > 100 ? '250px' : '300px',
    right : scrollY > 100 ? '50px' : '190px',
    zIndex:1,
    transition:'margin-top 0.3s ease-in-out, right 0.3s ease-in-out' //부드러운 변화를 위한 트랜지션
  }

  const overlayStyle = {
    posiiton:'absolute',
    top:'0',
    left:'0',
    marginLeft:'-1000px',
    // margintop:'-700px',
    width: '200px',
    height:'700px',
    backgroundColor:'#FAE9BF',
    zIndex:3
  }

  return (
    <div style={{marginBottom: '30px'}}>
      <Logo />

      {/* 다이어트 정보 표시 영역 */}
      <div style={{marginLeft : '350px',
                        marginRight : '350px'}}>
      <div style={{ ...Box, height: '700px', marginTop:'0px' ,backgroundColor:'#FAE9BF', display: 'flex', flexDirection: 'row', alignItems: 'flex-start', position:'relative'}} className='maingraybox'>
        {/* 이미지 영역 */}
        {/* <div style={{display:'flex', flexDirection:'column', alignItems:'flex-start'}}> */}
          <div style={{zIndex:1, flex:5}}>
            <img src={door} style={{width:'330px', marginTop:'104px', marginLeft:'-270px'}}></img>
            <img src={kongsoon} style={kongsoonStyle}></img>
          </div>
          <div style={overlayStyle}></div>
        
        {/* 콘텐트 영역 */}
        <div style={{flex:5}}>
          <h2 style={{marginTop:'150px', marginLeft:'400px', fontWeight:'bold'}}>
            우리 콩순이는 과체중이에요<br/>
            평균 체중까지 1.5kg 감량이 필요해요
          </h2>
          <div style={{display: 'flex', alignItems: 'center',marginTop:'100px', marginLeft:'480px'}}>
            <img src={feedicon} style={{width:'100px'}}/>
            <h4 style={{marginLeft:'10px', fontWeight:'bold'}}>
              권장하는 일일 사료량은 70g이에요<br/>
              하루에 두 번 나누어 주세요
            </h4>
          </div>

          <div style={{display: 'flex', alignItems: 'center',marginTop:'50px', marginLeft:'580px'}}>
            <h4 style={{fontWeight:'bold'}}>
              권장하는 하루 소모<br/>
              칼로리는 500kcal이에요
            </h4>
            <img src={exerciseicon} style={{width:'100px', marginLeft:'10px'}}/>
          </div>
          
        </div>
        {/* </div> */}
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