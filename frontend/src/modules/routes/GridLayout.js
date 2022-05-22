import React from 'react';
import { useNavigate, Outlet, useLocation } from 'react-router-dom';
import styled from 'styled-components/macro';

import { CSSTransition } from 'react-transition-group';

import ClipLoader from 'react-spinners/ClipLoader';

import { parseError } from '~/lib/graphql';
import { Circle } from '~/components/buttons';
import { Grid, Tile } from '~/components/grid';

const SidebarContainer = styled.div`
  grid-row: 1 / span 2;
  grid-column: 2;
`;

const GridContainer  = styled.div`
  position: relative;
`

const AddButton = styled(Circle)`
  right: 32px;
  bottom: 0;
`;

const Centered = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

const AnimatedTile = styled(Tile)`
  &.item-enter-active {
    animation: new 2s infinite;
  }
  @keyframes new {
    from {background-color: #ffffc8;}
    to {background-color: white;}
  }
`;

export const GridLayout = React.memo(({ items, error, loading, loaded }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const onAddCallback = React.useCallback(() => {
    navigate(`${location.pathname}/create`);
  }, [location, navigate]);

  if (error) {
    return (<Centered>{parseError(error, 'Failed to load')}</Centered>);
  }

  const gridItems = items.map((item) => {
    const itemRef = React.createRef(null); 
    return (
      <CSSTransition
        key={item.id}
        timeout={2000}
        classNames="item"
        nodeRef={itemRef}
      >
        <AnimatedTile
          {...item}
          key={item.id}
          ref={itemRef}
        />
      </CSSTransition>
    );
  });

  return (
    <React.Fragment>
      <GridContainer>
        <Grid enter={loaded}>
          {gridItems}
        </Grid>
        <AddButton onClick={onAddCallback} />
        <Centered>
          {loading && <ClipLoader size={64} />} 
        </Centered>
      </GridContainer>
      <SidebarContainer>
        <Outlet />
      </SidebarContainer>
    </React.Fragment>
  );
});
