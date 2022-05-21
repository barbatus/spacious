import React from 'react';
import { Formik as FormikBase } from 'formik';

export const useFormCallback = () => {
  const callbackRef = React.useRef(null);
  const formCallbackRef = React.useRef(null);

  if (!callbackRef.current) {
    callbackRef.current = (arg) => {
      if (typeof arg === 'function') {
        formCallbackRef.current = arg;
        return;
      }
      if (formCallbackRef.current) {
        return formCallbackRef.current(arg);
      }
    };
  }

  return callbackRef.current;
};

export const Formik = React.memo(
  ({
    initialValues,
    isInitialValid = false,
    enableReinitialize = false,
    render,
    submitForm,
    onSubmit,
    ...rest
  }) => {
    return (
      <FormikBase
        {...rest}
        initialValues={initialValues}
        isInitialValid={isInitialValid}
        enableReinitialize={enableReinitialize}
        onSubmit={onSubmit}
        render={props => {
          if (submitForm) {
            submitForm(props.submitForm);
          }
          props.submitted = props.submitCount > 0;
          return render(props);
        }}
      />
    );
  }
);
