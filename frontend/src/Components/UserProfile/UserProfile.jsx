import React, { useEffect, useState } from "react";
import "./UserProfile.css";
import { FaRegStar } from "react-icons/fa";
import { MdOutlineVerifiedUser } from "react-icons/md";
import { HiOutlineHome } from "react-icons/hi";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { MdOutlineSpeakerNotes } from "react-icons/md";
import { MdWorkOutline } from "react-icons/md";
import Header from "../Header/Header";
import { IoIosArrowForward } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  deleteUserAccountAsync,
  deleteUserAccountSucc,
  getTheUserAsync,
  update,
  updateUserImgaeAsync,
  updateUserInfoAsync,
  userImage,
  userInfo,
} from "../../features/Authentication/registerUserSlice";
import { useNavigate, useParams } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
import { GoArrowRight } from "react-icons/go";
import {
  loggedInUser,
  userData,
} from "../../features/Authentication/registerUserSlice";
import { RotatingLines } from "react-loader-spinner";
import axios from "axios";
import { RxCross2 } from "react-icons/rx";
import { MdOutlinePhone } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import { TbInfoTriangleFilled } from "react-icons/tb";
import { ConfirmDialogg } from "primereact/confirmdialog";

import { Dialog } from "primereact/dialog";
import { toggleValue } from "../ToggleMode/ToggleSlice";
const UserProfile = () => {
  const updatedImage = useSelector(userImage);
  const isUserLoggedIn = useSelector(userData);
  const trackOfUser = useSelector(loggedInUser);
  const navigate = useNavigate();
  const { userId } = useParams();
  const dispatch = useDispatch();
  const [showUpdateSection, setShowUpdateSection] = useState(false);
  const [image, setImage] = useState("");
  const [loader, setLoader] = useState(false);
  const [address, setAddress] = useState("");
  const [language, setLanguage] = useState("");
  const [occupation, setOccupation] = useState("");
  const [phone, setPhone] = useState("");
  const [showUpdateInput, setShowUpdateInput] = useState(false);
  const [infoLoading, setInfoLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const user = useSelector(userInfo);
  const updated = useSelector(update);
  const dltSucc = useSelector(deleteUserAccountSucc);
  const toggle = useSelector(toggleValue);
  const handleDelete = (data) => {
    try {
      if (data.val === "yes") {
        dispatch(deleteUserAccountAsync());
      } else {
        setVisible(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const setAllValues = () => {
    setLanguage(user?.speaks);
    setOccupation(user?.occupation);
    setAddress(user?.lives);
    setPhone(user?.phone);
  };
  const getLiveUrlOfTheImg = async () => {
    try {
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

  const handleDeleteAccount = () => {
    try {
    } catch (error) {
      console.log(error);
    }
  };

  const uploadProfileImage = async () => {
    try {
      if (!image) {
        toast.warn("Can't upload empty image !", {
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
        const liveImg = await getLiveUrlOfTheImg();
        dispatch(
          updateUserImgaeAsync({
            userImage: liveImg,
            userId: isUserLoggedIn._id,
          })
        );
        setImage("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getTheUserALLInfo = () => {
    if (!isUserLoggedIn._id) {
      navigate("/");
    }
    dispatch(getTheUserAsync({ id: userId }));
  };

  const handleUpdateUserInfo = (e) => {
    try {
      e.preventDefault();
      if (!phone && !language && !occupation && !address) {
        toast.warn("Can't update empty values !", {
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
        setInfoLoading(true);
        const update = {
          phone: phone ? phone : user.phone,
          speaks: language ? language : user.speaks,
          occupation: occupation ? occupation : user.occupation,
          lives: address ? address : user.lives,
        };
        dispatch(updateUserInfoAsync(update));
        setAddress("");
        setLanguage("");
        setOccupation("");
        setPhone("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user?._id) {
      setAllValues();
    } else {
      getTheUserALLInfo();
    }
  }, [user]);

  useEffect(() => {
    getTheUserALLInfo();
    setInfoLoading(false);
    setLoader(false);
    setShowUpdateInput(false);
  }, [updatedImage, updated]);

  useEffect(() => {
    if (!isUserLoggedIn._id) {
      navigate("/");
    }
    if (dltSucc._id) {
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      navigate("/");
    }
  }, [trackOfUser, dltSucc]);

  return (
    <>
      <form onSubmit={(e) => handleUpdateUserInfo(e)} className="form-wrapper">
        <div className="div"></div>
        <div
          className={`${
            showUpdateInput ? " form-container-on" : "form-container"
          }`}
        >
          <div className="close-icon">
            <IoMdClose onClick={() => setShowUpdateInput(false)} />
          </div>
          <div className="form-input-sec">
            <label className="form-label">Add address</label>
            <input
              onChange={(e) => setAddress(e.target.value)}
              value={address}
              placeholder="address"
            ></input>
          </div>
          <div className="form-input-sec">
            <label className="form-label">Add language</label>
            <input
              onChange={(e) => setLanguage(e.target.value)}
              value={language}
              placeholder="language"
            ></input>
          </div>
          <div className="form-input-sec">
            <label className="form-label">Add occipition</label>
            <input
              onChange={(e) => setOccupation(e.target.value)}
              value={occupation}
              placeholder="occupation"
            ></input>
          </div>
          <div className="form-input-sec">
            <label className="form-label">Add Phone</label>
            <input
              onChange={(e) => setPhone(e.target.value)}
              value={phone}
              placeholder="phone"
            ></input>
          </div>
          <div className="form-button">
            {infoLoading ? (
              <RotatingLines
                strokeColor="black"
                strokeWidth="5"
                animationDuration="0.75"
                width="40"
                visible={true}
              />
            ) : (
              <button className="btn">Update</button>
            )}
          </div>
        </div>
      </form>

      <div className="user-profile">
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
        <Header />
        <Dialog
          style={{ backgroundColor: "white" }}
          visible={visible}
          onHide={() => setVisible(false)}
        >
          <div className="dailog-container">
            <div style={{ marginTop: "1rem" }} className="dailog-box">
              <TbInfoTriangleFilled size={50} color="#06b6d4" />
              <span>
                Are you sure {user?.name?.split(" ")[0]} ! <br /> you want to
                delete <br /> your account ?
              </span>
            </div>
            <div className="dailog-box-btn">
              <button
                onClick={() => handleDelete({ val: "no" })}
                className="btn red"
              >
                No
              </button>
              <button
                onClick={() => handleDelete({ val: "yes" })}
                className="btn blue"
              >
                Yes
              </button>
            </div>
          </div>
        </Dialog>

        <section
          className={`${
            toggle || showUpdateInput
              ? "user-profile-wrapper blur"
              : "user-profile-wrapper"
          }`}
        >
          <div className="user-profile-container-grid">
            <div className="user-profile-left">
              <div className="user-profile-image">
                <div className="user-profile-img-container">
                  <img src={user?.image} alt=""></img>
                  <div className="user-profile-gmail-name">
                    <h2>{user?.name}</h2>
                    <span className="mail">{user?.email}</span>
                  </div>
                </div>
                {loader ? (
                  <RotatingLines
                    strokeColor="black"
                    strokeWidth="5"
                    animationDuration="0.75"
                    width="40"
                    visible={true}
                  />
                ) : (
                  <div className="upload-img">
                    {!showUpdateSection ? (
                      <div className="selection-section">
                        <span
                          onClick={() =>
                            setShowUpdateSection(!showUpdateSection)
                          }
                        >
                          Upload your image{" "}
                        </span>
                        <GoArrowRight />
                      </div>
                    ) : (
                      <div className="input-section">
                        <input
                          placeholder="Chose image"
                          type="file"
                          onChange={(e) => setImage(e.target.files[0])}
                        />
                        <button
                          onClick={() => uploadProfileImage()}
                          className="button"
                        >
                          Upload
                        </button>
                        <IoMdClose
                          onClick={() =>
                            setShowUpdateSection(!showUpdateSection)
                          }
                        />
                      </div>
                    )}
                  </div>
                )}
              </div>
              <div className="user-profile-details">
                <div className="user-profile-icon">
                  <FaRegStar /> Review
                </div>

                <div className="user-profile-icon">
                  <MdOutlineVerifiedUser /> Identity Varified
                </div>

                <div className="user-profile-icon">
                  <HiOutlineHome /> Joined
                </div>
              </div>
              <div className="user-profile-is-varified">
                <div className="user-profile-header">
                  <h2>
                    {user.name && user?.name.split(" ")[0]}'s confirmation{" "}
                  </h2>
                  <IoIosArrowForward />
                </div>

                <div className="user-profile-info-varified">
                  {!user.email ? <RxCross2 /> : <IoMdCheckmarkCircleOutline />}{" "}
                  Email
                </div>
                <div className="user-profile-info-varified">
                  {!user.lives ? <RxCross2 /> : <IoMdCheckmarkCircleOutline />}{" "}
                  Address
                </div>
                <div className="user-profile-info-varified">
                  {!user.phone ? <RxCross2 /> : <IoMdCheckmarkCircleOutline />}{" "}
                  Phone
                </div>
                <div className="user-profile-info-varified">
                  <IoMdCheckmarkCircleOutline /> Person
                </div>
              </div>

              <div className="user-profile-learnmore">
                <p className="learnmore">
                  <span>Learn more</span>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Rem,
                  quod?
                </p>
              </div>
            </div>
            <div className="user-profile-right">
              <div className="user-profile-container">
                <h2>{user?.name}</h2>
                <span className="join">Joined {user?.registerDate}</span>
                <span onClick={() => setVisible(true)} className="dlt-profile">
                  Delete account <IoIosArrowForward />
                </span>
              </div>
              <div className="user-profile-about">
                <div className="user-profile-header">
                  <h2>About</h2>
                  <IoIosArrowForward />
                </div>
                <span>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sit
                  laudantium cumque ea eius tenetur? Harum animi vero incidunt
                  alias natus?
                </span>
              </div>
              <div className="user-details-update">
                <div className="user-profile-right-info-details">
                  <div className="user-profile-right-info">
                    <HiOutlineHome />{" "}
                    {`${user.lives ? user.lives : "Hasn't added yet !"}`}
                    <FiEdit onClick={() => setShowUpdateInput(true)} />
                  </div>
                  <div className="user-profile-right-info">
                    <MdOutlineSpeakerNotes />{" "}
                    {`${user.speaks ? user.speaks : "Hasn't added yet !"}`}
                    <FiEdit onClick={() => setShowUpdateInput(true)} />
                  </div>
                  <div className="user-profile-right-info">
                    <MdWorkOutline />{" "}
                    {`${
                      user.occupation ? user.occupation : "Hasn't added yet !"
                    }`}
                    <FiEdit onClick={() => setShowUpdateInput(true)} />
                  </div>
                  <div className="user-profile-right-info">
                    <MdOutlinePhone />{" "}
                    {`${user.phone ? user.phone : "Hasn't added yet !"}`}
                    <FiEdit onClick={() => setShowUpdateInput(true)} />
                  </div>
                </div>
              </div>
              <div className="user-profile-right-reviews">
                <div className="user-profile-right-reviews-upper">
                  <div className="stars">
                    <span>
                      <FaRegStar /> <FaRegStar /> <FaRegStar /> <FaRegStar />
                    </span>
                    <h2>4 Review</h2>
                  </div>

                  <span className="posted">September 2023</span>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Dicta temporibus aliquam quod, officia molestias reiciendis.
                  </p>
                </div>
                <div className="user-profile-right-reviews-upper-post">
                  <div>
                    <img
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTO2vBQ1vOla9pPM6M0ZsYZb7OckCS21cgN_Q&usqp=CAU"
                      alt=""
                    />
                  </div>

                  <div className="poster-address">
                    <span className="big-font">Tamera,Bryson City, NC </span>
                    <span className="small-font">Joiend 2017</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default UserProfile;
