import React, { useEffect, useState } from "react";
import { GoArrowRight } from "react-icons/go";
import { RotatingLines } from "react-loader-spinner";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import { useDispatch, useSelector } from "react-redux";
import {
  loggedInUser,
  loginError,
  loginUserAsync,
  setLoginError,
  submit,
} from "../../features/Authentication/registerUserSlice";
import { ToastContainer, toast } from "react-toastify";

const Login = () => {
  const [move, setMove] = useState(false);
  const [move1, setMove1] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hideShow, setHideShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const error = useSelector(loginError);
  const submitPeoccess = useSelector(submit);
  const loggedUser = useSelector(loggedInUser);

  const handleRedirect = (route) => {
    navigate(route);
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
      if (!email || !password) {
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
        const userData = {
          email: email,
          password: password,
        };

        dispatch(loginUserAsync({ userInfo: userData }));
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (loggedUser?._id) {
    localStorage.setItem("token", loggedUser.token);
    localStorage.setItem("userId", loggedUser._id);

    navigate("/");
  }

  useEffect(() => {
    if (loggedUser?._id) {
      localStorage.setItem("token", loggedUser.token);
      localStorage.setItem("userId", loggedUser._id);
      navigate("/");
    }
    if (error) {
      setLoading(false);
      toast.error("User not found, please try again !", {
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
    setLoading(false);
  }, [loggedUser, submitPeoccess]);

  useEffect(() => {
    dispatch(setLoginError());
  }, []);

  return (
    <section className="login-wrapper">
      <ToastContainer />
      <div className="login-main-header">
        <Header />
      </div>
      <form onSubmit={(e) => handleSubmit(e)} className="login-container">
        <div className="login-header">
          <h2>Login</h2>
          <span className="header-text">Make your dream come true today !</span>
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
        <div onFocus={() => handleOnChange("1")} className="login-input">
          <span
            className={`${
              move1 || password ? "input-box-move-password " : "input-box"
            }`}
          >
            Password
          </span>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder=""
            type={hideShow ? "text" : "password"}
          />
          <span onClick={() => setHideShow(!hideShow)} className="hide-show">
            {hideShow ? "Hide" : "Show"}
          </span>
        </div>

        <div className="forgot-password">
          <span onClick={() => handleRedirect("/Forgot/password")} className="">
            Forgot Password ?
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
              "Login"
            )}
          </button>
          <div className="or-line-box">
            <span className="line"></span>
            <span className="or">or</span>
          </div>

          <div className="singup-link">
            <span className="">New to Homyz? </span>
            <Link to="/SignUp">
              <span className="new-here">
                Join now <GoArrowRight />{" "}
              </span>
            </Link>
          </div>
        </div>
      </form>
    </section>
  );
};

export default Login;
