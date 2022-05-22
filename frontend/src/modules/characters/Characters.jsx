import React from 'react';
import { useNavigate, Outlet, useLocation } from 'react-router-dom';
import styled from 'styled-components/macro';

import ClipLoader from 'react-spinners/ClipLoader';

import { Circle } from '~/components/buttons';
import { Grid, Tile } from '~/components/grid';

import { useCharacters } from './graphql/hooks';

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

export const Characters = React.memo(() => {
  const { characters, loading } = useCharacters();
  const navigate = useNavigate();
  const location = useLocation();

  const items = characters.map(({ friendsCount, ...character }) => (
    <Tile
      {...character}
      key={character.id}
      hint={`${friendsCount} friend${friendsCount > 1 ? 's' : ''}`}
      to={`/characters/${character.id}`}
    />
  ));

  const onAddCharacter = React.useCallback(() => {
    navigate(`${location.pathname}/create`);
  }, [location, navigate]);

  return (
    <React.Fragment>
      <Grid>{items}</Grid>
      <GridContainer>
        <AddButton onClick={onAddCharacter} />
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
