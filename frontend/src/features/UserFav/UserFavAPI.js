import axios from "axios";

export const fetchUserAllFav = (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axios.get(
    "https://real-estate-backend-1-jnar.onrender.com/api/user/getuserallfav",

    config
  );
};
export const removeUserFav = async (data) => {
  const token = localStorage.getItem("token");

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return axios.patch(
    `https://real-estate-backend-1-jnar.onrender.com/api/user/addorremoveitem/${data.id}`,
    data
  );
};
