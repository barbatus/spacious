import { Outlet } from 'react-router-dom';
import styled from 'styled-components/macro';

import { NavTabs } from '~/components/tabs';

// const Container = styled.div`
//   display: flex;
//   flex-direction: column;
//   max-width: 1320px;
//   height: 100vh;
//   margin: 0 auto;
//   padding: 32px;

//   main {
//     flex-grow: 1;
//   }
// `;

const Container = styled.div`
  display: grid;
  max-width: 1320px;
  height: 100vh;
  margin: 0 auto;
  padding: 32px;
  grid-template-rows: 132px calc(100% - 132px);
  grid-template-columns: 3fr max-content;
`;

export const Layout = () => {
  return (
    <Container>
      <header>
        <h1>Spacious</h1>
        <NavTabs tabs={['planets', 'characters']} />
      </header>
      <Outlet />
      {/* <main> */}
        {/* <NavTabs tabs={['planets', 'characters']} /> */}
        {/* <Outlet /> */}
      {/* </main> */}
    </Container>
  );
};
