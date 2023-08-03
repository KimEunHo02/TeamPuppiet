import React from 'react'
import './Main.css';
import { Routes, Route } from 'react-router-dom';
import Login from './page/Login';
import Signup from './page/Signup';
import Mainpage from './page/Mainpage';
import Information from './page/Information';
import Feed from './page/Feed';
import Recipe from './page/Recipe';
import Calendar from './page/Calendar';
import Petinfo from './page/Petinfo';
import Findpw from './page/Findpw';
import FindId from './page/FindId';


// 유정) 메인 페이지 화면입니다

const Main = () => {

    return (

        <div>
            

        {/* 페이지 이동할 수 있도록 경로 설정 */}
            <Routes>
                <Route path='/' element = {<Mainpage/>}></Route>
                <Route path='/login' element = {<Login/>}></Route>
                <Route path='/signup' element = {<Signup/>}></Route>
                <Route path='/information' element = {<Information/>}></Route>
                <Route path='/feed' element = {<Feed/>}></Route>
                <Route path='/recipe' element = {<Recipe/>}></Route>
                <Route path='/calendar' element = {<Calendar/>}></Route>
                <Route path='/petinfo' element = {<Petinfo/>}></Route>
                <Route path='/findid' element = {<FindId/>}></Route>
                <Route path='/findpw' element = {<Findpw/>}></Route>

            </Routes>


        <footer></footer>

        </div>
    )
}

export default Main