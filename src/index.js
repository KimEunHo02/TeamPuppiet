import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import App from './App';
import Main from './Main';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import Recipe from './page/Recipe';
import ImageDetail from './page/ImageDetail';
//import { AuthContextProvider } from './context/AuthContextProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    //<AuthContextProvider>
        <BrowserRouter>
            <Main />
        </BrowserRouter>
    //</AuthContextProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
