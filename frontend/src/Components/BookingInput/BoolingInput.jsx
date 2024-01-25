import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./BookingInput.css";
import { RotatingLines } from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  booking,
  setBookingAsync,
} from "../../features/UserBooking/UserBookingSlice";
import { userData } from "../../features/Authentication/registerUserSlice";
import { update } from "../../features/UserBooking/UserBookingSlice";
import { useNavigate } from "react-router-dom";
const Calender = ({ resId, showInput, setShowInput }) => {
  const [value, setValue] = useState(new Date());
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [duration, setDuration] = useState("");
  const [from, setFrom] = useState("");
  const [loader, setLoader] = useState(false);
  const [valid, setValid] = useState(false);
  const dispatch = useDispatch();
  const response = useSelector(update);
  const userBoookedResidancy = useSelector(userData);
  const navigate = useNavigate();
  const navigateToSuccessBookedPage = (resId) => {
    navigate(`/booked/successfull/${resId}`);
    setValid(false);
  };

  const onChange = (val) => {
    let date = val + "";
    let day = date.split(" ")[0];
    let month = date.split(" ")[1];
    let Cdate = date.split(" ")[2];
    let year = date.split(" ")[3];
    setFrom(Cdate + " " + day + " " + month + " " + year);
    setValue(val);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let valid = userBoookedResidancy.bookedVisits?.filter(
      ({ residancy }) => residancy._id === resId
    );
    console.log(valid);

    if (valid[0]?.resId) {
      toast.error("This residacy is already booked by you !", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      setShowInput(false);
    } else {
      const validateMonth = {
        Jan: 1,
        Fev: 2,
        Mar: 3,
        Apr: 4,
        May: 5,
        Jun: 6,
        Jul: 7,
        Aug: 8,
        Sep: 9,
        Oct: 10,
        Nov: 11,
        Dec: 12,
      };

      let date = new Date();
      const validateChosenYear = date.getFullYear();
      const validateChosenMonth = date.getMonth() + 1;
      const validateChosenDate = date.getDate();
      const chosenDate = from.split(" ")[0];
      const chosenMonth = validateMonth[from?.split(" ")[2]?.toString()];
      const chosenYear = from.split(" ")[3];

      if (
        parseInt(chosenYear) < parseInt(validateChosenYear) ||
        (parseInt(chosenDate) < parseInt(validateChosenDate) &&
          parseInt(chosenMonth) === parseInt(validateChosenMonth) &&
          parseInt(chosenYear) === parseInt(validateChosenYear)) ||
        (parseInt(chosenYear) === parseInt(validateChosenYear) &&
          parseInt(chosenMonth) < parseInt(validateChosenMonth)) ||
        (parseInt(chosenYear) === parseInt(validateChosenYear) &&
          parseInt(chosenMonth) === parseInt(validateChosenMonth) &&
          parseInt(chosenDate) < parseInt(validateChosenDate)) ||
        (parseInt(chosenYear) === parseInt(validateChosenYear) &&
          parseInt(chosenDate) === parseInt(validateChosenDate) &&
          parseInt(chosenMonth) < parseInt(validateChosenMonth))
      ) {
        toast.warn("Chosen date is not vaild try again !", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      } else if (!email || !phone || !duration) {
        toast.warn("All feilds must be filled try again !", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      } else {
        setLoader(true);
        const bookingData = {
          from: from,
          duration: duration,
          email: email,
          phone: phone,
          id: resId,
        };
        dispatch(setBookingAsync(bookingData));
        setValid(true);
      }
    }
  };

  useEffect(() => {
    setLoader(false);
    setShowInput(false);
    if (valid) {
      navigateToSuccessBookedPage(resId);
    }
  }, [response]);

  return (
    <section className="booking-input-wrapper">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <div className="booking-input-container">
        <div className="booking-input-calender">
          <Calendar hebrew={true} onChange={onChange} value={value} />
          <span className="date">From : {from}</span>
        </div>

        <div className="form">
          <form
            onSubmit={(e) => handleSubmit(e)}
            className="booking-input-form"
          >
            <div className="input-box">
              <label>Email</label>
              <input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                placeholder="Email"
                className="input"
              />
            </div>
            <div className="input-box">
              <label>Phone</label>
              <input
                onChange={(e) => setPhone(e.target.value)}
                value={phone}
                type="number"
                placeholder="phone"
                className="input"
              />
            </div>
            <div className="input-box">
              <label>Days</label>
              <input
                onChange={(e) => setDuration(e.target.value)}
                value={duration}
                type="number"
                placeholder="duration"
                className="input"
              />
            </div>
            <button className="sub-btn">
              {loader ? (
                <RotatingLines
                  strokeColor="white"
                  strokeWidth="5"
                  animationDuration="0.75"
                  width="30"
                  visible={true}
                />
              ) : (
                "Submit"
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Calender;
