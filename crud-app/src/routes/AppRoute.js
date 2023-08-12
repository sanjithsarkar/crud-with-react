import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from '../Pages/HomePage';
import CreateUser from '../Pages/Create';
import EditUser from '../Pages/Edit';

const AppRoute = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path='/create/user' element={<CreateUser />} />
        <Route path='/user/:id' element={<EditUser />} />

      </Routes>
    </Router>
  );
};

export default AppRoute;