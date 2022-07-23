import { useEffect } from 'react';
import { useFormikContext } from 'formik';

import {
  IFormFieldsConfigObject,
  normalizeValues,
  whriteValuesToStorage,
} from 'components/forms/config';

interface IFormStateProps<T> {
  fieldsOptions: IFormFieldsConfigObject<T>;
  followField?: keyof T;
}

const FormState = <T,>({
  fieldsOptions,
  followField,
}: IFormStateProps<T>): null => {
  const { values } = useFormikContext<T>();

  useEffect(() => {
    if (followField) {
      // const val = values[followField];
    }
    normalizeValues<T>(fieldsOptions, values);
    whriteValuesToStorage<T>(fieldsOptions, values);
  }, [fieldsOptions, followField, values]);

  return null;
};

export default FormState;
