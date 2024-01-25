import React from "react";
import { MantineProvider, Menu, Avatar } from "@mantine/core";
import { FaArrowRightLong } from "react-icons/fa6";
import { GoArrowRight } from "react-icons/go";
import { FaRegUser } from "react-icons/fa6";
import { SiMaildotru } from "react-icons/si";
import { MdFavoriteBorder } from "react-icons/md";
import { FaRegBookmark } from "react-icons/fa6";

import { IoMdClose } from "react-icons/io";
import "./ProfileMenu.css";
import { Link, useNavigate } from "react-router-dom";
import { LiaCrownSolid } from "react-icons/lia";
import { IoCreateOutline } from "react-icons/io5";
const ProfileMenu = ({ loggedInUser, dropdown, setDropdown, handleLogOut }) => {
  const navigate = useNavigate();

  const handleRedirect = (route) => {
    navigate(route);
  };
  return (
    <section className="menuprofile-wrapper">
      <div
        className={` ${dropdown ? " dropdown-user" : "menuprofile-section"}`}
      >
        <div className="menuprofile-detail main">
          <img src={loggedInUser?.image} alt="user-img" />
          <div>
            <h2 style={{ color: "#1f3e72", marginBottom: "-0.2rem" }}>
              {loggedInUser?.name}
            </h2>
            <span style={{ color: "rgb(140 139 139)", marginTop: "-0.2rem" }}>
              Joined In Year : {loggedInUser?.registerDate}
            </span>
          </div>

          <span
            onClick={() => setDropdown(!dropdown)}
            className="user-close-icon"
          >
            <IoMdClose />
          </span>
        </div>
        <div
          onClick={() => handleRedirect(`/profile/${loggedInUser._id}`)}
          className="menuprofile-info"
        >
          <span className="user-icon">
            <FaRegUser />
          </span>

          <span className="user-name">Profile</span>

          <span className="user-r-icon">
            <GoArrowRight />
          </span>
        </div>
        <div
          onClick={() => handleRedirect("/Favourite")}
          className="menuprofile-info"
        >
          <MdFavoriteBorder size={20} />

          <span className="user-fav">Favourites</span>

          <span className="user-r-icon">
            <GoArrowRight />
          </span>
        </div>
        <div
          onClick={() => handleRedirect("/Booking")}
          className="menuprofile-info"
        >
          <FaRegBookmark />

          <span className="user-booking">Bookings</span>
          <span className="user-r-icon">
            <GoArrowRight />
          </span>
        </div>
        <div
          onClick={() => handleRedirect("/Create/Property")}
          className="menuprofile-info"
        >
          <IoCreateOutline size={20} />
          <span className="user-profile"> Create</span>
          <span className="user-r-icon">
            <GoArrowRight />
          </span>
        </div>

        <div
          onClick={() => handleRedirect("/Owned/Property")}
          className="menuprofile-info"
        >
          <LiaCrownSolid size={20} />
          <span className="user-profile"> Owned</span>
          <span className="user-r-icon">
            <GoArrowRight />
          </span>
        </div>
        <button onClick={() => handleLogOut()} className="sm-logout-button">
          Log out <GoArrowRight></GoArrowRight>
        </button>
      </div>
    </section>
  );
};

export default ProfileMenu;
