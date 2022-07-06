import { RootState } from 'redux/store';

const getUserName = (state: RootState): string => state.auth.user.name;

const getUserEmail = (state: RootState): string => state.auth.user.email;

const getToken = (state: RootState): string => state.auth.token;

const getError = (state: RootState): string => state.auth.error;

const getIsLoggedIn = (state: RootState): boolean => state.auth.isLogIn;

const getLoading = (state: RootState): boolean => state.auth.loading;

const getLoadingUser = (state: RootState): boolean => state.auth.loadingUser;

export {
  getUserName,
  getUserEmail,
  getToken,
  getError,
  getIsLoggedIn,
  getLoading,
  getLoadingUser,
};

export {};
