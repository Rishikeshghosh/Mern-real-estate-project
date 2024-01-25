import React, { useEffect, useState } from "react";
import logo from "../../Assets/logo.png";
import "./Header.css";
import { BiMenuAltRight } from "react-icons/bi";
import { useDispatch, useSelector, useStore } from "react-redux";
import { toggleValue } from "../ToggleMode/ToggleSlice";
import { setToggleMode } from "../ToggleMode/ToggleSlice";
import { Link, NavLink, useNavigate } from "react-router-dom";
import ProfileMenu from "../ProfileMenu/ProfileMenu";
import { GoArrowRight } from "react-icons/go";
import { IoIosArrowForward } from "react-icons/io";
import { FaRegUser } from "react-icons/fa6";
import { MdFavoriteBorder } from "react-icons/md";
import { FaRegBookmark } from "react-icons/fa6";
import { LiaCrownSolid } from "react-icons/lia";
import { BsHouseHeart } from "react-icons/bs";
import { IoCreateOutline } from "react-icons/io5";
import {
  logOutUser,
  userData,
} from "../../features/Authentication/registerUserSlice";

const Header = () => {
  const user = useSelector(userData);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [dropdown, setDropdown] = useState(false);

  const handleRedirect = (route) => {
    handleSetBlurAndToggle({ val: false });
    navigate(route);
  };

  window.addEventListener("scroll", function () {
    const header = this.document.querySelector(".h-wrapper");
    if (this.scrollY >= 150) header.classList.add("cngClr");
    else header.classList.remove("cngClr");
  });

  const dispath = useDispatch();
  const [toggleNav, setToogleNav] = useState(false);
  const toggleState = useSelector(toggleValue);

  const handleSetBlurAndToggle = (param) => {
    if (param.val === "toggle") {
      let currState = toggleState ? false : true;
      setToogleNav(!toggleNav);
      dispath(setToggleMode({ val: currState }));
    } else {
      setToogleNav(!toggleNav);
      dispath(setToggleMode({ val: param.val }));
    }
  };

  const handleLogin = () => {
    handleSetBlurAndToggle({ val: false });
    navigate("/Login");
  };

  const handleLogOut = () => {
    handleSetBlurAndToggle({ val: false });
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    dispatch(logOutUser());
    navigate("/");
  };

  return (
    <section className="h-wrapper">
      <div className={`${toggleState ? "h-container blur " : "h-container"}`}>
        <Link to="/">
          <img src={logo} alt="logo" width="100px"></img>
        </Link>

        <div className="h-menu">
          <NavLink to="/properties">Properties</NavLink>

          {!user ? (
            <Link to="/Login">
              <button className="button">Log in</button>
            </Link>
          ) : (
            <div className="drop-d-img">
              <img
                className="drop-img"
                onClick={() => setDropdown(!dropdown)}
                src={user?.image}
              />
            </div>
          )}
          {user ? (
            <ProfileMenu
              loggedInUser={user}
              dropdown={dropdown}
              setDropdown={setDropdown}
              handleLogOut={handleLogOut}
            />
          ) : null}
        </div>
      </div>

      <div
        onClick={() => handleSetBlurAndToggle({ val: "toggle" })}
        className="menu-icon"
      >
        {!user ? (
          <div onClick={() => setDropdown(!dropdown)}>
            <BiMenuAltRight size={30} />
          </div>
        ) : (
          <div className="drop-d-sm-img">
            <img
              className="drop-sm-img"
              onClick={() => setDropdown(!dropdown)}
              src={user?.image}
            />
          </div>
        )}
      </div>

      <div className={`${toggleNav ? "h-menu-sm-display " : "h-menu-sm-none"}`}>
        {user ? (
          <div className="main-user-container">
            <div
              onClick={() => handleRedirect(`/profile/${user?._id}`)}
              className="user-heading-info"
            >
              {/*  <span
                onClick={() => handleSetBlurAndToggle()}
                className="user-close-icon"
              >
                <IoMdClose />
              </span> */}

              <img src={user?.image} alt="user-img" />
              <span className="user-name">{user?.name}</span>
            </div>

            <div
              onClick={() => handleRedirect(`/profile/${user?._id}`)}
              className="menuprofile-info"
            >
              <span
                onClick={() => handleRedirect(`/profile/${user?._id}`)}
                className="user-icon"
              >
                <FaRegUser size={18} />
              </span>

              <span
                onClick={() => handleSetBlurAndToggle({ val: false })}
                className="user-name"
              >
                Profile
              </span>

              <span className="user-r-icon">
                <IoIosArrowForward />
              </span>
            </div>

            <div
              onClick={() => handleRedirect("/Favourite")}
              className="menuprofile-info"
            >
              <span className="user-icon">
                {" "}
                <MdFavoriteBorder size={19} />
              </span>

              <span
                onClick={() => handleSetBlurAndToggle({ val: false })}
                className="user-fav"
              >
                Favourites
              </span>
              <span className="user-r-icon">
                <IoIosArrowForward />
              </span>
            </div>

            <div
              onClick={() => handleRedirect("/Booking")}
              className="menuprofile-info"
            >
              <div className="user-icon">
                {" "}
                <FaRegBookmark />
              </div>

              <span
                onClick={() => handleSetBlurAndToggle({ val: false })}
                className="user-booking"
              >
                Bookings
              </span>
              <span className="user-r-icon">
                <IoIosArrowForward />
              </span>
            </div>

            <div
              onClick={() => handleRedirect("/Create/Property")}
              className="menuprofile-info"
            >
              <span className="user-icon">
                <IoCreateOutline size={20} />
              </span>

              <span
                onClick={() => handleSetBlurAndToggle({ val: false })}
                className="user-profile"
              >
                {" "}
                Create{" "}
              </span>
              <span className="user-r-icon">
                <IoIosArrowForward />
              </span>
            </div>
            <div
              onClick={() => handleRedirect("/Properties")}
              className="menuprofile-info"
            >
              <span className="user-icon">
                <BsHouseHeart size={19} />
              </span>

              <span
                onClick={() => handleSetBlurAndToggle({ val: false })}
                className="user-profile"
              >
                Properties
              </span>
              <span className="user-r-icon">
                <IoIosArrowForward />
              </span>
            </div>
            <div
              onClick={() => handleRedirect("/Owned/Property")}
              className="menuprofile-info"
            >
              <span className="user-icon">
                <LiaCrownSolid size={19} />
              </span>

              <span
                onClick={() => handleSetBlurAndToggle({ val: false })}
                className="user-profile"
              >
                Owned
              </span>
              <span className="user-r-icon">
                <IoIosArrowForward />
              </span>
            </div>
            <button onClick={() => handleLogOut()} className="sm-logout-button">
              Log out <GoArrowRight></GoArrowRight>
            </button>
          </div>
        ) : (
          <div className="logout-user">
            <button
              onClick={() => handleRedirect("/Properties")}
              className="sm-logout-button"
            >
              Properties <GoArrowRight></GoArrowRight>
            </button>

            <button onClick={() => handleLogin()} className="sm-logout-button">
              Log In <GoArrowRight></GoArrowRight>
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Header;
