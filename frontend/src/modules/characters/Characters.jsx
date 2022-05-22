import React from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components/macro';

import { Grid, Tile } from '~/components/grid';

import { useCharacters } from './graphql/hooks';

const SidebarContainer = styled.div`
  grid-row: 1 / span 2;
  grid-column: 2;
`;

export const Characters = React.memo(() => {
  const { characters } = useCharacters();

  const items = characters.map(({ friendsCount, ...character }) => (
    <Tile
      key={character.id}
      {...character}
      hint={` ${friendsCount}   friend${friendsCount > 1 ? 's' : ''}`}
      to={`/characters/${character.id}`}
    />
  ));

  return (
    <React.Fragment>
      <Grid>{items}</Grid>
      <SidebarContainer>
        <Outlet />
      </SidebarContainer>
    </React.Fragment>
  );
});
