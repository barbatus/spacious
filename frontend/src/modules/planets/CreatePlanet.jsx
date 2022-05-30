import React from 'react';
import { useNavigate } from 'react-router-dom';

import * as Yup from 'yup';

import { Formik, FormRow, Input, Form, useFormCallback } from '~/components/form';
import { Modal } from '~/components/modal';
import { parseError } from '~/lib/graphql';

import { useAddPlanet } from './graphql/hooks';

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required('Name is required')
    .max(15, 'Too Long! Max length is 15'),
  code: Yup.string()
    .required('Code is required')
    .matches(/[a-z]{2}-[a-z]{3}-[0-9]{2}/i, 'Code is in format e.g. XT-FOE-43'),
  pictureUrl: Yup.string()
    .required('Image is required'),
  description: Yup.string()
    .required('Description is required')
    .min(15, 'Min length is 15 or empty')
    .max(300, 'Max length is 300')
    .nullable(),
});

const CreateForm = React.memo(({errors, values, submitted, submitError, handleChange}) => {
  return (
    <Form error={submitError}>
      <FormRow label="Name" error={submitted && errors.name}>
        <Input name="name" value={values.name} onChange={handleChange} />
      </FormRow>
      <FormRow label="Code" error={submitted && errors.code}>
        <Input
          name="code"
          placeholder="e.g. PI-NOE-01"
          value={values.code}
          onChange={handleChange}
        />
      </FormRow>
      <FormRow
        label="Image"
        hint="Paste the URL of a JPG or PNG of max 20kb"
        error={submitted && errors.pictureUrl}
      >
        <Input name="pictureUrl" value={values.pictureUrl} onChange={handleChange} />
      </FormRow>
      <FormRow label="Description" error={submitted && errors.description}>
        <Input name="description" value={values.description} onChange={handleChange} />
      </FormRow>
    </Form>
  );
});

export const CreatePlanet = () => {
  const navigate = useNavigate();
  const onDismiss = React.useCallback(() => navigate(-1), [navigate]);
  const { addPlanet } = useAddPlanet();
  const submitForm = useFormCallback();
  const [submitError, setError] = React.useState();

  const onSubmit = React.useCallback(async (values) => {
    try {
      await addPlanet(values);
      onDismiss();
    } catch(apolloError) {
      setError(parseError(apolloError));
    }
  }, [addPlanet, onDismiss]);

  return (
    <Modal
      buttonMsgs={['Cancel', 'Create Planet']}
      onSubmit={submitForm}
      onDismiss={onDismiss}
    >
      <Formik
        initialValues={{}}
        validationSchema={validationSchema}
        enableReinitialize
        submitForm={submitForm}
        onSubmit={onSubmit}
        validateOnBlur
      >
      {props => <CreateForm {...props} submitError={submitError} />}
      </Formik>
    </Modal>
  );
};
