import React from 'react';
import ReactDOM from 'react-dom/client';
//import './index.css';
import App from './App';
import StyleGlobal from './slyledGlobal';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <App />
    <StyleGlobal/>
  </>
);
