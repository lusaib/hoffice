// redux/togglesSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

const toggleSlice = createSlice({
  name: "toggles",
  initialState: {},
  reducers: {
    toggle: (state, action) => {
      const { toggleId } = action.payload;
      state[toggleId] = !state[toggleId];
    },
    clearToggle: () => {
      return {};
    },
  },
});

/**
 * @author Lusaib Latheef
 * @description This is a synchronous thunk action to toggle the state of the toggle.
 */
export const toggleWithStateCheck = createAsyncThunk(
  "toggles/toggleWithStateCheck",
  async ({ toggleId, checkIfTrue }, { getState, dispatch }) => {
    const state = getState();
    const currentToggleValue = state?.toggle?.[toggleId];

    if ((checkIfTrue && currentToggleValue) || !checkIfTrue) {
      dispatch(toggle({ toggleId }));
    }
  }
);

export const { toggle, clearToggle } = toggleSlice.actions;
export default toggleSlice.reducer;
