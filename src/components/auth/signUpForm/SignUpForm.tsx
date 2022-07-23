import { useState } from 'react';
import { Formik, FormikHelpers, FormikProps } from 'formik';
// import * as Yup from 'yup';

import { useAppDispatch, useAppSelector } from 'redux/hooks';

import { authOperations, authSelectors } from 'redux/auth';
import InputField from 'components/forms/inputField/InputField';

import FormState from 'components/forms/formState/FormState';
import { getValueFromStorage } from '../helpers';
import { ISignUpState, StorageFormsKeys } from '../types';
import { FormStyled } from './SignUpForm.styled';
import InputCheckbox from 'components/forms/inputCheckbox/InputCheckbox';
import { BtnStyled } from 'components/reusableComponents/textBtn/TextBtn.styled';
import { formFieldsConfig } from 'components/forms/config';

const fieldsOptions = formFieldsConfig.signUp;

const SignUpForm = () => {
  const [storageValues, setStorageValues] = useState(() =>
    getValueFromStorage<StorageFormsKeys, Partial<ISignUpState>>(
      StorageFormsKeys.SIGN_UP,
      fieldsOptions.initialStorageState,
    ),
  );

  const loading = useAppSelector(authSelectors.getLoading);
  const dispatch = useAppDispatch();

  // const validationSchema: Yup.SchemaOf<ISignUpState> = Yup.object().shape({
  //   name: Yup.string()
  //     .min(3, 'min 3')
  //     .max(30, 'max 30')
  //     .matches(/^[А-Яа-яґҐЁёІіЇїЄє'’ʼ\s\w-]{3,30}$/)
  //     .required('Field is required'),
  //   email: Yup.string()
  //     .min(7, 'min 7')
  //     .max(63, 'max 63')
  //     .email('error mail')
  //     .required('Field is required'),
  //   password: Yup.string()
  //     .min(8, 'min 7')
  //     .max(30, 'max 30')
  //     .matches(
  //       /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&_]{8,30}$/,
  //       'error password',
  //     )
  //     .required('Field is required'),
  //   passwordConfirmation: Yup.string()
  //     .oneOf([Yup.ref('password'), null], 'error conf password')
  //     .required('Field is required'),
  //   agreement: Yup.boolean()
  //     .oneOf([true], 'You can agree with Privacy Policy')
  //     .required(),
  // });

  return (
    <>
      <Formik
        initialValues={{
          ...fieldsOptions.initialValues,
          ...storageValues,
        }}
        validationSchema={fieldsOptions.validationSchema}
        onSubmit={(values, helper: FormikHelpers<ISignUpState>) => {
          const { name, email, password } = values;
          const credentials = {
            name: name.trim(),
            email: email.trim().toLowerCase(),
            password: password,
          };
          dispatch(authOperations.signUp(credentials));
          helper.setSubmitting(false);
          sessionStorage.removeItem(StorageFormsKeys.SIGN_UP);
          setStorageValues(fieldsOptions.initialStorageState);
          helper.resetForm();
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
            <FormState fieldsOptions={fieldsOptions} />
          </FormStyled>
        )}
      </Formik>
    </>
  );
};

export default SignUpForm;
