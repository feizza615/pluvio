import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Splash from './mainPages/WelcomePage/SplashScreen';
import styled from 'styled-components';
import "@fontsource/poppins";
import HomePage from './mainPages/HomePage/HomePage';
import { BrowserRouter,Routes, Route, useLocation } from 'react-router-dom';
import FriendsPage from './mainPages/FriendsPage/FriendsPage';
import MatchPage from './mainPages/MatchPage/MatchPage';
import ProfilePage from './mainPages/ProfilePage/ProfilePage';
import WelcomePage from './mainPages/WelcomePage/WelcomePage';
import SettingsPage from './mainPages/SettingsPage/SettingsPage';
import {HeaderTemp} from './components/HeaderComponent/Header';
import { Provider } from 'react-redux';
import store from "./app/store"
import { useSelector } from 'react-redux';
import { selectUser } from './features/userSlice';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import NavigationBar from './components/NavigationBarComponent/NavigationBar';
import PageNotFound from './mainPages/PageNotFound/PageNotFound';
import Protected from './Protected';
import MoviesPage from './mainPages/MoviesPage/MoviesPage';
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

const App = () => {

  return(
    <>
      <Provider store={store}>
      <PersistGate persistor={persistor}>
    <BrowserRouter>
      <HeaderTemp />
      <HomeContainer>
        <NavigationBar />
        <Routes>
          {/* <Route index element = {<WelcomePage/>}/> */}
          <Route path='/home/' element = {<Protected><HomePage/></Protected>}/>
          <Route path="/welcome" element = {<WelcomePage/>}/>
          <Route path="/friends/" element = {<Protected><FriendsPage/></Protected>}/>
          <Route path="/profile/:handle" element = {<Protected><ProfilePage/></Protected>}/>
          <Route path="/match/" element = {<Protected><MatchPage/></Protected>}/>
          <Route path="/movies/" element = {<Protected><MoviesPage/></Protected>}/>
          <Route path="/settings/" element = {<Protected><SettingsPage/></Protected>}/>
          <Route path ="*" element = {<PageNotFound/>}/>
          <Route index element = {<Splash/>}/>
        </Routes>
      </HomeContainer>
      </BrowserRouter>
    </PersistGate>
    </Provider>
    </>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
    <App />
);

