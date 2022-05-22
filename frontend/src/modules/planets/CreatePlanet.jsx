import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components/macro';

import { Dialog } from '@reach/dialog';
import '@reach/dialog/styles.css';
import * as Yup from 'yup';

import { Formik, FormRow, Input, useFormCallback } from '~/components/form';
import { Icon } from '~/components/icons/Icon';
import { Button } from '~/components/buttons';

import { useAddPlanet } from './graphql/hooks';

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required('Name is required')
    .max(15, 'Too Long! Max length is 15'),
  code: Yup.string()
    .required('Code is required')
    .matches(/[a-z]{2}-[a-z]{3}-[0-9]{2}/i, 'Code is in format e.g. XT-FOE-43'),
  description: Yup.string()
    .min(15, 'Min length is 15 or empty')
    .max(300, 'Max length is 300')
    .nullable(),
});

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

const Form = React.memo(({errors, values, submitted, handleChange}) => {
  return (
    <React.Fragment>
      <FormRow label="Name" error={submitted && errors.name}>
        <Input name="name" value={values.name} onChange={handleChange} />
      </FormRow>
      <FormRow label="Code" error={submitted && errors.code}>
        <Input name="code" value={values.code} onChange={handleChange} />
      </FormRow>
      <FormRow label="Image" error={submitted && errors.pictureUrl}>
        <Input name="pictureUrl" value={values.pictureUrl} onChange={handleChange} />
      </FormRow>
      <FormRow label="Description" error={submitted && errors.description}>
        <Input name="description" value={values.description} onChange={handleChange} />
      </FormRow>
    </React.Fragment>
  );
});

export const CreatePlanet = () => {
  const navigate = useNavigate();
  const onDismiss = React.useCallback(() => navigate(-1), [navigate]);
  const { addPlanet } = useAddPlanet();
  const submitForm = useFormCallback();

  const handleSubmit = React.useCallback((values) => {
    addPlanet(values);
    onDismiss();
  }, [addPlanet, onDismiss]);

  return (
    <StyledModal
      aria-labelledby="create planet"
      onDismiss={onDismiss}
    >
      <div>
        <Header>
          <ActionIcon name="close" onClick={onDismiss} />
        </Header>
        <h1>Planet</h1>
        <Formik
          initialValues={{}}
          validationSchema={validationSchema}
          enableReinitialize
          submitForm={submitForm}
          render={props => <Form {...props} />}
          onSubmit={handleSubmit}
          validateOnBlur
        />
        <Footer>
          <Button onClick={onDismiss}>Cancel</Button>
          <Button primary onClick={submitForm}>Create Planet</Button>
        </Footer>
      </div>
    </StyledModal>
  );
};
