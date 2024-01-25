import React, { useEffect } from "react";
import OwnedPropertyCard from "../OwnedPropertyCard/OwnedProperty";
import { useDispatch, useSelector } from "react-redux";
import { fav } from "../../features/UserFav/UserFavSlice";
import { MdOutlineShoppingCart } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa6";
import "./OwnedProperty.css";
import Header from "../Header/Header";
import {
  clearUpdate,
  createUpdate,
  created,
  getUserAllCreatedPropertiesAsync,
  reSetUpdateSuccProp,
  userAllProperties,
} from "../../features/Properties/PropertiesSlice";
import { LiaCrownSolid } from "react-icons/lia";
import EmptyOwned from "../Pages/EmptyOwnedProperty/EmptyOwned";
const OwnedProperty = () => {
  const userOwnedProps = useSelector(userAllProperties);
  const update = useSelector(createUpdate);

  const dispath = useDispatch();

  useEffect(() => {
    dispath(getUserAllCreatedPropertiesAsync());

    //dispath(clearUpdate());
  }, [update]);

  return (
    <section className="main-fav-wraper">
      <Header />
      <div className="main-fav-container">
        <h2 className="main-title">
          <LiaCrownSolid size={40} /> Owned Property{" "}
        </h2>
        {userOwnedProps.length > 0 ? (
          userOwnedProps.map(
            ({
              title,
              price,
              city,
              country,
              image,
              name,
              userEmail,
              userPhone,
              facilites,
              address,

              _id,
            }) => {
              return (
                <div className="main-fav-box">
                  <OwnedPropertyCard
                    title={title}
                    city={city}
                    country={country}
                    image={image}
                    name={name}
                    address={address}
                    facilites={facilites}
                    price={price}
                    phone={userPhone}
                    email={userEmail}
                    id={_id}
                  />
                </div>
              );
            }
          )
        ) : (
          <div className="owned-empty">
            <EmptyOwned />
          </div>
        )}
      </div>
    </section>
  );
};

export default OwnedProperty;
