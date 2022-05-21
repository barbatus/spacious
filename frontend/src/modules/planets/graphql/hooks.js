import { useQuery, useMutation } from '@apollo/client';

import { GetPlanets } from './queries.graphql';

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
