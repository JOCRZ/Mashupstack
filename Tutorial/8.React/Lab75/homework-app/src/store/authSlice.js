import { createSlice } from '@reduxjs/toolkit';

function loadFromStorage(key) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

const initialState = {
  user: loadFromStorage('user'),
  token: localStorage.getItem('token') || null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action) {
      if (!action.payload.token) return;
      state.user = action.payload.user || null;
      state.token = action.payload.token;
      localStorage.setItem('user', JSON.stringify(state.user));
      localStorage.setItem('token', state.token);
    },
    logout(state) {
      state.user = null;
      state.token = null;
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    },
    setUserFromLocalStorage(state) {
      const savedUser = localStorage.getItem('user');
      const savedToken = localStorage.getItem('token');
      if (savedUser && savedToken) {
        try {
          state.user = JSON.parse(savedUser);
          state.token = savedToken;
        } catch {
          localStorage.removeItem('user');
          localStorage.removeItem('token');
        }
      }
    },
  },
});

export const { login, logout, setUserFromLocalStorage } = authSlice.actions;
export default authSlice.reducer;
