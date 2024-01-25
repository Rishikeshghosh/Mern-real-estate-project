import React from "react";
import FavouriteCard from "../Pages/FavouriteCard/Favourite";
import { useSelector } from "react-redux";
import { fav } from "../../features/UserFav/UserFavSlice";
import { MdOutlineShoppingCart } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa6";
import EmptyFav from "../Pages/EmptyFavourite/EmptyFav";
import "./Favourite.css";
import Header from "../Header/Header";
import { toggleValue } from "../ToggleMode/ToggleSlice";
const Favourite = () => {
  const favourites = useSelector(fav);
  const toggle = useSelector(toggleValue);
  return (
    <section className="main-fav-wraper">
      <Header />
      <div
        className={`${
          toggle ? "main-fav-container blur " : "main-fav-container"
        }`}
      >
        <h2 className="main-title">
          <FaRegHeart /> Favourite{" "}
        </h2>
        {favourites.length > 0 ? (
          favourites.map(
            ({ title, price, city, country, image, name, userEmail, _id }) => {
              return (
                <div className="main-fav-box">
                  <FavouriteCard
                    title={title}
                    price={price}
                    city={city}
                    country={country}
                    image={image}
                    name={name}
                    email={userEmail}
                    id={_id}
                  />
                </div>
              );
            }
          )
        ) : (
          <div className="empty-fav">
            <EmptyFav />
          </div>
        )}
      </div>
    </section>
  );
};

export default Favourite;
