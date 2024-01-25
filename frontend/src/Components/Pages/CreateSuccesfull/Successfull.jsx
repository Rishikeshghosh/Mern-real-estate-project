import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { userData } from "../../../features/Authentication/registerUserSlice";
import { BsCheckCircle } from "react-icons/bs";
import Header from "../../Header/Header";
import "./Successfull.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  clearUpdate,
  getUserAllCreatedPropertiesAsync,
} from "../../../features/Properties/PropertiesSlice";
const Successfull = () => {
  const { resId } = useParams();
  const navigate = useNavigate();
  const user = useSelector(userData);
  const dispath = useDispatch();

  const redirect = (route) => {
    dispath(clearUpdate());
    dispath(getUserAllCreatedPropertiesAsync());
    navigate(route);
  };

  if (!resId) {
    navigate("/");
  }

  return (
    <>
      <Header />
      <section className="order-success-wrapper">
        <div className="order-success-container">
          <div className="success-box-a">
            <span className="succ-icon">
              <BsCheckCircle size={55} color="rgb(210, 22, 94)" />
            </span>
            <span className="user-name">Hey, {user.name}</span>
          </div>
          <div className="success-box con">
            <span className="bold-text">
              Your Property Is Created Succesfully !
            </span>
            <span className="id-text">
              Your property id : <span>{resId} </span>
            </span>
            <span className="normal-text">
              We'll send you the created property's confirmation email <br /> as
              soon as possible !
            </span>
          </div>
          <div className="success-box">
            <div
              onClick={() => redirect("/Owned/Property")}
              className="order-btn"
            >
              <button>CHECK PROPERTY</button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Successfull;
