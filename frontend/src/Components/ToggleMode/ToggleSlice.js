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
    setToggleMode: (state, action) => {
      state.toggleMode = action.payload.val;
    },
  },
});

export const { setToggleMode } = toggleSlice.actions;

export const toggleValue = (state) => state.toggle.toggleMode;

export default toggleSlice.reducer;
