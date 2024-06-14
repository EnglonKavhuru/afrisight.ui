import React from 'react';
import logo from './logo.svg';
import './assess/login.css'
import './assess/home.css'
import { BrowserRouter, Route } from 'react-router-dom';
import AppRoutes from './routes';

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}


export default App;