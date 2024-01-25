import React, { useEffect, useState } from "react";
import { GoArrowRight } from "react-icons/go";
import { RotatingLines } from "react-loader-spinner";
import "./ForgotPassword.css";
import { Link, useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { IoIosArrowForward } from "react-icons/io";

import {
  emailNotFound,
  resetEmailNotFound,
  resetSentMail,
  sendForgotPasswordRequestAsync,
  sentEmail,
} from "../../features/SendEmail/SendEmailSlice";

const Login = () => {
  const [move, setMove] = useState(false);
  const [move1, setMove1] = useState(false);
  const [email, setEmail] = useState("");
  const [hideShow, setHideShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const emailSucc = useSelector(sentEmail);
  const emailError = useSelector(emailNotFound);

  const handleRedirectToLoginPage = () => {
    navigate("/Login");
  };
  const handleOnChange = (val) => {
    if (val === "1") {
      setMove1(!move1);
      setMove(false);
    } else {
      setMove(!move);
      setMove1(false);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!email) {
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
      } else {
        setLoading(true);

        dispatch(sendForgotPasswordRequestAsync({ email: email }));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (emailError) {
      setLoading(false);
      toast.error("Given email is not found !", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      dispatch(resetEmailNotFound());
    }
    if (emailSucc) {
      setLoading(false);
      toast.success("Reset password mail sent to your given email address !", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      dispatch(resetSentMail());
    }
    setLoading(false);
  }, [emailSucc, emailError]);

  return (
    <section className="login-wrapper ">
      <ToastContainer />
      <div className="login-main-header">
        <Header />
      </div>
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="login-container forgot-pass"
      >
        <div className="login-header">
          <h2>Forgot Password ?</h2>
          <span className="header-text">
            Reset password in two quick steps !
          </span>
        </div>

        <div onFocus={() => handleOnChange("0")} className="login-input">
          <span
            className={`${
              move || email ? "input-box-move-email " : "input-box"
            }`}
          >
            Email
          </span>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder=""
            type="text"
          />
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
              "Send email"
            )}
          </button>

          <div className="back-link">
            <span onClick={() => handleRedirectToLoginPage()}>
              Back to login <IoIosArrowForward size={16} />
            </span>
          </div>
        </div>
      </form>
    </section>
  );
};

export default Login;
