import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {} from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom/cjs/react-router-dom.min';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <App />
    </BrowserRouter>
  </React.StrictMode>
);