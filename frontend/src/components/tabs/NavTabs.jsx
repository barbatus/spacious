import React from 'react';
import styled from 'styled-components/macro';

import { NavLink } from 'react-router-dom';

const Container = styled.div`
  width: 100%;
`;

const Tab = styled(NavLink)`
  display: inline-flex;
  align-items: center;
  height: 40px;
  color: #121c33;
  font-weight: 600;
  opacity: 0.6;
  padding: 8px;
  text-transform: uppercase;
  cursor: pointer;
  text-decoration: none;
  border-radius: 8px;
  margin-right: 16px;

  &.active {
    opacity: 1;
    padding: 8px 24px;
    background-color: #EAEAEB;
  }
`;

export const NavTabs = React.memo(({activeTabName, children, onChange, tabs}) => {
  return (
    <React.Fragment>
      <Container>
        {tabs.map((tab, index) => {
          const onClick = () => {
            if (onChange) {
              onChange(tab);
            }
          };
          return <Tab key={tab} to={tab} onClick={onClick}>{tab}</Tab>;
        })}
      </Container>
    </React.Fragment>
  );
});
