import React from 'react';
import { useQuery, useMutation } from '@apollo/client';

import { GetCharacters, GetCharacter, CreateCharacter } from './queries.graphql';

export const useCharacters = (page = 1) => {
  const [planet, setPlanet] = React.useState(null);
  const [loaded, setLoaded] = React.useState(false);
  const { data, loading, error } = useQuery(GetCharacters, {
    variables: {
      planet,
      page,
      pageSize: 10,
    },
  });

  if (!loading && !error && !loaded) {
    setTimeout(() => setLoaded(true));
  };

  const filterCharacter = React.useCallback((filter) => {
    setLoaded(false);
    setPlanet(filter);
  }, []);

  return {
    planet,
    filterCharacter,
    characters: data ? data.characters.nodes : [], 
    loading,
    loaded,
    error,
  };
};

export const useCharacter = (characterId) => {
  const { data, loading, error } = useQuery(GetCharacter, {
    variables: {
      characterId,
    },
  });

  return {
    character: data ? data.character : null, 
    loading,
    error,
  };
};

export const useAddCharacter = () => {
  const [mutate, { loading }] = useMutation(CreateCharacter, {
    update(cache, { data: { createCharacter } }) {
      cache.modify({
        id: cache.identify(createCharacter.planet),
        fields: {
          characters(characters, { toReference }) {
            return [toReference(createCharacter), ...characters];
          }
        },
      });
      cache.modify({
        fields: {
          characters({ nodes, pagination }, { toReference }) {
            return {
              pagination,
              nodes: [toReference(createCharacter), ...nodes],
            };
          }
        },
      });
    },
  });

  const addCharacter = (newCharacter) => {
    return mutate({ variables: { input: newCharacter } });
  };

  return { addCharacter, loading };
};
