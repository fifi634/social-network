import reportWebVitals from './reportWebVitals';
import React from 'react';
import ReactDOM from 'react-dom/client';
import styled from 'styled-components';
import { BrowserRouter, Routes, Route } from 'react-router-dom';


// Page and component import
import Home from './pages/Home';
import Signup from './pages/Signup';
import Header from './components/Header';
import Error from './components/Error';

// Style import
import './normalize.css';
import './style.css';

// Layout style
const StyledLayout = styled.div`
    max-width: 1440px;
    margin: auto;
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
          <Route path='/' element={ <Home /> } />
          <Route path='/signup' element={ <Signup /> } />
          <Route path='*' element={ <Error /> } />
        </Routes>
      </StyledMain>
    </StyledLayout>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
