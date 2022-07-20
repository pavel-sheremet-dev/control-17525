import React, { useState } from 'react';
import { Formik, FormikHelpers, FormikProps } from 'formik';
// import * as Yup from 'yup';

import { authOperations, authSelectors } from 'redux/auth';

import { BtnStyled } from 'components/reusableComponents/textBtn/TextBtn.styled';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { ISignInState, StorageFormsKeys } from '../types';
import { getValueFromStorage } from '../helpers';

import InputField from '../inputField/InputField';
import { FormStyled } from '../signUpForm/SignUpForm.styled';
import FormState, { formFieldsConfig } from '../FormState';

const fieldsOptions = formFieldsConfig.signIn;
const initialStorageState = formFieldsConfig.signIn.initialStorageState;

const SignInForm = () => {
  const [initialValues, setInitialValues] = useState(() =>
    getValueFromStorage<StorageFormsKeys, Partial<ISignInState>>(
      StorageFormsKeys.SIGN_IN,
      initialStorageState,
    ),
  );
  const loading = useAppSelector(authSelectors.getLoading);
  const dispatch = useAppDispatch();

  return (
    <Formik
      initialValues={{ ...fieldsOptions.initialValues, ...initialValues }}
      validationSchema={fieldsOptions.validationSchema}
      onSubmit={(values, obj: FormikHelpers<ISignInState>) => {
        const { email, password } = values;
        const credentials = {
          email: email.trim().toLowerCase(),
          password,
        };
        dispatch(authOperations.signIn(credentials));
        obj.setSubmitting(false);
        // sessionStorage.removeItem('auth-form-signin');
        setInitialValues(initialStorageState);
        obj.resetForm();
      }}
      enableReinitialize
    >
      {({ isValid }: FormikProps<ISignInState>) => (
        <FormStyled>
          <InputField
            label={'Email'}
            name="email"
            type="text"
            placeholder="your@email.com"
          />
          <InputField
            label={'Password'}
            name="password"
            type="password"
            placeholder="..."
          />

          <BtnStyled type="submit" disabled={loading}>
            Login
          </BtnStyled>
          <FormState fieldsOptions={fieldsOptions} />
        </FormStyled>
      )}
    </Formik>
  );
};

export default SignInForm;
