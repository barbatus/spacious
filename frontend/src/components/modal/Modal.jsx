import React from 'react';
import styled from 'styled-components/macro';

import { Dialog } from '@reach/dialog';
import '@reach/dialog/styles.css';

import { Icon } from '~/components/icons';
import { Button } from '~/components/buttons';

const StyledModal = styled(Dialog)`
  padding: 48px;
  border-radius: 32px;
`;

const Header = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const ActionIcon = styled(Icon)`
  cursor: pointer;
`;

export const Modal = ({
    title,
    buttonMsgs,
    children,
    onDismiss,
    onSubmit
  }) => {
  const cancelMsg = buttonMsgs ? buttonMsgs[0] : 'Cancel';
  const submitMsg = buttonMsgs ? buttonMsgs[1] : 'Submit';
  return (
    <StyledModal
      role="modal"
      aria-labelledby="modal"
      onDismiss={onDismiss}
    >
      <React.Fragment>
        <Header>
          <ActionIcon name="close" onClick={onDismiss} />
        </Header>
        <h1>{title}</h1>
        {children}
        <Footer>
          <Button role="cancel"  onClick={onDismiss}>{cancelMsg}</Button>
          <Button role="submit" primary onClick={onSubmit}>{submitMsg}</Button>
        </Footer>
      </React.Fragment>
    </StyledModal>
  );
};
