import React from 'react';

import { usePlanets } from './graphql/hooks';
import { PlanetSvg } from './PlanetSvg';

import { GridLayout } from '../routes/GridLayout';

export const Planets = React.memo(() => {
  const { planets, loaded, loading, error } = usePlanets();

  const items = planets.map((planet) => ({
    ...planet,
    to: `/planets/${planet.id}`,
    hint: `Pop. ${planet.population}`,
    imgFallback: <PlanetSvg id={planet.id} />
  }));

  return (
    <GridLayout items={items} error={error} loading={loading} loaded={loaded} />
  );
});
