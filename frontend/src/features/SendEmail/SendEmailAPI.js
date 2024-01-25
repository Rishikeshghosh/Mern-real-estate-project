import axios from "axios";
export const sendForgotPasswordRequest = (email) => {
  try {
    return axios.post(
      "https://real-estate-backend-1-jnar.onrender.com/api/email/forgot/password",
      email
    );
  } catch (error) {
    console.log(error);
  }
};
export const resetPassword = (data) => {
  try {
    return axios.patch(
      "https://real-estate-backend-1-jnar.onrender.com/api/user/resetPassword",
      data
    );
  } catch (error) {
    console.log(error);
  }
};
