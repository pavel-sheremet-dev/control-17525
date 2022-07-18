import React, { useState } from 'react';
import { Formik, FormikProps } from 'formik';
import * as Yup from 'yup';

import { authOperations, authSelectors } from 'redux/auth';

import { BtnStyled } from 'components/reusableComponents/textBtn/TextBtn.styled';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { ISignInState, LSSigInState, StorageFormsKeys } from '../types';
import { getValueFromStorage } from '../helpers';
import {
  FormState2,
  normalizeValuesByKeys,
  whriteValuesToStorage,
} from '../signUpForm/FormState';
import InputField from '../inputField/InputField';
import { FormStyled } from '../signUpForm/SignUpForm.styled';

const initialStorageState: LSSigInState = { email: '' };

const SignInForm = () => {
  const [initialValues, setInitialValues] = useState(() =>
    getValueFromStorage<StorageFormsKeys, LSSigInState>(
      StorageFormsKeys.SIGN_IN,
      initialStorageState,
    ),
  );
  const loading = useAppSelector(authSelectors.getLoading);
  const dispatch = useAppDispatch();

  return (
    <Formik
      initialValues={{ ...initialValues, password: '' }}
      validationSchema={Yup.object({
        email: Yup.string()
          .min(7, 'min 7')
          .max(63, 'max 63')
          .email('error mail')
          .required('Field is required'),
        password: Yup.string()
          .min(8, 'min 7')
          .max(30, 'max 30')
          .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&_]{8,30}$/,
            'error password',
          )
          .required('Field is required'),
      })}
      onSubmit={(values, obj) => {
        const { email, password } = values;
        const credentials = {
          email: email.trim().toLowerCase(),
          password,
        };
        dispatch(authOperations.signIn(credentials));
        obj.setSubmitting(false);
        sessionStorage.removeItem('auth-form-signin');
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
          <FormState2
            normalizeValues={normalizeValuesByKeys<ISignInState>([
              'email',
              'password',
            ])}
            whriteValuesToStorage={whriteValuesToStorage<ISignInState>(
              StorageFormsKeys.SIGN_IN,
              ['email'],
            )}
          />
        </FormStyled>
      )}
    </Formik>
  );
};

export default SignInForm;
