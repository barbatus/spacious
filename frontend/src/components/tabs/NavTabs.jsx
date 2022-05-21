import React from 'react';
import styled from 'styled-components/macro';

import { NavLink } from 'react-router-dom';

const Container = styled.div`
  width: 100%;
`;

const Tab = styled(NavLink)`
  display: inline-block;
  color: #121C33;
  font-size: 16px;
  font-weight: 600;
  opacity: 0.6;
  padding: 8px;
  text-transform: uppercase;
  cursor: pointer;
  text-decoration: none;
  border-radius: 8px;
  margin-bottom: 16px;
  margin-right: 16px;

  &.active {
    opacity: 1;
    padding: 8px 24px;
    background-color: rgba(18, 28, 51, 0.05);
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
