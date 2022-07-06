import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { authOperations } from './index';
import { IUserInitialState } from '../types';
const { signUp, signIn, signOut, getUser } = authOperations;

const initialState: IUserInitialState = {
  user: { name: '', email: '' },
  token: '',
  isLogIn: false,

  loading: false,
  loadingUser: false,

  error: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, { payload }: PayloadAction<string>) => {
      state.token = payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(signUp.pending, state => {
        state.loading = true;
        state.error = '';
      })
      .addCase(signUp.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.user.email = payload.email;
        state.user.name = payload.name;
      })
      .addCase(signUp.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload ?? '';
        state.isLogIn = false;
      })
      // Sign In
      .addCase(signIn.pending, state => {
        state.loading = true;
        state.error = '';
      })
      .addCase(signIn.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.user.email = payload.user.email;
        state.user.name = payload.user.name;
        state.token = payload.token;
        state.isLogIn = true;
      })
      .addCase(signIn.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload ?? '';
        state.isLogIn = false;
      })
      // Sign out
      .addCase(signOut.pending, state => {
        state.loading = true;
        state.error = '';
      })
      .addCase(signOut.fulfilled, state => {
        state.loading = false;
        state.user = initialState.user;
        state.token = '';
        state.isLogIn = false;
      })
      .addCase(signOut.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload ?? '';
        state.isLogIn = false;
      })
      .addCase(getUser.pending, state => {
        state.loadingUser = true;
        state.error = '';
      })
      .addCase(getUser.fulfilled, (state, { payload }) => {
        state.loadingUser = false;
        state.user = payload;
        state.isLogIn = true;
      })
      .addCase(getUser.rejected, (state, { payload }) => {
        state.loadingUser = false;
        state.error = payload ?? '';
        state.token = '';
        state.isLogIn = false;
      });
  },
});

export const { setToken } = authSlice.actions;
export default authSlice.reducer;
