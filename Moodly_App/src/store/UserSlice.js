// userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  token: null,
  role: null,
  TodayMood: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.role = action.payload.role;
      state.TodayMood = action.payload.TodayMood;
    },
    logoutUser: (state) => {
      state.user = null;
      state.token = null;
      state.role = null;
      state.TodayMood = null;
    },
  },
});

// Export des actions
export const { setUser, logoutUser } = userSlice.actions;

// Export du réducteur
export default userSlice.reducer;
