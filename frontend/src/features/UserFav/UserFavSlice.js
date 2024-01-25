import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchUserAllFav, removeUserFav } from "./UserFavAPI";

const initialState = {
  userAllFav: [],
  status: "idle",
  update: false,
  error: false,
};

export const getUserAllFavAsync = createAsyncThunk(
  "userInfo/getfav",
  async (token) => {
    const response = await fetchUserAllFav(token);
    return response.data;
  }
);

export const removeorAddFavAsync = createAsyncThunk(
  "userInfo/removeFav",
  async (data) => {
    const response = await removeUserFav(data);
    return response.data;
  }
);

export const UserInfoSlice = createSlice({
  name: "userInformation",
  initialState,

  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getUserAllFavAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getUserAllFavAsync.rejected, (state, action) => {
        state.status = "idle";
        state.error = true;
      })
      .addCase(getUserAllFavAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.userAllFav = action.payload;
      })
      .addCase(removeorAddFavAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(removeorAddFavAsync.rejected, (state, action) => {
        state.status = "idle";
        state.error = true;
      })
      .addCase(removeorAddFavAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.update = state.update ? false : true;
      });
  },
});

export const fav = (state) => state.fav.userAllFav;
export const reRander = (state) => state.fav.update;

export default UserInfoSlice.reducer;
