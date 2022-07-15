import { useEffect } from 'react';
import { useFormikContext } from 'formik';

import { ISignUpState, StorageFormsKeys } from '../types';

const FormState = (): null => {
  const { values } = useFormikContext<ISignUpState>();

  values.name = values.name.replace(/^[^А-Яа-яґҐЁёІіЇїЄє\w]/, '');
  values.name = values.name.replace(/^[^\w]/, '');
  values.password = values.password.trim();

  useEffect(() => {
    sessionStorage.setItem(
      StorageFormsKeys.SIGN_UP,
      JSON.stringify({ name: values.name, email: values.email }),
    );
  }, [values]);

  return null;
};

export default FormState;
