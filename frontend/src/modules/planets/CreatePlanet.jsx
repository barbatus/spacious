import React from 'react';
import { useNavigate } from 'react-router-dom';

import * as Yup from 'yup';

import { Formik, FormRow, Input, useFormCallback } from '~/components/form';
import { Modal } from '~/components/modal';

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

  const onSubmit = React.useCallback((values) => {
    addPlanet(values);
    onDismiss();
  }, [addPlanet, onDismiss]);

  return (
    <Modal
      onSubmit={submitForm}
      onDismiss={onDismiss}
      buttonMsgs={['Cancel', 'Create Planet']}
    >
      <Formik
        initialValues={{}}
        validationSchema={validationSchema}
        enableReinitialize
        submitForm={submitForm}
        render={props => <Form {...props} />}
        onSubmit={onSubmit}
        validateOnBlur
      />
    </Modal>
  );
};
