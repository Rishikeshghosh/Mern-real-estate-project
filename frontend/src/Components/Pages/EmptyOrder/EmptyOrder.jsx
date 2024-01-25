import React from "react";
import "./EmptyOrder.css";
import { IoArrowForward } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
const EmptyOrder = () => {
  const navigate = useNavigate();
  const handleNavigate = (route) => {
    navigate(route);
  };
  return (
    <section className="empty-cart-wrapper">
      <div className="empty-cart-container">
        <div className="img">
          <img
            src="https://cdn4.iconfinder.com/data/icons/shopping-460/200/empty-cart-512.png"
            alt=""
          />
        </div>
        <div className="empty-cart-info">
          <h2>
            Your Booking is <span className="red">Empty</span>
          </h2>
          <span>Must Book a residancy before you procced futher ! </span>
          <button onClick={() => handleNavigate("/Properties")}>
            Go to Properties <IoArrowForward />
          </button>
        </div>
      </div>
    </section>
  );
};

export default EmptyOrder;
