import React from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import styled from 'styled-components/macro';

import { Grid, Tile } from '~/components/grid';

import { usePlanets } from './graphql/hooks';

// import { ReactComponent as Test } from  './assets/planet-1.svg';

const GridContainer  = styled.div`
  position: relative;
`
export const Planets = React.memo(() => {
  const { planets, loading } = usePlanets();
  const navigate = useNavigate();

  const items = planets.map((planet) => (
    <Tile
      {...planet}
      key={planet.id}
      hint={`Pop. ${planet.population}`}
      imgFallback={<PlanetSvg id={planet.id} />}
      to={`/planets/${planet.id}`}
    />
  ));

  return (
    <React.Fragment>
      <GridContainer>
        <Grid>{items}</Grid>
      </GridContainer>
    </React.Fragment>
  );
});
