import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  deleteUserAccount,
  fetchUser,
  getUser,
  loginUser,
  registerUser,
  updateUserInfo,
  updateUserProfileImage,
} from "./RegisterUserApi";

const initialState = {
  user: {},
  deleteUserAccount: {},
  loading: false,
  loggedInUser: {},
  userAllInfo: {},
  updatedUser: false,
  updatedUserError: false,
  update: {},
  loginError: false,
  registerError: false,
  submition: false,
};

export const registerUserAsync = createAsyncThunk(
  "authentication/signIn",
  async (userData) => {
    const response = await registerUser(userData.userInfo);
    return response.data;
  }
);

export const loginUserAsync = createAsyncThunk(
  "authentication/login",
  async (userData) => {
    const response = await loginUser(userData.userInfo);
    return response.data;
  }
);

export const getTheUserAsync = createAsyncThunk(
  "authentication/Getuser",
  async (userData) => {
    try {
      const response = await getUser(userData.id);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const updateUserImgaeAsync = createAsyncThunk(
  "authentication/updateImage",
  async (userData) => {
    try {
      const response = await updateUserProfileImage(userData);
      return "succesfully Uploaded ";
    } catch (error) {
      console.log(error);
    }
  }
);

export const fetchUserAsync = createAsyncThunk(
  "authentication/fetchuser",
  async (token) => {
    try {
      const response = await fetchUser(token);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const updateUserInfoAsync = createAsyncThunk(
  "authentication/update",
  async (userData) => {
    try {
      const response = await updateUserInfo(userData);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const deleteUserAccountAsync = createAsyncThunk(
  "authentication/delete",
  async () => {
    const response = await deleteUserAccount();
    return response.data;
  }
);

export const registerUserAndLogin = createSlice({
  name: "athentication",
  initialState,

  reducers: {
    logOutUser: (state) => {
      state.user = {};
      state.updatedUser = state.updatedUser ? false : true;
      state.loggedInUser = {};
    },
    setLoginError: (state, action) => {
      state.loginError = false;
    },
    setRegisterError: (state, action) => {
      state.registerError = false;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(registerUserAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerUserAsync.rejected, (state, action) => {
        state.loading = false;
        state.submition = state.submition ? false : true;
        state.registerError = true;
      })
      .addCase(registerUserAsync.fulfilled, (state, action) => {
        state.user = action.payload;
        state.registerError = false;
        state.loading = false;
      })
      .addCase(loginUserAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUserAsync.rejected, (state, action) => {
        state.submition = state.submition ? false : true;
        state.loginError = true;
        state.loading = false;
      })
      .addCase(loginUserAsync.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loggedInUser = action.payload;
        state.loginError = false;
        state.loading = false;
      })
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
        state.updatedUser = state.updatedUser ? false : true;
      })
      .addCase(updateUserImgaeAsync.rejected, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.user = action.payload;
      })
      .addCase(fetchUserAsync.rejected, (state) => {
        state.status = "loading";
      })
      .addCase(updateUserInfoAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateUserInfoAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.update = action.payload;
      })
      .addCase(updateUserInfoAsync.rejected, (state) => {
        state.status = "loading";
      })
      .addCase(deleteUserAccountAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteUserAccountAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.deleteUserAccount = action.payload;
        state.userAllInfo = {};
        state.user = {};
        state.loggedInUser = {};
        state.updatedUser = state.updatedUser ? false : true;
      })
      .addCase(deleteUserAccountAsync.rejected, (state) => {
        state.status = "loading";
      });
  },
});

export const { logOutUser, setLoginError, setRegisterError } =
  registerUserAndLogin.actions;

export const userImage = (state) => state.user.updatedUser;
export const update = (state) => state.user.update;
export const registerError = (state) => state.user.registerError;
export const loginError = (state) => state.user.loginError;
export const userInfo = (state) => state.user.userAllInfo;
export const submit = (state) => state.user.submition;
export const userData = (state) => state.user.user;
export const loggedInUser = (state) => state.user.loggedInUser;
export const deleteUserAccountSucc = (state) => state.user.deleteUserAccount;

export default registerUserAndLogin.reducer;
