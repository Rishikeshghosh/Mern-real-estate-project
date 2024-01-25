import React from "react";
import { useSelector } from "react-redux";
import { userData } from "../../../features/Authentication/registerUserSlice";
import { BsCheckCircle } from "react-icons/bs";
import Header from "../../Header/Header";
import "./Successfull.css";
import { Link, useNavigate, useParams } from "react-router-dom";
const Successfull = () => {
  const { bookId } = useParams();
  const navigate = useNavigate();
  const user = useSelector(userData);

  if (!bookId) {
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
            <span className="bold-text">Your Residancy Is Booked !</span>
            <span className="normal-text">
              We'll send you the booking confirmation email <br /> as soon as
              possible !
            </span>
          </div>
          <div className="success-box">
            <Link to="/Booking">
              <div className="order-btn">
                <button>CHECK STATUS</button>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Successfull;
