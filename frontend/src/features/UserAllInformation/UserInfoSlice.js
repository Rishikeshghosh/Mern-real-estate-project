import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getUser, updateUserProfileImage } from "./UserInfoApi";

const initialState = {
  userAllInfo: {},
  status: "idle",
  updatedUser: false,
  updatedUserError: false,
};

export const getTheUserAsync = createAsyncThunk(
  "userInfo/Getuser",
  async (userId) => {
    const response = await getUser(userId.id);
    return response.data;
  }
);

export const updateUserImgaeAsync = createAsyncThunk(
  "userInfo/updateImage",
  async (userData) => {
    const response = await updateUserProfileImage(userData);
    return response.data;
  }
);

export const UserInfoSlice = createSlice({
  name: "userInfo",
  initialState,

  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getTheUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getTheUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.userAllInfo = action.payload;
      })
      .addCase(getTheUserAsync.rejected, (state) => {
        state.status = "loading";
      })
      .addCase(updateUserImgaeAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateUserImgaeAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.updatedUser = true;
      })
      .addCase(updateUserImgaeAsync.rejected, (state) => {
        state.status = "loading";
      });
  },
});

export const userImage = (state) => state.userData.updatedUser;

export const userInfo = (state) => state.userData.userAllInfo;

export default UserInfoSlice.reducer;
