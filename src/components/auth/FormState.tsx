import { useEffect } from 'react';
import { useFormikContext } from 'formik';
import * as Yup from 'yup';

import { ISignInState, ISignUpState, StorageFormsKeys } from './types';
import { SchemaOf } from 'yup';

export type Fields = ISignUpState & ISignInState;
// type ObjectType = {
//   [x in keyof Fields]: string;
// };

interface IFormFieldsConfigObject<T> {
  initialValues: T;
  validationSchema: SchemaOf<T>;
  normalizeFields: (keyof T)[];
  storageKey: StorageFormsKeys;
  initialStorageState: Partial<T>;
}

interface IFormFieldsConfig {
  signUp: IFormFieldsConfigObject<ISignUpState>;
  signIn: IFormFieldsConfigObject<ISignInState>;
}

interface IFormStateProps<T> {
  fieldsOptions: IFormFieldsConfigObject<T>;
}

export const formFieldsConfig: IFormFieldsConfig = {
  signUp: {
    initialValues: {
      name: '',
      email: '',
      password: '',
      passwordConfirmation: '',
      agreement: false,
    },
    validationSchema: Yup.object().shape({
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
    }),
    normalizeFields: ['name', 'email', 'password', 'passwordConfirmation'],
    storageKey: StorageFormsKeys.SIGN_UP,
    initialStorageState: { name: '', email: '' },
  },
  signIn: {
    initialValues: { email: '', password: '' },
    validationSchema: Yup.object().shape({
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
    }),
    normalizeFields: ['email', 'password'],
    storageKey: StorageFormsKeys.SIGN_IN,
    initialStorageState: { email: '' },
  },
};

const normalizeValue = <T extends Partial<Fields>>(
  value: keyof T,
  values: T,
) => {
  switch (value) {
    case 'name':
      values.name = values.name?.replace(/^[^А-Яа-яґҐЁёІіЇїЄє\w]/, '');
      break;

    case 'email':
      values.email = values.email?.replace(/^[^\w]/, '');
      break;

    case 'password':
      values.password = values.password?.trim();
      break;

    case 'passwordConfirmation':
      values.passwordConfirmation = values.passwordConfirmation?.trim();
      break;

    default:
      throw new Error(
        `add case for "${String(
          value,
        )}" value normalize or don't use this key as argument of function "normalizeValues"`,
      );
  }
};

export const normalizeValues = <T extends Partial<Fields>>(
  { normalizeFields }: IFormFieldsConfigObject<T>,
  values: T,
): void => {
  if (!normalizeFields.length) return;

  normalizeFields.forEach(field => {
    normalizeValue(field, values);
  });
};

export const whriteValuesToStorage = <T extends Partial<Fields>>(
  { storageKey, initialStorageState }: IFormFieldsConfigObject<T>,
  values: T,
): void => {
  let storageValues = { ...initialStorageState };

  for (let field in initialStorageState) {
    storageValues[field] = values[field];
  }

  sessionStorage.setItem(storageKey, JSON.stringify(storageValues));
};

const FormState = <T,>({ fieldsOptions }: IFormStateProps<T>): null => {
  const { values } = useFormikContext<T>();

  useEffect(() => {
    normalizeValues<T>(fieldsOptions, values);
    whriteValuesToStorage<T>(fieldsOptions, values);
  }, [fieldsOptions, values]);

  return null;
};

export default FormState;
