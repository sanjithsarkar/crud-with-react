import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from '../Pages/HomePage';
import CreateUser from '../Pages/Create';

const AppRoute = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path='/create/user' element={<CreateUser />} />

      </Routes>
    </Router>
  );
};

export default AppRoute;