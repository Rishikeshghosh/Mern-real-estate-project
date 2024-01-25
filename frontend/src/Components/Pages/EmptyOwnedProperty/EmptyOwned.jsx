import React from "react";
import "./EmptyOwned.css";
import { IoArrowForward } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
const EmptyOwned = () => {
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
            You Havn't Created <span className="red">One</span>
          </h2>
          <span>Must create a proprty before you procced futher ! </span>
          <button onClick={() => handleNavigate("/Create/Property")}>
            Create Property <IoArrowForward />
          </button>
        </div>
      </div>
    </section>
  );
};

export default EmptyOwned;
