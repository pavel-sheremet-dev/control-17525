export enum StorageFormsKeys {
  USER_NAME = 'username',
  USER_EMAIL = 'usermail',
  SIGN_UP = 'auth-form-signup',
  SIGN_IN = 'auth-form-signin',
}

export interface ISignUpState {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
  agreement: boolean;
}

export type LSSignUpState = Pick<ISignUpState, 'name' | 'email'>;
