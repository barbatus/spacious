import React from 'react';
import { useNavigate, Outlet, useLocation } from 'react-router-dom';
import styled from 'styled-components/macro';

import { CSSTransition } from 'react-transition-group';

import ClipLoader from 'react-spinners/ClipLoader';

import { Circle } from '~/components/buttons';
import { Grid, Tile } from '~/components/grid';

import { usePlanets } from './graphql/hooks';
import { PlanetSvg } from './PlanetSvg';

const SidebarContainer = styled.div`
  grid-row: 1 / span 2;
  grid-column: 2;
`;

const GridContainer  = styled.div`
  position: relative;
`

const AddButton = styled(Circle)`
  right: 32px;
  bottom: 0;
`;

const Loader = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

const PlanetTile = styled(Tile)`
  &.item-enter-active {
    animation: new 1s infinite;
  }
  @keyframes new {
    from {background-color: #ffffc8;}
    to {background-color: white;}
  }
`;

export const Planets = React.memo(() => {
  const { planets, loaded, loading } = usePlanets();
  const navigate = useNavigate();
  const location = useLocation();

  const items = planets.map((planet) => (
      <CSSTransition 
        key={planet.id}
        timeout={1000}
        classNames="item"
      >
        <PlanetTile
          {...planet}
          key={planet.id}
          hint={`Pop. ${planet.population}`}
          imgFallback={<PlanetSvg id={planet.id} />}
          to={`/planets/${planet.id}`}
        />
      </CSSTransition>
  ));

  const onAddCallback = React.useCallback(() => {
    navigate(`${location.pathname}/create`);
  }, [location, navigate]);

  return (
    <React.Fragment>
      <GridContainer>
        <Grid enter={loaded}>
          {items}
        </Grid>
        <AddButton onClick={onAddCallback} />
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
