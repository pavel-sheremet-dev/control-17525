export type User = {
  name: string;
  email: string;
};

export type SignInUser = {
  user: User;
  token: string;
};

export interface IUserInitialState {
  user: User;
  token: string;

  isLogIn: boolean;
  loading: boolean;
  loadingUser: boolean;

  error: string;
}

export interface IState {
  auth: IUserInitialState;
}
