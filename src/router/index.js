import React from 'react';
import { Route, Routes } from 'react-router-dom';
import MainPage from '../pages/MainPage';
import Partidas from '../pages/Partidas';
import Ranking from '../pages/Ranking';
import NotFound from '../pages/NotFound';

function Router() {
  return (
    <Routes>
        <Route exact path="/" element={<MainPage />} />
        <Route exact path="/ranking" element={<Ranking />} />
        <Route exact path="/partidas" element={<Partidas />} />
        <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default Router;