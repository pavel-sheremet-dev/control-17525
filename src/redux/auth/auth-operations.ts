import axios, { AxiosError } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { SignInUser, User } from 'redux/types';
import { RootState } from 'redux/store';
// import { IUserInitialState, User } from 'redux/types';

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
    const { data } = await axios.post(SIGN_UP_ENDPOINT, credentials);
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      thunkAPI.rejectWithValue(error.message);
    }
    // notify, throw err etc.
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
    const { data } = await axios.post(SIGN_IN_ENDPOINT, credentials);
    token.set(data.token);
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
});

const signOut = createAsyncThunk<
  any,
  any,
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
    const { data } = await axios.get(GET_USER_ENDPOINT);
    return data;
  } catch (error) {
    token.unset();
    if (error instanceof AxiosError) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
});

export { signUp, signIn, signOut, getUser };
