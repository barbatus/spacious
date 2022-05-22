import React from 'react';
import { Outlet, useNavigate, useParams } from 'react-router-dom';

import { Sidebar } from '~/components/sidebar/Sidebar';

import { usePlanet } from './graphql/hooks';

export const Planet = React.memo(() => {
  const params = useParams();
  const { planet, loading } = usePlanet(parseInt(params.planetId, 10));
  const navigate = useNavigate();
  const onClose = React.useCallback(() => navigate('..'), [navigate]);
  const onAddCharacter = React.useCallback(() => navigate('character'), [navigate]);

  if (loading) return <Sidebar loading />;

  const characters = planet.characters.map(({ id, name, pictureUrl, friendsCount }) => ({
    id,
    title: name,
    url: pictureUrl,
    hint: `${friendsCount} friend${friendsCount > 1 ? 's' : ''}`,
  }));

  return (
    <React.Fragment>
      <Sidebar
        { ...planet }
        listName="Characters"
        listData={characters}
        onListAdd={onAddCharacter}
        onClose={onClose}
      >
      </Sidebar>
      <Outlet context={{ planet: planet.code }} />
    </React.Fragment>
  );
});
