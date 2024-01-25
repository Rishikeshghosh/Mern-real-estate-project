import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  cancelUserSingleBooking,
  getAllUserBookings,
  setBooking,
} from "./UserBookingAPI";

const initialState = {
  userBooking: [],
  update: false,
  status: "idle",
};

export const setBookingAsync = createAsyncThunk(
  "userbooking/setbooking",
  async (data) => {
    const response = await setBooking(data);
    return response.data;
  }
);
export const getUserAllBookingsAsync = createAsyncThunk(
  "userbooking/getbookings",
  async () => {
    const response = await getAllUserBookings();
    return response.data;
  }
);
export const cancelUserSingleBookingsAsync = createAsyncThunk(
  "userbooking/cancelbooking",
  async (data) => {
    const response = await cancelUserSingleBooking(data);
    return response.data;
  }
);
export const userBooking = createSlice({
  name: "userBooking",
  initialState,

  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(setBookingAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(setBookingAsync.fulfilled, (state, action) => {
        state.status = "idle";
        console.log(action.payload);
        state.userBooking = action.payload;
        state.update = state.update ? false : true;
      })
      .addCase(setBookingAsync.rejected, (state, action) => {
        state.status = "idle";
      })
      .addCase(getUserAllBookingsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getUserAllBookingsAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.userBooking = action.payload;
      })
      .addCase(getUserAllBookingsAsync.rejected, (state, action) => {
        state.status = "idle";
      })
      .addCase(cancelUserSingleBookingsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(cancelUserSingleBookingsAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.update = state.update ? false : true;
      })
      .addCase(cancelUserSingleBookingsAsync.rejected, (state, action) => {
        state.status = "idle";
      });
  },
});

export const booking = (state) => state.booking.userBooking;
export const update = (state) => state.booking.update;

export default userBooking.reducer;
