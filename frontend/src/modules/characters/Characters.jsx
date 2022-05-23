import React from 'react';

import { GridLayout } from '../routes/GridLayout';
import { useCharacters } from './graphql/hooks';
import { usePlanets } from '../planets/graphql/hooks';

import { Dropdown } from '~/components/dropdown/Dropdown';

const PlanetsFilter = React.memo(({ value, defaultItem, onSelect }) => {
  const { planets } = usePlanets();

  const onChange = React.useCallback((option) => {
    onSelect(option.value);
  }, [onSelect]);
  
  const options = [{ label: defaultItem, value: null }]
    .concat(planets.map((planet) => ({
      label: planet.name,
      value: planet.code,
    })
  ));

  return (
    <Dropdown
      defaultValue={options[0]}
      classNamePrefix="react-select"
      options={options}
      onChange={onChange}
    >
    </Dropdown>
  );
});

export const Characters = React.memo(() => {
  const { characters, filterCharacter, planet, loaded, loading, error } = useCharacters(null);

  const items = characters.map(({ friendsCount, ...character }) => ({
    ...character,
    to: `/characters/${character.id}`,
    hint: `${friendsCount} friend${friendsCount > 1 ? 's' : ''}`,
  }));

  return (
    <GridLayout
      items={items}
      filterName={planet}
      Filter={<PlanetsFilter value={planet} onSelect={filterCharacter} defaultItem="Planet: All" />}
      error={error}
      loading={loading}
      loaded={loaded}
    />
  );
});
