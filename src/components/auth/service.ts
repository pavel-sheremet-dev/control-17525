import { StorageFormsKeys } from './types';

export const getValueFromSessionStorage = (key: StorageFormsKeys): string => {
  return sessionStorage.getItem(key) ?? '';
};
