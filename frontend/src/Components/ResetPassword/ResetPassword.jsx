import React, { useEffect, useState } from "react";
import "./ResetPassword.css";
import { GoArrowRight } from "react-icons/go";
import { Link, Navigate, json, useNavigate } from "react-router-dom";
import { RotatingLines } from "react-loader-spinner";
import {
  registerError,
  registerUserAsync,
  setRegisterError,
  submit,
  userData,
} from "../../features/Authentication/registerUserSlice";
import { useDispatch, useSelector } from "react-redux";
import Header from "../Header/Header";
import { ToastContainer, toast } from "react-toastify";
import { IoIosArrowForward } from "react-icons/io";
import {
  resetPassSucc,
  resetPasswordAsync,
} from "../../features/SendEmail/SendEmailSlice";

const SignUp = () => {
  const [move1, setMove1] = useState(false);
  const [move2, setMove2] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [hideShow, setHideShow] = useState(false);
  const [hideShow1, setHideShow1] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispath = useDispatch();
  const navigate = useNavigate();
  const query = new URLSearchParams(window.location.search);
  const token = query.get("token");
  const email = query.get("email");
  const passwordSatSuccesfully = useSelector(resetPassSucc);

  const handleRedirectToLoginPage = () => {
    navigate("/Login");
  };

  const handleOnChange = (val) => {
    if (val === "1") {
      setMove1(!move1);
      setMove2(false);
    } else if (val === "2") {
      setMove2(!move2);
      setMove1(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!newPassword || !confirmNewPassword) {
        toast.error("All fields must be filled up!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else if (newPassword !== confirmNewPassword) {
        toast.error("Password doesn't match !", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        let newPasswodInfo = {
          email: email,
          newPassword: newPassword,
          token: token,
        };
        setLoading(true);
        dispath(resetPasswordAsync(newPasswodInfo));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (passwordSatSuccesfully) {
      setLoading(false);

      toast.success("New password updated succesfully !", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }, [passwordSatSuccesfully]);

  return (
    <section className="signup-wrapper">
      <ToastContainer />
      <div className="signup-main-header">
        <Header />
      </div>
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="signup-container reset-pass"
      >
        <div className="signup-header">
          <h2>Reset Password</h2>
          <span className="header-text">
            Everything will secured by homyz !
          </span>
        </div>
        <div onFocus={() => handleOnChange("2")} className="signup-input">
          <span
            className={`${
              move2 || newPassword ? "input-box-move-new-password" : "input-box"
            }`}
          >
            New password
          </span>
          <input
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder=""
            type={hideShow1 ? "text" : "password"}
          />
          <span onClick={() => setHideShow1(!hideShow1)} className="hide-show">
            {hideShow1 ? "Hide" : "Show"}
          </span>
        </div>

        <div onFocus={() => handleOnChange("1")} className="signup-input">
          <span
            className={`${
              move1 || confirmNewPassword
                ? "input-box-move-new-confirm-password "
                : "input-box"
            }`}
          >
            Confirm new password
          </span>
          <input
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
            placeholder=""
            type={hideShow ? "text" : "password"}
          />
          <span onClick={() => setHideShow(!hideShow)} className="hide-show">
            {hideShow ? "Hide" : "Show"}
          </span>
        </div>

        <div className="spans">
          <button className="button">
            {loading ? (
              <RotatingLines
                strokeColor="white"
                strokeWidth="5"
                animationDuration="0.75"
                width="30"
                visible={true}
              />
            ) : (
              "Reset password"
            )}
          </button>

          <div className="back-link">
            <span onClick={() => handleRedirectToLoginPage()}>
              Back to login <IoIosArrowForward size={16} />
            </span>{" "}
          </div>
        </div>
      </form>
    </section>
  );
};

export default SignUp;
