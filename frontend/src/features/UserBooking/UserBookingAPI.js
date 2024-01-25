import axios from "axios";

export const setBooking = (data) => {
  console.log(data);
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axios.post(
    `https://real-estate-backend-1-jnar.onrender.com/api/residancy/bookResidancy/${data.id}`,
    data,
    config
  );
};
export const getAllUserBookings = () => {
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return axios.get(
    `https://real-estate-backend-1-jnar.onrender.com/api/user/getuserallbookings`,
    config
  );
};

export const cancelUserSingleBooking = (data) => {
  return axios.patch(
    `https://real-estate-backend-1-jnar.onrender.com/api/user/cancelBooking/${data.id}`,
    data
  );
};
