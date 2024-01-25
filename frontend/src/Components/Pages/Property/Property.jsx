import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../../Header/Header";
import { useDispatch, useSelector } from "react-redux";
import {
  getSinglePropertyAsync,
  singleProperty,
} from "../../../features/Properties/PropertiesSlice";
import "./Property.css";
import { AiFillHeart } from "react-icons/ai";
import { HiLocationMarker } from "react-icons/hi";
import Map from "../Map/Map";
import {
  getTheUserAsync,
  userData,
} from "../../../features/Authentication/registerUserSlice";
import { removeorAddFavAsync } from "../../../features/UserFav/UserFavSlice";
import { FaRegHeart } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import BookInput from "../../BookingInput/BoolingInput";

const Property = () => {
  const [showInput, setShowInput] = useState(false);
  const user = useSelector(userData);
  const clickedProperty = useSelector(singleProperty);
  const { propertyId } = useParams();
  const dispath = useDispatch();

  const fetchSingleProperty = async () => {
    dispath(getSinglePropertyAsync(propertyId));
  };

  const handleBook = (userId) => {
    if (!userId) {
      toast.info("User must be logged in !", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else {
      setShowInput(true);
    }
  };

  const addUserFav = (resId) => {
    if (user?._id) {
      if (user.favResidancy.includes(resId)) {
        toast.info("Removed like!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      } else {
        toast.info("Added like !", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }

      dispath(removeorAddFavAsync({ id: resId, email: user.email }));
    } else {
      toast.info("User must be logged in !", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  useEffect(() => {
    fetchSingleProperty(propertyId);
  }, []);

  return (
    <>
      <Header />
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
      <div
        className={`${
          !showInput ? "input-section-none" : "input-section-display"
        }`}
      >
        <BookInput
          resId={propertyId}
          showInput={showInput}
          setShowInput={setShowInput}
        />
      </div>

      <section className="single-property-wrapper">
        <div className="single-property-container">
          <div className="single-property-image">
            {user?.favResidancy?.includes(propertyId) ? (
              <AiFillHeart
                onClick={() => addUserFav(propertyId)}
                className="like"
                color="red"
                size={55}
              />
            ) : (
              <FaRegHeart
                onClick={() => addUserFav(propertyId)}
                className="like"
                color="white"
                size={50}
              />
            )}
            <img src={clickedProperty?.image} alt="image" />
          </div>

          <div className="map">
            <Map
              address={clickedProperty.address}
              city={clickedProperty.city}
              country={clickedProperty.country}
            />
          </div>
          <div className="single-property-details">
            <div className="single-property-info">
              <h1 className="primaryText">{clickedProperty.title}</h1>
              <span className="single-property-price">
                $ {clickedProperty.price}
              </span>
            </div>

            <div className="single-proprty-facilites">
              <span>bathroom : 4</span>
              <span>Parking : 3</span>
              <span>Rooms : 5</span>
            </div>

            <div className=" secondaryText single-property-description">
              {clickedProperty.description}
            </div>

            <div className="single-property-address"></div>

            <div className="single-property-location">
              <HiLocationMarker color="var(--blue)" size={30} />
              {`${clickedProperty.address}, ${clickedProperty.city}, ${clickedProperty.country}`}
            </div>

            <div className="single-property-button">
              <button onClick={() => handleBook(user?._id)} className="buttonb">
                Book your visit
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Property;
