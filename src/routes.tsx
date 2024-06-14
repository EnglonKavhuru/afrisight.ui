// src/routes.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/Login.page';
import HomePage from './pages/Home.page';


const AppRoutes: React.FC = () => {
  return (
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
      </Routes>
  );
};

export default AppRoutes;
