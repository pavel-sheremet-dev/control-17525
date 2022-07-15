import { useState } from 'react';
import { Formik, FormikHelpers, FormikProps } from 'formik';
import * as Yup from 'yup';

import { useAppDispatch, useAppSelector } from 'redux/hooks';

import { authOperations, authSelectors } from 'redux/auth';
import InputField from '../inputField/InputField';
// import { SignButton } from 'components/reusableComponents/buttons/Buttons.styled';

import FormState from './FormState';
import { getValueFromStorage } from '../helpers';
import { ISignUpState, LSSignUpState, StorageFormsKeys } from '../types';
import { FormStyled } from './SignUpForm.styled';
import InputCheckbox from '../inputCheckbox/InputCheckbox';
import { BtnStyled } from 'components/reusableComponents/textBtn/TextBtn.styled';

const initialStorageState: LSSignUpState = { name: '', email: '' };

const SignUpForm = () => {
  const [initialValues, setInitialValues] = useState(() =>
    getValueFromStorage<StorageFormsKeys, LSSignUpState>(
      StorageFormsKeys.SIGN_UP,
      initialStorageState,
    ),
  );

  const loading = useAppSelector(authSelectors.getLoading);
  const dispatch = useAppDispatch();

  return (
    <>
      <Formik
        initialValues={{
          ...initialValues,
          password: '',
          passwordConfirmation: '',
          agreement: false,
        }}
        validationSchema={Yup.object({
          name: Yup.string()
            .min(3, 'min 3')
            .max(30, 'max 30')
            .matches(/^[А-Яа-яґҐЁёІіЇїЄє'’ʼ\s\w-]{3,30}$/)
            .required('Field is required'),
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
          passwordConfirmation: Yup.string()
            .oneOf([Yup.ref('password'), null], 'error conf password')
            .required('Field is required'),
          agreement: Yup.boolean()
            .oneOf([true], 'You can agree with Privacy Policy')
            .required(),
        })}
        onSubmit={(values, obj: FormikHelpers<ISignUpState>) => {
          const { name, email, password } = values;
          const credentials = {
            name: name.trim(),
            email: email.trim().toLowerCase(),
            password,
          };
          dispatch(authOperations.signUp(credentials));
          obj.setSubmitting(false);
          sessionStorage.removeItem('auth-form-signup');
          setInitialValues(initialStorageState);
          obj.resetForm();
        }}
        enableReinitialize
      >
        {({ isValid }: FormikProps<ISignUpState>) => (
          <FormStyled>
            <InputField
              label={'Name'}
              required
              name="name"
              type="text"
              placeholder="..."
              autoComplete="off"
            />

            <InputField
              label={'Email'}
              required
              name="email"
              type="text"
              placeholder="your@email.com"
            />

            <InputField
              label={'Password'}
              required
              name="password"
              type="password"
              placeholder="..."
            />

            <InputField
              label={'Confirm password'}
              required
              name="passwordConfirmation"
              type="password"
              placeholder="..."
            />

            <InputCheckbox required name="agreement">
              <span>I agree with Privacy Policy.</span>
            </InputCheckbox>

            <BtnStyled type="submit" disabled={loading}>
              Registration
            </BtnStyled>
            <FormState />
          </FormStyled>
        )}
      </Formik>
    </>
  );
};

export default SignUpForm;
