import styled from 'styled-components/macro';

import { TransitionGroup } from 'react-transition-group';

export const Grid = styled(TransitionGroup)`
  display: grid;
  grid-gap: 15px;
  grid-template-columns: repeat(auto-fit, 276px);
  grid-template-rows: max-content;
  grid-column: 1;
  height: 100%;
  overflow-y: auto;
`;
