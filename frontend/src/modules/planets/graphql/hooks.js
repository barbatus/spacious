import { useQuery, useMutation } from '@apollo/client';

import { GetPlanets, GetPlanet, CreatePlanet } from './queries.graphql';

export const usePlanets = (page = 1) => {
  const { data, loading, error } = useQuery(GetPlanets, {
    variables: {
      page,
      pageSize: 10,
    },
  });

  return {
    planets: data ? data.planets.nodes : [], 
    loading,
    error,
  };
};

export const usePlanet = (planetId) => {
  const { data, loading, error } = useQuery(GetPlanet, {
    variables: {
      planetId: parseInt(planetId, 10),
    },
  });

  return {
    planet: data ? data.planet : null, 
    loading,
    error,
  };
};

export const useAddPlanet = () => {
  const [mutate, { loading }] = useMutation(CreatePlanet, {
    update(cache, { data: { createPlanet } }) {
      cache.modify({
        fields: {
          planets({ nodes, pagination }, { toReference }) {
            return {
              nodes: [toReference(createPlanet), ...nodes],
            };
          }
        },
      });
    },
  });

  const addPlanet = (newPlanet) => {
    return mutate({ variables: { input: newPlanet } });
  };

  return { addPlanet, loading };
};
