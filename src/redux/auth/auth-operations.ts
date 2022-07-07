import axios, { AxiosError, AxiosResponse } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { SignInUser, User } from 'redux/types';
import { RootState } from 'redux/store';

const SIGN_UP_ENDPOINT = 'api/users/signup';
const SIGN_IN_ENDPOINT = 'api/users/login';
const SIGN_OUT_ENDPOINT = 'api/users/logout';
const GET_USER_ENDPOINT = 'api/users/current';

interface IToken {
  set(token: string): void;
  unset(): void;
}

const token: IToken = {
  set(token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unset() {
    axios.defaults.headers.common.Authorization = '';
  },
};

type UserCredentials = {
  name: string;
  email: string;
  password: string;
};

type UserSignInCredentials = {
  email: string;
  password: string;
};

const signUp = createAsyncThunk<
  User,
  UserCredentials,
  {
    rejectValue: string;
  }
>('auth/signUp', async (credentials, thunkAPI) => {
  try {
    const res = (await axios.post(
      SIGN_UP_ENDPOINT,
      credentials,
    )) as AxiosResponse<User>;
    return res.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      thunkAPI.rejectWithValue(error.message);
    }
    throw new Error();
  }
});

const signIn = createAsyncThunk<
  SignInUser,
  UserSignInCredentials,
  {
    rejectValue: string;
  }
>('auth/logIn', async (credentials, thunkAPI) => {
  try {
    const res = (await axios.post(
      SIGN_IN_ENDPOINT,
      credentials,
    )) as AxiosResponse<SignInUser>;
    token.set(res.data.token);
    return res.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      return thunkAPI.rejectWithValue(error.message);
    }
    throw new Error();
  }
});

const signOut = createAsyncThunk<
  void,
  unknown,
  {
    rejectValue: string;
  }
>('auth/signOut', async (_, thunkAPI) => {
  try {
    await axios.post(SIGN_OUT_ENDPOINT);
    token.unset();
  } catch (error) {
    if (error instanceof AxiosError) {
      return thunkAPI.rejectWithValue(error.message);
    }
    throw new Error();
  }
});

const getUser = createAsyncThunk<
  User,
  any,
  {
    state: RootState;
    rejectValue: string;
  }
>('auth/getUser', async (_, thunkAPI) => {
  const savedToken = thunkAPI.getState().auth.token;

  if (!savedToken) {
    return thunkAPI.rejectWithValue('Not authorized');
  }

  token.set(savedToken);

  try {
    const res = (await axios.get(GET_USER_ENDPOINT)) as AxiosResponse<User>;
    return res.data;
  } catch (error) {
    token.unset();
    if (error instanceof AxiosError) {
      return thunkAPI.rejectWithValue(error.message);
    }
    throw new Error();
  }
});

export { signUp, signIn, signOut, getUser };
