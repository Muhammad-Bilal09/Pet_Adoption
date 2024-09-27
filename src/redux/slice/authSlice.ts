import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import { AuthState,User } from '../../types/types';

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action: PayloadAction<User>) {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.error = null;
    },
    logout(state) {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
  },
});

export const {login, logout, setError} = authSlice.actions;

export default authSlice.reducer;
