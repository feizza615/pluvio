import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import styled from 'styled-components';
import "@fontsource/poppins";
import HomePage from './mainPages/HomePage/HomePage';
import { BrowserRouter,Routes, Route, useLocation } from 'react-router-dom';
import FriendsPage from './mainPages/FriendsPage/FriendsPage';
import MatchPage from './mainPages/MatchPage/MatchPage';
import ProfilePage from './mainPages/ProfilePage/ProfilePage';
import WelcomePage from './mainPages/WelcomePage/WelcomePage';
import Header from './components/HeaderComponent/Header';
import { Provider } from 'react-redux';
import store from "./app/store"

import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import NavigationBar from './components/NavigationBarComponent/NavigationBar';
//...
let persistor = persistStore(store);

export const HomeContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr 1fr;
  padding: 5vh 15vw;
  height: auto;
  justify-content: space-between;
  gap: 20px;
  box-sizing: border-bow;
  
  @media (max-width: 1300px) {
    padding: 5vh 5vw;
  }

  @media (max-width: 768px) {
    padding: 10px;
    display: block;
  }
`;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
    <Provider store={store}>
      <PersistGate persistor={persistor}>
    <BrowserRouter>
      <Header />
      <HomeContainer>
      <NavigationBar />
        <Routes>
          <Route index element = {<WelcomePage/>}/>
          <Route path='/home/' element = {<HomePage/>}/>
          <Route path="/" element = {<WelcomePage/>}/>
          <Route path="/friends/" element = {<FriendsPage/>}/>
          <Route path="/profile/" element = {<ProfilePage/>}/>
          <Route path="/match/" element = {<MatchPage/>}/>
        </Routes>
      </HomeContainer>
    </BrowserRouter>
    </PersistGate>
    </Provider>

  
);