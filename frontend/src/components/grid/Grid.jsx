import styled from 'styled-components/macro';

export const Grid = styled.div`
  ${'' /* display: flex;
  flex-direction: row;
  flex-wrap: wrap; */}
  display: grid;
  grid-gap: 15px;
  grid-template-columns: repeat(auto-fit, 276px);
  grid-template-rows: max-content;
  grid-column: 1;
  height: 100%;
  overflow-y: auto;
`;
