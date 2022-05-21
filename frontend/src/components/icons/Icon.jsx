import React from 'react';
import styled from 'styled-components/macro';

import CloseSvg from './close';
import AddSvg from './add';

const Icons = {
  add: AddSvg,
  close: CloseSvg,
};

const StyledIcon = styled.div`
  width: 40px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  background-color: rgba(18, 28, 51, 0.1);
  border-radius: 8px;
  font-size: 0;

  > svg {
    vertical-align: middle;
  }
`;

export const Icon = React.memo(({ size = 32, name, ...props }) => (
  <StyledIcon {...props}>
    {Icons[name] && React.cloneElement(Icons[name], { width: `${size}px`, height: `${size}px`})}
  </StyledIcon>
));
