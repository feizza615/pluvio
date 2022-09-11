import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import "@fontsource/poppins";
import HomePage from './mainPages/HomePage/HomePage';
import { BrowserRouter,Routes, Route } from 'react-router-dom';
import FriendsPage from './mainPages/FriendsPage/FriendsPage';
import MatchPage from './mainPages/MatchPage/MatchPage';
import ProfilePage from './mainPages/ProfilePage/ProfilePage';
import WelcomePage from './mainPages/WelcomePage/WelcomePage';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route index element = {<HomePage/>}/>
        <Route path='/home/' element = {<HomePage/>}/>
        <Route path="/welcome/" element = {<WelcomePage/>}/>
        <Route path="/friends/" element = {<FriendsPage/>}/>
        <Route path="/profile/" element = {<ProfilePage/>}/>
        <Route path="/match/" element = {<MatchPage/>}/>
      </Routes>
    </BrowserRouter>

  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
