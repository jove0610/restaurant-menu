import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Category from './pages/category/Category';
import Error404 from './components/Error404';
import Menu from './pages/menu/Menu';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<Navigate to="menu" />} />
        <Route path="category" element={<Category />} />
        <Route path="menu" element={<Menu />} />
      </Route>

      <Route path="*" element={<Error404 />} />
    </Routes>
  );
}

export default AppRoutes;
