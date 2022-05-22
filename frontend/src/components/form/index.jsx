import React from 'react';

import styled from 'styled-components/macro';

import { Hint } from '../text';

export * from './Formik';

const Row = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-conent: flex-start;
  margin-bottom: 24px;
`;

const Label = styled.label`
  color: #121C33;
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
  background-color: #f5f5f5;
  height: 40px;
  border: 0;

  & + ${Hint}, & + ${ErrorMsg} {
    margin-top: 8px;
  }

  &:focus {
    outline: none;
  }
`;

export const FormRow = React.memo(({ label, hint, error, children }) => {
  return (
    <Row>
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
      <ErrorMsg>{error}</ErrorMsg>
    </form>
  );
});

export default Label;
