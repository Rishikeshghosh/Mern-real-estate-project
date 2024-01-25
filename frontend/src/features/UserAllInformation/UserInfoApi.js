import axios from "axios";
const user = JSON.parse(localStorage.getItem("userInfo"));

export const getUser = async (userId) => {
  const config = {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  };
  return axios.get(
    `https://real-estate-backend-1-jnar.onrender.com/api/user/getsingleuser/${userId}`,
    config
  );
};
export const updateUserProfileImage = async (userData) => {
  const config = {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  };
  return axios.patch(
    "https://real-estate-backend-1-jnar.onrender.com/api/user/update/profile/image",
    userData,
    config
  );
};
