import React, { useEffect, useState } from "react";
import "./OwnedProperty.css";
import Header from "../Header/Header";
import { RotatingLines } from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  editProp,
  getEditPropertyAsync,
  updatePropertyAsync,
  updateSuccProp,
} from "../../features/Properties/PropertiesSlice";
import { useNavigate, useParams } from "react-router-dom";

const CreateProperty = () => {
  const [loader, setLoader] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [image, setImage] = useState("");
  const [bathRoom, setBathRoom] = useState("");
  const [perking, setPerking] = useState("");
  const [room, setRoom] = useState("");
  const [security, setSecurity] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const { resId } = useParams();
  const dispatch = useDispatch();
  const editableProperty = useSelector(editProp);
  const updateSucc = useSelector(updateSuccProp);
  const navigate = useNavigate();

  const getEditProperty = (id) => {
    dispatch(getEditPropertyAsync({ resId: id }));
  };

  const setAllValue = () => {
    setImage(editableProperty.image);
    setTitle(editableProperty.title);
    setDescription(editableProperty.description);
    setPrice(editableProperty.price.toString());
    setAddress(editableProperty.address);
    setCity(editableProperty.city);
    setBathRoom(editableProperty.facilities?.bathroom);
    setPerking(editableProperty.facilities?.perking);
    setRoom(editableProperty.facilities?.room);
    setSecurity(editableProperty.facilities?.security);
    setPhone(editableProperty.userPhone);
    setEmail(editableProperty.userEmail);
    setCountry(editableProperty.country);
  };

  const handleRedirect = (id) => {
    setLoader(false);
    navigate(`/updated/successfull/${id}`);
  };

  const getLiveImage = async (image) => {
    try {
      if (!image) return;
      setLoader(true);
      const data = new FormData();
      data.append("file", image);
      data.append("upload_preset", "realestate");
      data.append("cloud_name", "");
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dwfqd9v0w/image/upload",
        data
      );
      return response.data.secure_url;
    } catch (error) {
      console.log(error);
    }
  };

  const handleCreateProperty = async (e) => {
    e.preventDefault();
    try {
      if (
        !title ||
        !description ||
        !price ||
        !address ||
        !city ||
        !country ||
        !image ||
        !phone ||
        !email ||
        !bathRoom ||
        !room ||
        !security ||
        !perking
      ) {
        toast.error("All the fields must be filled up !", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        setLoader(true);
        if (image.slice(0, 5) !== "https") {
          const liveImage = await getLiveImage(image);
          setImage(liveImage);
        }

        let propertyData = {
          title: title,
          description: description,
          price: parseInt(price),
          address: address,
          city: city,
          country: country,
          image: image,
          phone: phone,
          email: email,
        };
        const provide = {
          bathroom: bathRoom,
          perking: perking,
          room: room,
          security: security,
        };
        propertyData["facilities"] = provide;
        propertyData["resId"] = resId;

        dispatch(updatePropertyAsync(propertyData));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (editableProperty._id) {
      setAllValue();
    }
  }, [editableProperty]);

  useEffect(() => {
    if (updateSucc._id) {
      handleRedirect(updateSucc._id);
    } else {
      getEditProperty(resId);
    }
  }, [updateSucc]);
  return (
    <section className="create-property-wrapper">
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
        theme="light"
      />
      <div className="create-property-container">
        <div className="form-box">
          <form onSubmit={(e) => handleCreateProperty(e)} className="form">
            <div className="container">
              <div className="box">
                <label>Title</label>
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  type="text"
                />
              </div>
              <div className="box">
                <label>Description</label>
                <input
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  type="text"
                />
              </div>
              <div className="box">
                <label>Price</label>
                <input
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  type="number"
                />
              </div>
              <div className="box">
                <label>Address</label>
                <input
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  type="text"
                />
              </div>
              <div className="box">
                <label>City</label>
                <input
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  type="text"
                />
              </div>
              <div className="box">
                <label>Country</label>
                <input
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  type="text"
                />
              </div>
              <div className="box">
                <label>Email</label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="text"
                />
              </div>
              <div className="box">
                <label>Phone</label>
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  type="text"
                />
              </div>
              <div className="box">
                <label>Image</label>
                <input
                  onChange={(e) => setImage(e.target.files[0])}
                  type="file"
                />
              </div>
              <div className="create-res-btn">
                <button onClick={() => handleCreateProperty}>
                  {loader ? (
                    <RotatingLines
                      strokeColor="white"
                      strokeWidth="5"
                      animationDuration="0.75"
                      width="30"
                      visible={true}
                    />
                  ) : (
                    "Update property"
                  )}
                </button>
              </div>
            </div>

            <div className="line"></div>

            <div className="container">
              <div className="box-facy">
                <span>Facilities you're providing :</span>
                <div className="facy">
                  <label>Bathrooms</label>
                  <input
                    value={bathRoom}
                    onChange={(e) => setBathRoom(e.target.value)}
                    type="number"
                  />
                </div>
                <div className="facy">
                  <label>Perking Places</label>
                  <input
                    value={perking}
                    onChange={(e) => setPerking(e.target.value)}
                    type="number"
                  />
                </div>
                <div className="facy">
                  <label>Security level 1/10</label>
                  <input
                    value={security}
                    onChange={(e) => setSecurity(e.target.value)}
                    type="number"
                  />
                </div>
                <div className="facy">
                  <label>Rooms in the house</label>
                  <input
                    value={room}
                    onChange={(e) => setRoom(e.target.value)}
                    type="number"
                  />
                </div>
                <div className="create-res-btn-fac">
                  <button>
                    {loader ? (
                      <RotatingLines
                        strokeColor="white"
                        strokeWidth="5"
                        animationDuration="0.75"
                        width="30"
                        visible={true}
                      />
                    ) : (
                      "Update property"
                    )}
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default CreateProperty;
