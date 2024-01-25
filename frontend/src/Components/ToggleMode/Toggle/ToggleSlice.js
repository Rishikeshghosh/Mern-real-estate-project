import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: 0,
  status: "idle",
  toggleMode: false,
};

export const toggleSlice = createSlice({
  name: "toggle",
  initialState,

  reducers: {
    setToggleMode: (state) => {
      state.toggleMode ? (state.toggleMode = false) : (state.toggleMode = true);
    },
  },
});

export const { setToggleMode } = counterSlice.actions;

export const toggleValue = (state) => state.toggleReducer.toggleMode;

export default toggleSlice.reducer;
