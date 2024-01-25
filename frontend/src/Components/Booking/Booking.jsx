import React from "react";
import "./Booking.css";
import { useSelector } from "react-redux";
import { booking } from "../../features/UserBooking/UserBookingSlice";
import BookingCard from "../BookingCard/BookingCard";
import Header from "../Header/Header";
import { IoMdGift } from "react-icons/io";
import EmptyOrder from "../Pages/EmptyOrder/EmptyOrder";
import { toggleValue } from "../ToggleMode/ToggleSlice";
const Booking = () => {
  const userBookings = useSelector(booking);
  const toggle = useSelector(toggleValue);

  return (
    <section className="main-booking-wrapper">
      <Header />
      <div className="user-booking-haeder">
        <h2 className="icon-booking">
          <IoMdGift /> My Booking
        </h2>
      </div>
      <div
        className={`${
          toggle ? "main-booking-container blur" : "main-booking-container"
        }`}
      >
        {userBookings.length > 0 ? (
          userBookings.map(
            ({ residancy, bookingDate, duration, email, from, phone }) => {
              return (
                <div key={residancy._id} className="main-booking-box">
                  <BookingCard
                    residancy={residancy}
                    duration={duration}
                    email={email}
                    bookingDate={bookingDate}
                    from={from}
                    phone={phone}
                  />
                </div>
              );
            }
          )
        ) : (
          <div className="empty-order">
            <EmptyOrder />{" "}
          </div>
        )}
      </div>
    </section>
  );
};

export default Booking;
