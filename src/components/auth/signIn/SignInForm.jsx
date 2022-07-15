import React, { useState, useEffect } from 'react';
import { Form, Formik, useFormikContext } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { authOperations, authSelectors } from 'redux/auth';

import { getValueFromSessionStorage } from '../service';
import InputField from '../inputField/InputField';
import { SignButton } from 'components/reusableComponents/buttons/Buttons.styled';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

const getInitialValues = () =>
  JSON.parse(sessionStorage.getItem('auth-form-signin-signin')) ?? {
    email: getValueFromSessionStorage('useremail'),
  };

const FormState = () => {
  const { values } = useFormikContext();

  values.email = values.email.replace(/^[^\w]/, '');
  values.password = values.password.trim();

  useEffect(() => {
    sessionStorage.setItem('auth-form-signin', JSON.stringify(values));
  }, [values]);

  useEffect(() => {
    sessionStorage.setItem('useremail', values.email ?? '');
  }, [values.email]);

  return null;
};

const SignInForm = () => {
  const [initialValues, setInitialValues] = useState(() => getInitialValues());
  const loading = useSelector(authSelectors.getLoading);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const val = t('validation', { returnObjects: true });

  return (
    <Formik
      initialValues={{ ...initialValues, password: '' }}
      validationSchema={Yup.object({
        email: Yup.string()
          .min(7, val.min7)
          .max(63, val.max63)
          .email(val.erremail)
          .required(val.required),
        password: Yup.string()
          .min(8, val.min8)
          .max(30, val.max30)
          .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&_]{8,30}$/,
            val.errpassword,
          )
          .required(val.required),
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
        setInitialValues(getInitialValues());
        obj.resetForm();
      }}
      enableReinitialize
    >
      {({ isValid }) => (
        <Form>
          <InputField
            label={t('email')}
            name="email"
            type="text"
            placeholder="your@email.com"
          />
          <InputField
            label={t('password')}
            name="password"
            type="password"
            placeholder="..."
          />

          <SignButton type="submit" disabled={(!isValid || loading) ?? true}>
            {t('login')}
          </SignButton>
          <FormState />
        </Form>
      )}
    </Formik>
  );
};

export default SignInForm;
