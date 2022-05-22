import { useQuery } from '@apollo/client';

import { GetCharacters, GetCharacter } from './queries.graphql';

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
