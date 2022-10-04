import reportWebVitals from './reportWebVitals';
import React from 'react';
import ReactDOM from 'react-dom/client';
import styled from 'styled-components';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { colors } from './config';


// Page and component import
import Home from './pages/Home/index.home';
import Signup from './pages/Signup/index.signup';
import Header from './components/Header/index.header';
import Error from './components/Error/index.error';
import Profil from './pages/Profil/index.profil';
import Login from './pages/Login/index.login';

// Style import
import './normalize.css';
import './style.css';

// Layout style
const StyledLayout = styled.div`
    max-width: 1440px;
    margin: auto;
    @media screen and (min-width: 1440px) {
      box-shadow: 2px 4px 8px ${colors.boxShadow};
      border-radius: 0 0 10px 10px;
    }
`;
const StyledMain = styled.div`
  padding: 15px;
`;

// React Router DOM
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>   
    <StyledLayout>
      <Header />
      <StyledMain>
        <Routes>
          <Route path='*' element={ <Error /> } />
          <Route path='/' element={ <Home /> } />
          <Route path='/signup' element={ <Signup /> } />
          <Route path='/profil' element={ <Profil /> } />
          <Route path='/login' element={ <Login /> } />
        </Routes>
      </StyledMain>
    </StyledLayout>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
