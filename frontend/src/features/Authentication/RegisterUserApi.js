import axios from "axios";

export const fetchUser = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axios.get(
    "https://real-estate-backend-1-jnar.onrender.com/api/user/fetchuser/fromhome",
    config
  );
};

export const registerUser = async (userData) => {
  return axios.post(
    "https://real-estate-backend-1-jnar.onrender.com/api/user/register",
    userData
  );
};

export const loginUser = async (userData) => {
  try {
    return axios.post(
      "https://real-estate-backend-1-jnar.onrender.com/api/user/login",
      userData
    );
  } catch (error) {
    console.log(error);
  }
};
export const getUser = async (userId) => {
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axios.get(
    `https://real-estate-backend-1-jnar.onrender.com/api/user/getsingleuser/${userId}`,
    config
  );
};
export const updateUserProfileImage = async (userData) => {
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axios.patch(
    "https://real-estate-backend-1-jnar.onrender.com/api/user/update/profile/image",
    userData,
    config
  );
};

export const updateUserInfo = (userData) => {
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axios.patch(
    "https://real-estate-backend-1-jnar.onrender.com/api/user/update/profile/info",
    userData,
    config
  );
};

export const deleteUserAccount = () => {
  try {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    return axios.delete(
      "https://real-estate-backend-1-jnar.onrender.com/api/user/delete/account",

      config
    );
  } catch (error) {
    console.log(error);
  }
};
