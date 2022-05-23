import React from 'react';

import styled from 'styled-components/macro';

import { NavLink } from 'react-router-dom';

import { Hint } from '../text';

// const TileContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   height: 200px;
//   background: #ffffff;
//   border-radius: 16px;
//   box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
//   padding: 16px;
// `;

const StyledImg = styled.img`
  width: 100%;
  height: 120px;
  margin: 0 auto;
  margin-bottom: 8px;
  object-fit: cover;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
`;

const TileName = styled.h4`
  margin: 0;
  text-transform: capitalize;
`;

const Container = styled(NavLink)`
  display: flex;
  flex-direction: column;
  height: 200px;
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);

  text-decoration: none;
  border: 2px solid transparent;

  &.active {
    border: 2px solid #121C33;
  }
`;

const Details = styled.div`
  padding: 16px;
  padding-top: 0;
`;

const TileImg = React.memo(({ fallback, src, ...props }) => {
  const [failed, setFailed] = React.useState(!src);

  const onFail = React.useCallback(() => setFailed(true), []);

  if (failed && fallback) return fallback;

  return <StyledImg src={src} {...props} onError={onFail} />;
});

export const Tile = React.memo(
  React.forwardRef(({ to, name, pictureUrl, hint, className, imgFallback }, ref) => {
    return (
      <Container ref={ref} className={className} to={to}>
        <TileImg src={pictureUrl} fallback={imgFallback} />
        <Details>
          <TileName>{name}</TileName>
          <Hint>{hint}</Hint>
        </Details>
      </Container>
    );
  })
);
