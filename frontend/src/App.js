import React, { useEffect, useState } from "react";
import "./App.css";
import Website from "./Components/Pages/Website";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Properties from "./Components/Pages/Properties/Properties";
import Property from "./Components/Pages/Property/Property";
import SignUp from "./Components/SignUp/SignUp";
import Login from "./Components/Login/Login";
import UserProfile from "./Components/UserProfile/UserProfile";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUserAsync,
  userImage,
} from "./features/Authentication/registerUserSlice";
import Favourite from "./Components/Favourite/Favourite";
import { getUserAllFavAsync, reRander } from "./features/UserFav/UserFavSlice";

import {
  getUserAllBookingsAsync,
  update,
} from "./features/UserBooking/UserBookingSlice";
import Booking from "./Components/Booking/Booking";
import OrderSuccesfull from "./Components/Pages/OrderSuccesfull/Successfull";
import CreateSuccessfull from "./Components/Pages/CreateSuccesfull/Successfull";
import CreateProperty from "./Components/CreateProperty/CreateProperty";
import OwnedProperty from "./Components/OwnedProperty/OwnedProperty";
import UpdateSuccessfull from "./Components/Pages/UpdateSuccesfull/UpdateSucceessfull";
import EditProperty from "./Components/OwnedPropertyEdit/OwnedProperty";
import ForgotPassword from "./Components/ForgotPassword/ForgotPassword";
import ResetPassword from "./Components/ResetPassword/ResetPassword";
import {
  createUpdate,
  dltPropSucc,
  getUserAllCreatedPropertiesAsync,
  updateSuccProp,
} from "./features/Properties/PropertiesSlice";
import PriceRange from "./Components/Pages/PriceRange/PriceRange";

function App() {
  const image = useSelector(userImage);
  const update1 = useSelector(reRander);
  const update2 = useSelector(update);
  const update3 = useSelector(dltPropSucc);
  const update4 = useSelector(updateSuccProp);
  const update5 = useSelector(createUpdate);

  const dispatch = useDispatch();
  const token = localStorage.getItem("token");

  const getUser = () => {
    dispatch(fetchUserAsync(token));
  };
  const fetchUserFav = () => {
    dispatch(getUserAllFavAsync(token));
  };
  const getUserAllBookings = () => {
    dispatch(getUserAllBookingsAsync());
  };
  const fetchUserAllCreatedProperty = () => {
    dispatch(getUserAllCreatedPropertiesAsync());
  };

  useEffect(() => {
    getUser();
    fetchUserFav();
    getUserAllBookings();
    fetchUserAllCreatedProperty();
  }, [image, update1, update2, update3, update4, update5]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Website />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Favourite" element={<Favourite />} />
        <Route path="/Booking" element={<Booking />} />
        <Route path="/Forgot/Password" element={<ForgotPassword />} />
        <Route path="/Reset-Password" element={<ResetPassword />} />
        <Route path="/Owned/Property" element={<OwnedProperty />} />
        <Route path="/Create/Property" element={<CreateProperty />} />
        <Route path="/Edit/Property/:resId" element={<EditProperty />} />
        <Route path="/create/propertry" element={<CreateProperty />} />
        <Route path="/profile/:userId" element={<UserProfile />} />
        <Route
          path="/Updated/Successfull/:resId"
          element={<UpdateSuccessfull />}
        />
        <Route
          path="/booked/successfull/:bookId"
          element={<OrderSuccesfull />}
        />
        <Route
          path="/created/successfull/:resId"
          element={<CreateSuccessfull />}
        />

        <Route path="/Properties">
          <Route index element={<Properties />} />
          <Route path=":propertyId" element={<Property />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
