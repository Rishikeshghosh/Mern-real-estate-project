import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { resetPassword, sendForgotPasswordRequest } from "./SendEmailAPI";

const initialState = {
  value: 0,
  status: "idle",
  sentEmail: false,
  sentEmailError: false,
  resetPasswordSucc: false,
  emailNotFound: false,
};

export const sendForgotPasswordRequestAsync = createAsyncThunk(
  "Email/forgotEmailrequest",
  async (data) => {
    const response = await sendForgotPasswordRequest(data);

    return response.data;
  }
);

export const resetPasswordAsync = createAsyncThunk(
  "Email/resetPassword",
  async (data) => {
    const response = await resetPassword(data);
    return response.data;
  }
);

export const SendEmailSlice = createSlice({
  name: "Email",
  initialState,

  reducers: {
    setAllPasswodInfoBlank: (state) => {
      state.resetPasswordSucc = false;
      state.sentEmail = false;
    },
    resetSentMail: (state) => {
      state.sentEmail = false;
    },
    resetEmailNotFound: (state) => {
      state.emailNotFound = false;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(sendForgotPasswordRequestAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(sendForgotPasswordRequestAsync.rejected, (state, action) => {
        state.status = "idle";
        state.emailNotFound = true;
      })
      .addCase(sendForgotPasswordRequestAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.sentEmail = true;
      })
      .addCase(resetPasswordAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(resetPasswordAsync.rejected, (state, action) => {
        state.status = "idle";
      })
      .addCase(resetPasswordAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.resetPasswordSucc = true;
      });
  },
});

export const { setAllPasswodInfoBlank, resetSentMail, resetEmailNotFound } =
  SendEmailSlice.actions;
export const sentEmail = (state) => state.email.sentEmail;
export const resetPassSucc = (state) => state.email.resetPasswordSucc;
export const emailNotFound = (state) => state.email.emailNotFound;

export default SendEmailSlice.reducer;
