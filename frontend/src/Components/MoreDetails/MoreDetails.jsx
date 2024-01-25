import React, { useState } from "react";
import "./MoreDetails.css";
import { IoMdClose } from "react-icons/io";
import { IoMdArrowDropright } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
const MoreDetails = ({
  toogle,
  setToogle,
  from,
  email,
  phone,
  duration,
  resId,
}) => {
  const navigate = useNavigate();
  const redirectToResideny = (resId) => {
    navigate(`/Properties/${resId}`);
  };
  return (
    <section className="more-deatils-wrapper">
      <div className="more-details-container">
        <div className="deatils-box">
          <div onClick={() => setToogle(false)} className="close">
            <IoMdClose size={25} />
          </div>
          <div className="booking-container">
            <div className="side-name">
              <span className="name">
                From <IoIosArrowForward size={18} />
              </span>
              <span className="detail">{from}</span>
            </div>
            <div className="side-name">
              <span className="name">
                Duration <IoIosArrowForward size={18} />
              </span>
              <span className="detail"> {duration + " "} days</span>
            </div>
          </div>
          <div className="box">
            <span className="name">
              Owner Email <IoIosArrowForward size={18} />
            </span>
            <span className="detail">{email}</span>
          </div>
          <div className="box">
            <span className="name">
              Owner Phone <IoIosArrowForward size={18} />
            </span>
            <span className="detail">{phone ? phone : "Undifined"}</span>
          </div>
          <div className="btn">
            <button onClick={() => redirectToResideny(resId)}>
              Go to residancy
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MoreDetails;
