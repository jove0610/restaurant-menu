/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  title: '',
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    updateTitle(state, action) {
      state.title = action.payload;
    },
  },
});

export const getTitle = (state) => state.app.title;

export const { updateTitle } = appSlice.actions;

export default appSlice.reducer;
