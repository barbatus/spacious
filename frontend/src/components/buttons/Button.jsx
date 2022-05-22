import React from 'react';

import styled from 'styled-components/macro';

import { Icon } from '../icons/Icon';

const ButtonIcon = styled(Icon)`
  display: inline-block;
`;
 
const StyledButton = styled.button`
   border: 0;
   text-align: center;
   cursor: pointer;
   padding: 12px 24px;
   border-radius: 8px;
   font-weight: 600;
   text-transform: uppercase;

   ${({ primary }) => primary && 'color: #fff; background-color: #121C33;'}

   ${({ primary }) => 
    `> ${ButtonIcon} {
        fill: #fff;
      }
    }`
  }

   ${({ circle }) => circle && `
      padding: 0;
      border-radius: 50%;
      height: 56px;
      width: 56px;
      position: absolute;
    `}

   & + button {
     margin-left: 16px;
   }
`;

export const Circle = React.memo(({ icon = 'add', ...props }) => {
  return (
    <Button {...props} primary circle>
      <ButtonIcon name={icon} />
    </Button>
  )
});

export const Button = React.memo(({ children, ...props }) => {
  return (
    <StyledButton {...props}>
      {children}
    </StyledButton>
  )
});
