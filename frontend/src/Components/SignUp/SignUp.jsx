import React, { useEffect, useState } from "react";
import "./SignUp.css";
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

const SignUp = () => {
  const [move, setMove] = useState(false);
  const [move1, setMove1] = useState(false);
  const [move2, setMove2] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hideShow, setHideShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispath = useDispatch();
  const navigate = useNavigate();
  const error = useSelector(registerError);
  const submitProccess = useSelector(submit);
  const loggedInuser = useSelector(userData);

  const handleRedirect = (route) => {
    navigate(route);
  };
  const handleOnChange = (val) => {
    if (val === "1") {
      setMove1(!move1);
      setMove2(false);
      setMove(false);
    } else if (val === "2") {
      setMove2(!move2);
      setMove1(false);
      setMove(false);
    } else {
      setMove(!move);
      setMove2(false);
      setMove1(false);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!name || !email || !password) {
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
        e.preventDefault();
        const userData = {
          name: name,
          email: email,
          password: password,
        };
        dispath(registerUserAsync({ userInfo: userData }));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (loggedInuser?._id) {
      navigate("/login");
    }
    if (error) {
      setLoading(false);
      toast.error("User already registered, please logIn !", {
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
  }, [loggedInuser, submitProccess]);

  useEffect(() => {
    setRegisterError();
  }, []);
  return (
    <section className="signup-wrapper">
      <ToastContainer />
      <div className="signup-main-header">
        <Header />
      </div>
      <form onSubmit={(e) => handleSubmit(e)} className="signup-container">
        <div className="signup-header">
          <h2>Sign in</h2>
          <span className="header-text">Make your dream come true today !</span>
        </div>
        <div onFocus={() => handleOnChange("2")} className="signup-input">
          <span
            className={`${
              move2 || name ? "input-box-move-name " : "input-box"
            }`}
          >
            Name
          </span>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder=""
            type="text"
          />
        </div>
        <div onFocus={() => handleOnChange("0")} className="signup-input">
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
        <div onFocus={() => handleOnChange("1")} className="signup-input">
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
              "Sign Up"
            )}
          </button>
          <div className="or-line-box">
            <span className="line"></span>
            <span className="or">or</span>
          </div>

          <div className="singup-link">
            <span className="">Already have a account? </span>
            <Link to="/login">
              {" "}
              <span className="new-here">
                Log in now <GoArrowRight />{" "}
              </span>
            </Link>
          </div>
        </div>
      </form>
    </section>
  );
};

export default SignUp;
