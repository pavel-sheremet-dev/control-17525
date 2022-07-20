export enum StorageFormsKeys {
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

export interface ISignInState {
  email: string;
  password: string;
}

export type LSSigInState = Pick<ISignUpState, 'email'>;
