import React from 'react';
import {
  Routes,
  Route,
  useLocation,
  Navigate,
} from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';

import { Planets, Planet, CreatePlanet } from '../planets';

import { Layout } from './Layout';

export const Router = () => {
  const location = useLocation();
  return (
    <Routes location={location}>
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="planets" />} />
        <Route path="planets" element={<Planets />}>
          <Route path="create" exact element={<CreatePlanet />} />
          <Route path=":planetId" exact element={<Planet />} />
        </Route>
      </Route>
    </Routes>
  );
};
