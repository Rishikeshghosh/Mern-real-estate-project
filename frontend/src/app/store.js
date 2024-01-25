import { configureStore } from "@reduxjs/toolkit";
import toggleReducer from "../Components/ToggleMode/ToggleSlice";
import PropertiesReducer from "../features/Properties/PropertiesSlice";
import UserReducer from "../features/Authentication/registerUserSlice";
import UserInfoReducer from "../features/UserFav/UserFavSlice";
import BookingReducer from "../features/UserBooking/UserBookingSlice";
import EmailReducer from "../features/SendEmail/SendEmailSlice";
export const store = configureStore({
  reducer: {
    toggle: toggleReducer,
    properties: PropertiesReducer,
    user: UserReducer,
    fav: UserInfoReducer,
    booking: BookingReducer,
    email: EmailReducer,
  },
});
