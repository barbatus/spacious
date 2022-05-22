import React from 'react';

import { GridLayout } from '../routes/GridLayout';
import { useCharacters } from './graphql/hooks';

export const Characters = React.memo(() => {
  const { characters, loaded, loading, error } = useCharacters();

  const items = characters.map(({ friendsCount, ...character }) => ({
    ...character,
    to: `/characters/${character.id}`,
    hint: `${friendsCount} friend${friendsCount > 1 ? 's' : ''}`,
  }));

  return (
    <GridLayout items={items} error={error} loading={loading} loaded={loaded} />
  );
});
