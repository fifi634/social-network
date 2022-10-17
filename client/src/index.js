import reportWebVitals from './reportWebVitals';
import React from 'react';
import ReactDOM from 'react-dom/client';
import styled from 'styled-components';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { colors } from './config';
// Page and component import
import Home from './pages/Home/index.home';
import Signup from './pages/User/signup.user';
import Header from './components/Header/index.header';
import Error from './components/Error/index.error';
import Profil from './pages/User/profil.user';
import Login from './pages/Login/index.login';
import { UidProvider } from './utils/context';
import  EditPost from './pages/Post/edit.post';
// Style import
import './normalize.css';
import './style.css';
// Redux
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { applyMiddleware, legacy_createStore as createStore } from 'redux';
import rootReducer from './reducers/index.reducer';
import { getUsers } from './action/users.action';
// Dev Tools
import { composeWithDevTools } from 'redux-devtools-extension';


// Get all data by Redux
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
store.dispatch(getUsers());

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
  <Provider store={store}>
    <UidProvider>
      <BrowserRouter>   
        <StyledLayout>
          <Header />
          <StyledMain>
            <Routes>
              <Route path='*' element={ <Error /> } />
              <Route path='/' element={ <Login /> } />
              <Route path='/signup' element={ <Signup /> } />
              <Route path='/profil' element={ <Profil /> } />
              <Route path='/home' element={ <Home /> } />
              <Route path='/edit-post' element={ <EditPost /> } />
            </Routes>
          </StyledMain>
        </StyledLayout>
      </BrowserRouter>
    </UidProvider>
  </Provider>,
);




// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
