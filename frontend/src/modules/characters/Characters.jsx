import React from 'react';
import styled from 'styled-components/macro';

import { GridLayout } from '../routes/GridLayout';
import { useCharacters } from './graphql/hooks';
import { usePlanets } from '../planets/graphql/hooks';

const StyledSelect = styled.select`
  width: 125px;
  height: 40px;
  padding: 8px;
  border: 0;
  border-radius: 8px;
  font-weight: 600;
  appearance: none;

  background-position: calc(100% - 10px) center !important;
  background: url("data:image/svg+xml,<svg height='10px' width='10px' viewBox='0 0 16 16' fill='%23000000' xmlns='http://www.w3.org/2000/svg'><path d='M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z'/></svg>") no-repeat;
  background-color: #EAEAEB;

  &:focus {
    outline: none;
  }
`;

const PlanetsFilter = React.memo(({ value, defaultItem, onSelect }) => {
  const { planets } = usePlanets();
  const ref = React.createRef(null);

  const items = planets.map((planet) => (
    <option key={planet.id} value={planet.code}>{planet.name}</option>
  ));

  const onChange = React.useCallback((value) => {
    if (onSelect) {
      onSelect(ref.current.value);
    }
  }, [ref, onSelect]);

  return (
    <StyledSelect name="planets" value={value || ''} ref={ref} onChange={onChange}>
      <option value="">{defaultItem}</option>
      {items}
    </StyledSelect>
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
