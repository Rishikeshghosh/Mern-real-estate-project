import React, { useState } from "react";
import "./Favourite.css";
import {
  IoArrowBack,
  IoArrowRedoCircle,
  IoLocationOutline,
  IoMail,
  IoStar,
} from "react-icons/io5";
import { ConfirmDialogg } from "primereact/confirmdialog";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { Dialog } from "primereact/dialog";
import "primereact/resources/themes/lara-light-indigo/theme.css"; //theme
import "primereact/resources/primereact.min.css"; //core css
import "primeicons/primeicons.css";
import { IoCallOutline } from "react-icons/io5";
import { FiFlag } from "react-icons/fi";
import { FaRegUser } from "react-icons/fa6";
import { LuEye } from "react-icons/lu";
import { MdMailOutline } from "react-icons/md";
import { IoIosArrowForward } from "react-icons/io";
import { MdOutlineVerified } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {
  reRander,
  removeorAddFavAsync,
} from "../../../features/UserFav/UserFavSlice";
import { userData } from "../../../features/Authentication/registerUserSlice";
import { useNavigate } from "react-router-dom";
import { setToggleMode } from "../../ToggleMode/ToggleSlice";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { TbInfoTriangleFilled } from "react-icons/tb";

const Favourite = ({ title, price, city, country, image, name, email, id }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [remove, setRemove] = useState({ val: "no" });
  const user = useSelector(userData);
  const handleRemoveFav = (data) => {
    setVisible(!visible);
    if (data.val === "yes") {
      dispatch(removeorAddFavAsync({ id: data.resId, email: user.email }));
    } else {
      return;
    }
  };

  const handleNavigateToDetailPage = (resId) => {
    dispatch(setToggleMode({ val: false }));
    navigate(`/Properties/${resId}`);
  };
  return (
    <section className="user-fav-wrapper">
      <div className="main-dailog">
        <Dialog
          visible={visible}
          onHide={() => setVisible(false)}
          draggable={false}
        >
          <div className="dailog-container">
            <h2>{title}</h2>
            <div className="dailog-box">
              <TbInfoTriangleFilled size={50} color="#06b6d4" />
              <span>
                Are you sure {user?.name?.split(" ")[0]} ! <br /> you want to
                remove it <br /> from the cart ?
              </span>
            </div>
            <div className="dailog-box-btn">
              <button
                onClick={() => handleRemoveFav({ val: "no", resId: id })}
                className="btn red"
              >
                No
              </button>
              <button
                onClick={() => handleRemoveFav({ val: "yes", resId: id })}
                className="btn blue"
              >
                Yes
              </button>
            </div>
          </div>
        </Dialog>
      </div>
      <div className="user-container">
        <div className="user-fav-left">
          <div className="user-fav-img">
            <img src={image} alt="" />
          </div>
        </div>

        <div className="user-fav-right">
          <div className="user-fav-flex">
            <span className="title">{title}</span>
            <span className="price">$ {price}</span>
          </div>
          <div className="user-fav-grid">
            <div className="user-fav-grid-value">
              <IoLocationOutline /> {country}
            </div>
            <div className="user-fav-grid-value">
              <IoCallOutline /> 88898988
            </div>
            <div className="user-fav-grid-value">
              <MdMailOutline /> {email}
            </div>
            <div className="user-fav-grid-value">
              <FaRegUser />
              User
            </div>
            <div className="user-fav-grid-value">
              <FiFlag /> 2021.11
            </div>
            <div className="user-fav-grid-value">
              <MdOutlineVerified />
              Verified
            </div>
          </div>
          <div className="user-fav-down-flex">
            <span
              onClick={() => handleNavigateToDetailPage(id)}
              className="detail"
            >
              Deatils <IoIosArrowForward />
            </span>
            <span onClick={() => handleRemoveFav(id)} className="remove">
              Remove <IoIosArrowForward />
            </span>

            <span className="all-icons">
              <LuEye />
              19
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Favourite;
