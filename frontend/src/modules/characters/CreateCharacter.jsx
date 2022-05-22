import React from 'react';
import { useOutletContext, useNavigate } from 'react-router-dom';

import * as Yup from 'yup';

import { Formik, FormRow, Input, useFormCallback } from '~/components/form';
import { Modal } from '~/components/modal';

import { useAddCharacter } from './graphql/hooks';

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required('Name is required')
    .max(15, 'Too Long! Max length is 15'),
  planet: Yup.string()
    .required('Planet code is required')
    .matches(/[a-z]{2}-[a-z]{3}-[0-9]{2}/i, 'Code is in format e.g. XT-FOE-43'),
  description: Yup.string()
    .min(15, 'Min length is 15 or empty')
    .max(300, 'Max length is 300')
    .nullable(),
});

const Form = React.memo(({errors, values, submitted, showCode, handleChange}) => {
  return (
    <React.Fragment>
      <FormRow label="Name" error={submitted && errors.name}>
        <Input name="name" value={values.name} onChange={handleChange} />
      </FormRow>
      { showCode && (
          <FormRow
            label="Code"
            hint="The planet the character lives on"
            error={submitted && errors.code}
          >
            <Input name="code" value={values.code} onChange={handleChange} />
          </FormRow>
        )
      }
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
    </React.Fragment>
  );
});

export const CreateCharacter= () => {
  const navigate = useNavigate();
  const onDismiss = React.useCallback(() => navigate(-1), [navigate]);
  const { addCharacter } = useAddCharacter();
  const submitForm = useFormCallback();
  const context = useOutletContext();

  const planetCode = context && context.planet;
  const onSubmit = React.useCallback((values) => {
    addCharacter({ planet: planetCode, ...values });
    onDismiss();
  }, [planetCode, addCharacter, onDismiss]);

  return (
    <Modal
      onDismiss={onDismiss}
      onSubmit={submitForm}
      buttonMsgs={['Cancel', 'Create Character']}
    >
      <Formik
        initialValues={{ planet: planetCode }}
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
