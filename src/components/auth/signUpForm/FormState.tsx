import { useEffect } from 'react';
import { useFormikContext } from 'formik';

import { ISignInState, ISignUpState, StorageFormsKeys } from '../types';

// const FormState = (): null => {
//   const { values } = useFormikContext<ISignUpState>();

//   values.name = values.name.replace(/^[^А-Яа-яґҐЁёІіЇїЄє\w]/, '');
//   values.email = values.email.replace(/^[^\w]/, '');
//   values.password = values.password.trim();

//   useEffect(() => {
//     sessionStorage.setItem(
//       StorageFormsKeys.SIGN_UP,
//       JSON.stringify({ name: values.name, email: values.email }),
//     );
//   }, [values]);

//   return null;
// };

type CallBack<T> = (values: T) => void;

// export const normalizeValuesByKeys = <T extends ISignUpState | ISignInState>(
//   keys: (keyof T)[],
// ): CallBack<T> => {
//   return (values: T) => {
//     const set = new Set(keys);
//     set.forEach(key => {
//       if (isSignUpState(values) && key === 'name') {
//         values.name = values.name.replace(/^[^А-Яа-яґҐЁёІіЇїЄє\w]/, '');
//       } else if (key === 'email') {
//         values.email = values.email.replace(/^[^\w]/, '');
//       } else if (key === 'password') {
//         values.password = values.password.trim();
//       } else {
//         throw new Error(
//           `add case for "${String(
//             key,
//           )}" value normalize or don't use this key as argument of function "normalizeValuesByKeys"`,
//         );
//       }
//     });
//   };
// };

type ObjectKeyType = string | number | symbol;
type ObjectType = { [x: ObjectKeyType]: string };

enum Fields {
  NAME = 'name',
  EMAIL = 'email',
  PASSWORD = 'password',
}

const normalizeValue = (value: ObjectKeyType, values: ObjectType) => {
  switch (value) {
    case Fields.NAME:
      values[value] = values[value].replace(/^[^А-Яа-яґҐЁёІіЇїЄє\w]/, '');
      break;

    case Fields.EMAIL:
      values[value] = values[value].replace(/^[^\w]/, '');
      break;

    case Fields.PASSWORD:
      values[value] = values[value].trim();
      break;

    default:
      throw new Error(
        `add case for "${String(
          value,
        )}" value normalize or don't use this key as argument of function "normalizeValuesByKeys"`,
      );
  }
};

export const normalizeValuesByKeys = <T extends object>(
  keys: (keyof T)[],
): CallBack<T> => {
  return (values: T) => {
    const set = new Set(keys);
    set.forEach(key => {
      normalizeValue(key, values as ObjectType);
    });
  };
};

// export const whriteValuesToStorage = <
//   T extends ISignUpState | ISignInState,
// >(): CallBack<T> => {
//   return (values: T) => {
//     if (isSignUpState(values)) {
//       sessionStorage.setItem(
//         StorageFormsKeys.SIGN_UP,
//         JSON.stringify({ name: values.name, email: values.email }),
//       );
//     } else {
//       sessionStorage.setItem(
//         StorageFormsKeys.SIGN_IN,
//         JSON.stringify({ email: values.email }),
//       );
//     }
//   };
// };

export const whriteValuesToStorage = <T extends object>(
  storageKey: StorageFormsKeys,
  ValuesKeys: (keyof T)[],
): CallBack<T> => {
  return (values: T) => {
    const set = new Set(ValuesKeys);

    const acc = [...set].reduce((acc, key) => {
      return (acc = { ...acc, [key]: values[key] });
    }, {});

    console.log('acc', acc);

    sessionStorage.setItem(storageKey, JSON.stringify(acc));

    // if (isSignUpState(values)) {
    //   sessionStorage.setItem(
    //     StorageFormsKeys.SIGN_UP,
    //     JSON.stringify({ name: values.name, email: values.email }),
    //   );
    // } else {
    //   sessionStorage.setItem(
    //     StorageFormsKeys.SIGN_IN,
    //     JSON.stringify({ email: values.email }),
    //   );
    // }
  };
};

interface IFormStateProps<T> {
  normalizeValues(values: T): void;
  whriteValuesToStorage(values: T): void;
}

export const FormState2 = ({
  normalizeValues,
  whriteValuesToStorage,
}: IFormStateProps<ISignUpState | ISignInState>): null => {
  const { values } = useFormikContext<ISignUpState | ISignInState>();

  normalizeValues(values);

  useEffect(() => {
    whriteValuesToStorage(values);
  }, [values, whriteValuesToStorage]);

  return null;
};

// export default FormState;
