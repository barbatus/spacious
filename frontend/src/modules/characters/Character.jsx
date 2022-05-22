import React from 'react';
import styled from 'styled-components/macro';
import { useNavigate, useParams } from 'react-router-dom';

import { Sidebar } from '~/components/sidebar/Sidebar';

import { useCharacter } from './graphql/hooks';

const StyledTable = styled.table`
  width: 100%;
  margin-top: 16px;

  tr td {
    font-weight: 600;
  }

  tr th {
    font-weight: normal;
    text-align: left;
  }
`;

const Info = (props) => {
  return (
    <StyledTable>
      <tr>
        <th>Planet</th>
        <th>Friends</th>
      </tr>
      <tr>
        <td>{props.planet}</td>
        <td>{props.friends}</td>
      </tr>
    </StyledTable>
  );
};

export const Character = React.memo(() => {
  const params = useParams();
  const { character, loading } = useCharacter(parseInt(params.characterId, 10));
  const navigate = useNavigate();
  const onClose = React.useCallback(() => navigate('..'), [navigate]);

  if (loading) return <Sidebar loading />;

  const friends = character.friends.map(({ id, name, description, pictureUrl }) => ({
    id,
    title: name,
    description,
    url: pictureUrl,
  }));

  return (
    <Sidebar 
      { ...character }
      Info={<Info planet={character.planet.name}
      friends={character.friendsCount} />}
      listName="Friends"
      listData={friends}
      emptyMsg={`${character.name} has no friends`}
      onClose={onClose}
    >
    </Sidebar>
  );
});
