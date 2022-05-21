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
