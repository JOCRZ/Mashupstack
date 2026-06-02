import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  email: null,
  token: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess(state, action) {
      state.email = action.payload.email;
      state.token = action.payload.token;
    },
    logout(state) {
      state.email = null;
      state.token = null;
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
