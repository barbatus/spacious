import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Sidebar } from '~/components/sidebar/Sidebar';

import { usePlanet } from './graphql/hooks';

export const Planet = React.memo(() => {
  const params = useParams();
  const { planet, loading } = usePlanet(parseInt(params.planetId, 10));
  const navigate = useNavigate();
  const onClose = React.useCallback(() => navigate('..'), [navigate]);

  if (loading) return <Sidebar loading />;

  const characters = planet.characters.map(({ id, name, pictureUrl, friendsCount }) => ({
    id,
    title: name,
    url: pictureUrl,
    hint: `${friendsCount} friend${friendsCount > 1 ? 's' : ''}`,
  }));

  return (
    <Sidebar
      { ...planet }
      listName="Characters"
      listData={characters}
      onClose={onClose}
    >
    </Sidebar>
  );
});
