import React from 'react';

import styled from 'styled-components/macro';

import { Hint } from '../text';

export * from './Formik';

const Row = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-conent: flex-start;
  margin-bottom: ${({withHint}) => withHint ? '16px' : '24px' };
`;

const Label = styled.label`
  display: block;
  user-select: none;
  margin-bottom: 8px;
  font-weight: 600;
`;

const ErrorMsg = styled.div`
  color: #AB192F;
`;

export const Input = styled(({ value = '', ...props}) => <input value={value} {...props} />)`
  width: 100%;
  border-radius: 8px;
  padding: 8px 16px;
  background-color: #F5F5F5;
  height: 40px;
  border: 0;

  & + ${Hint}, & + ${ErrorMsg} {
    margin-top: 8px;
  }

  &:focus {
    outline: none;
  }
`;

const FormError = styled(ErrorMsg)`
  margin-top: -8px;
  margin-bottom: 24px;
`;

export const FormRow = React.memo(({ label, hint, error, children }) => {
  return (
    <Row withHint={Boolean(hint || error)}>
      <Label>{label}</Label>
      {children}
      {hint && !error && <Hint>{hint}</Hint>}
      {error && <ErrorMsg>{error}</ErrorMsg>}
    </Row>
  );
});

export const Form =  React.memo(({ error, children }) => {
  return (
    <form>
      {children}
      {error && <FormError>{error}</FormError>}
    </form>
  );
});

export default Label;
