import React, { useState } from "react";
import "./BookingCard.css";
import { FaHome } from "react-icons/fa";
import { FaCar } from "react-icons/fa";
import { FaBath } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { MdLocalPolice } from "react-icons/md";

import { FaCalendarDays } from "react-icons/fa6";
import { MdArrowForwardIos } from "react-icons/md";
import MoreDetails from "../MoreDetails/MoreDetails";
import { ConfirmDialogg } from "primereact/confirmdialog";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { Dialog } from "primereact/dialog";
import "primereact/resources/themes/lara-light-indigo/theme.css"; //theme
import "primereact/resources/primereact.min.css"; //core css
import "primeicons/primeicons.css";
import { TbInfoTriangleFilled } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { userData } from "../../features/Authentication/registerUserSlice";
import { cancelUserSingleBookingsAsync } from "../../features/UserBooking/UserBookingSlice";

const Booking = ({ residancy, bookingDate, duration, email, from, phone }) => {
  const [toogle, setToogle] = useState(false);
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector(userData);
  const handleCancelBooking = (data) => {
    if (data.val === "no") {
      setVisible(false);
    } else {
      dispatch(
        cancelUserSingleBookingsAsync({ id: data.resId, userId: user._id })
      );
    }
  };
  return (
    <section className="user-booking-wrapper">
      <div className="main-dailog">
        <Dialog
          visible={visible}
          onHide={() => setVisible(false)}
          draggable={false}
        >
          <div className="dailog-container">
            <h2></h2>
            <div className="dailog-box">
              <TbInfoTriangleFilled size={50} color="#06b6d4" />
              <span>
                Are you sure {user?.name?.split(" ")[0]} ! <br /> you want to
                cancel <br /> the order ?
              </span>
            </div>
            <div className="dailog-box-btn">
              <button
                onClick={() =>
                  handleCancelBooking({ val: "no", resId: residancy._id })
                }
                className="btn red"
              >
                No
              </button>
              <button
                onClick={() =>
                  handleCancelBooking({ val: "yes", resId: residancy._id })
                }
                className="btn blue"
              >
                Yes
              </button>
            </div>
          </div>
        </Dialog>
      </div>
      <div className="user-booking-container">
        <div className="user-booking-left">
          <img src={residancy.image} alt="img" />
        </div>
        <div className="user-booking-right">
          <div className="user-booking-verified">
            <span className="text">Verified by the homeyz team</span>
            <span className="book-date">
              Booking date : {" " + bookingDate}
            </span>
          </div>
          <div className="title">
            <span>{residancy.title}</span>
          </div>
          <div className="address">
            <span>
              <FaLocationDot />{" "}
              {residancy.address +
                ", " +
                residancy.city +
                ", " +
                residancy.country}
            </span>
          </div>
          <div
            className={`${
              !toogle ? "more-detail-none" : "more-detail-display"
            } `}
          >
            <MoreDetails
              email={residancy.userEmail}
              duration={duration}
              phone={residancy.phone}
              toogle={toogle}
              from={from}
              setToogle={setToogle}
              resId={residancy._id}
            />
          </div>
          <span onClick={() => setToogle(true)} className="get-more-info">
            Get more details <MdArrowForwardIos />{" "}
          </span>

          <div className="facility">
            <span className="description">
              <FaHome /> Home : 1
            </span>
            <span className="description">
              <FaBath /> Bathroom : 2
            </span>
            <span className="description">
              <FaCar />
              Perking : 2
            </span>
            <span className="description">
              <MdLocalPolice /> Security : 8/10
            </span>
          </div>
          <span className="var-line"></span>
          <div className="price">
            <span>Price included tex :</span>
            <span>$ 2000</span>
          </div>
          <div className="cncl-btn">
            <button onClick={() => setVisible(true)}>Cancel Order</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Booking;
