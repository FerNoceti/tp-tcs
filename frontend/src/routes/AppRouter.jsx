import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Anuncios from '../pages/Anuncios';
import Propiedades from '../pages/Propiedades';
import Duenos from '../pages/Duenos';
import Direcciones from '../pages/Direcciones';

const AppRouter = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/anuncios" element={<Anuncios />} />
    <Route path="/propiedades" element={<Propiedades />} />
    <Route path="/duenos" element={<Duenos />} />
    <Route path="/direcciones" element={<Direcciones />} />
  </Routes>
);

export default AppRouter;