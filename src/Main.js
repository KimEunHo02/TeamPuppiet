import React from 'react'
import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';


import Mainpage from './page/Mainpage';
import Feed from './page/Feed';
import Recipe from './page/Recipe';
import Calendar from './page/Calendar';
import Mainpage2 from './page/Mainpage2';
import Mypage from './page/Mypage';
import Mypage2 from './page/Mypage2'

import Signup from './pages/Signup';
import Login from './pages/Login';
import Petinfo from './pages/Petinfo';

import ImageDetail from './page/ImageDetail';
import ImageDetailFeed from './page/ImageDetailFeed';

import styles from './css/Main.module.css';
import './font.css'


// 유정) 메인 페이지 화면입니다

const Main = () => {

    // 로그인 페이지 Map 함수 호출 (Mainpage2)
    const [mainArr, setMainArr] = useState([])

    return (

        <div className={styles.container} id='font'>

            {/* 페이지 이동할 수 있도록 경로 설정 */}
            <Routes>
                <Route path='/' element = {<Mainpage/>}></Route>
                <Route path='/login' element = {<Login/>}></Route>
                <Route path='/signup' element = {<Signup/>}></Route>
                <Route path='/feed/*' element = {<Feed/>}></Route>
                <Route path='/recipe/*' element = {<Recipe/>}></Route>
                <Route path='/calendar' element = {<Calendar/>}></Route>
                <Route path='/petinfo' element = {<Petinfo/>}></Route>
                <Route path='/main2' element = {<Mainpage2 mainArr={mainArr}/>}></Route>
                <Route path='/mypage' element = {<Mypage/>}></Route>
                <Route path='/mypage2' element = {<Mypage2/>}></Route>
                <Route path='/ImageDetail/:recipeId' element={<ImageDetail/>}></Route>
                <Route path='/ImageDetailFeed/:feedId' element={<ImageDetailFeed/>}></Route>
            </Routes>

            <footer></footer>

        </div>
    )
}

export default Main;