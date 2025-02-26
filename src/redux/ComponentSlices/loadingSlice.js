// loadingSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  activeRequests: 0,
};

const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    startLoading: (state) => {
      state.isLoading = true;
      state.activeRequests++;
    },
    finishLoading: (state) => {
      if (state.activeRequests > 0) {
        state.activeRequests--;
      }
      state.isLoading = state.activeRequests > 0;
    },
  },
});

export const { startLoading, finishLoading } = loadingSlice.actions;
export default loadingSlice.reducer;
