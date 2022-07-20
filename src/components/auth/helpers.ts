import { StorageFormsKeys } from './types';

const isObjectStorageState = <T>(
  value: T | object,
  initialStorageValue: T,
): value is T => {
  if (typeof value === 'object') {
    return Object.keys(value).every(key => key in initialStorageValue);
  } else {
    return false;
  }
};

const parseState = <T>(value: string, initialStorageValue: T): T => {
  try {
    const parsedValue = JSON.parse(value);

    if (isObjectStorageState<T>(parsedValue, initialStorageValue)) {
      return parsedValue;
    } else {
      return initialStorageValue;
    }
  } catch (error) {
    return initialStorageValue;
  }
};

export const getValueFromStorage = <T = StorageFormsKeys, U = {}>(
  key: T,
  initialStogateValue: U,
): U => {
  if (typeof key === 'string') {
    const unParsedInitialState = sessionStorage.getItem(key) ?? '';
    return {
      ...initialStogateValue,
      ...parseState<U>(unParsedInitialState, initialStogateValue),
    };
  } else {
    throw new Error('Key must be a string');
  }
};
