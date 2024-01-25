import React, { useEffect, useState } from "react";
import SearchBar from "../../Pages/SearchBar/SearchBar";
import Header from "../../Header/Header";
import "./Properties.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllPropertiesAsync,
  properties,
} from "../../../features/Properties/PropertiesSlice";
import ResidancyCard from "../../ResidancyCard/ResidancyCard";
import { toggleValue } from "../../ToggleMode/ToggleSlice";
import PriceRange from "../PriceRange/PriceRange";
const Properties = () => {
  const toggle = useSelector(toggleValue);
  const allListedProperties = useSelector(properties);
  const [text, setText] = useState("");
  const dispath = useDispatch();
  const fetchAllProperties = async () => {
    dispath(getAllPropertiesAsync());
  };

  useEffect(() => {
    fetchAllProperties();
  }, []);

  return (
    <>
      <Header />
      <section
        className={`${toggle ? "property-wrapper blur" : "property-wrapper"}`}
      >
        <div className="property-container">
          <SearchBar text={text} setText={setText} />
        </div>
        <div className="price-range-sec">
          <PriceRange />
        </div>

        <div className="property">
          {allListedProperties.length > 0 ? (
            allListedProperties?.map((item, index) => {
              return <ResidancyCard item={item} key={index} />;
            })
          ) : (
            <div className="no-result">
              <span>No result found with the key "{text}" </span>
            </div>
          )}
        </div>

        <ToastContainer />
      </section>
    </>
  );
};

export default Properties;
