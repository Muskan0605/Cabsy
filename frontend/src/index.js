import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter} from 'react-router-dom';
import UserContext from './context/UserContext';
import CaptainContext from './context/CaptainContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <CaptainContext>
    <UserContext>
      <BrowserRouter>
        <App/>
     </BrowserRouter>
    </UserContext>
  </CaptainContext>
  </React.StrictMode>
);


