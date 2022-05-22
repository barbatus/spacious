import React from 'react';
import { useOutletContext, useNavigate } from 'react-router-dom';

import * as Yup from 'yup';

import { Formik, FormRow, Input, useFormCallback, Form } from '~/components/form';
import { Modal } from '~/components/modal';

import { parseError } from '~/lib/graphql';

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

const CreateForm = React.memo(({errors, values, submitted, submitError, showCode, handleChange}) => {
  return (
    <Form error={submitError}>
      <FormRow label="Name" error={submitted && errors.name}>
        <Input name="name" value={values.name} onChange={handleChange} />
      </FormRow>
      { showCode && (
          <FormRow
            label="Planet"
            hint="The planet the character lives on"
            error={submitted && errors.planet}
          >
            <Input name="planet" value={values.planet} onChange={handleChange} />
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
    </Form>
  );
});

export const CreateCharacter= () => {
  const navigate = useNavigate();
  const onDismiss = React.useCallback(() => navigate(-1), [navigate]);
  const { addCharacter } = useAddCharacter();
  const submitForm = useFormCallback();
  const context = useOutletContext();
  const [submitError, setError] = React.useState();

  const planetCode = context && context.planet;
  const onSubmit = React.useCallback(async (values) => {
    try {
      await addCharacter({ planet: planetCode, ...values });
      onDismiss();
    } catch (apolloError) {
      setError(parseError(apolloError));
    }
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
        render={props => <CreateForm {...props} showCode={!planetCode} submitError={submitError} />}
        onSubmit={onSubmit}
        validateOnBlur
      />
    </Modal>
  );
};
