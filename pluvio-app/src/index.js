import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import "@fontsource/poppins";
import HomePage from './mainPages/HomePage/HomePage';
import { BrowserRouter,Routes, Route } from 'react-router-dom';
import FriendsPage from './mainPages/FriendsPage/FriendsPage';
import MatchPage from './mainPages/MatchPage/MatchPage';
import ProfilePage from './mainPages/ProfilePage/ProfilePage';
import WelcomePage from './mainPages/WelcomePage/WelcomePage';
import Header from './components/HeaderComponent/Header';
import { Provider } from 'react-redux';
import store from "./app/store"

import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
//...
let persistor = persistStore(store);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
    <BrowserRouter>
      <Routes>
        <Route index element = {<WelcomePage/>}/>
        <Route path='/home/' element = {<HomePage/>}/>
        <Route path="/welcome/" element = {<WelcomePage/>}/>
        <Route path="/friends/" element = {<FriendsPage/>}/>
        <Route path="/profile/" element = {<ProfilePage/>}/>
        <Route path="/match/" element = {<MatchPage/>}/>
      </Routes>
    </BrowserRouter>
    </PersistGate>
    </Provider>

  </React.StrictMode>
);