import React from "react";
import "./ResidancyCard.css";
import { AiFillHeart } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userData } from "../../features/Authentication/registerUserSlice";
import { removeorAddFavAsync } from "../../features/UserFav/UserFavSlice";
import { FaRegHeart } from "react-icons/fa";
const ResidancyCard = ({ item }) => {
  const user = useSelector(userData);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleNavigateToProperty = () => {
    navigate(`/Properties/${item._id}`);
  };
  /*   const addUserFav = (resId) => {
    dispatch(removeorAddFavAsync({ id: resId, email: user.email }));
  }; */
  return (
    <>
      <div onClick={() => handleNavigateToProperty()} className="r-card">
        {user?.favResidancy?.includes(item._id) ? (
          <AiFillHeart size={30} color="red" />
        ) : (
          <FaRegHeart size={30} color="white" />
        )}
        <img src={item.image} alt="home" />

        <span children="secondaryText r-price">
          <span style={{ color: "orange" }}>$</span>
          <span>{item.price}</span>
        </span>

        <span className="primaryText">{item.title}</span>
        <span className="secondaryText">{item.address}</span>
      </div>
    </>
  );
};

export default ResidancyCard;
