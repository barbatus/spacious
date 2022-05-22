import { useQuery, useMutation } from '@apollo/client';

import { GetCharacters, GetCharacter, CreateCharacter } from './queries.graphql';

export const useCharacters = (page = 1) => {
  const { data, loading, error } = useQuery(GetCharacters, {
    variables: {
      page,
      pageSize: 10,
    },
  });

  return {
    characters: data ? data.characters.nodes : [], 
    loading,
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
    },
  });

  const addCharacter = (newCharacter) => {
    return mutate({ variables: { input: newCharacter } });
  };

  return { addCharacter, loading };
};
