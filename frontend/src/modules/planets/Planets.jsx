import React from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import styled from 'styled-components/macro';

import ClipLoader from 'react-spinners/ClipLoader';

import { Grid, Tile } from '~/components/grid';

import { usePlanets } from './graphql/hooks';

// import { ReactComponent as Test } from  './assets/planet-1.svg';

const SidebarContainer = styled.div`
  grid-row: 1 / span 2;
  grid-column: 2;
`;

const GridContainer  = styled.div`
  position: relative;
`

const Loader = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

export const Planets = React.memo(() => {
  const { planets, loading } = usePlanets();
  const navigate = useNavigate();

  const items = planets.map((planet) => (
    <Tile
      {...planet}
      key={planet.id}
      hint={`Pop. ${planet.population}`}
      to={`/planets/${planet.id}`}
    />
  ));

  return (
    <React.Fragment>
      <GridContainer>
        <Grid>{items}</Grid>
        <Loader>
          {loading && <ClipLoader size={64} />} 
        </Loader>
      </GridContainer>
      <SidebarContainer>
        <Outlet />
      </SidebarContainer>
    </React.Fragment>
  );
});
