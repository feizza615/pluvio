import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import "@fontsource/poppins";
import HomePage from './mainPages/HomePage';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HomePage/>
  </React.StrictMode>
);

