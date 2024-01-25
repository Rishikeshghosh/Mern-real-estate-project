import React, { useEffect } from "react";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import "swiper/css";
import "./Residancies.css";
import { data } from "../../Utils/Slider";
import { sliderSettings } from "../../Utils/common";
import { toggleValue } from "../ToggleMode/ToggleSlice";
import { useDispatch, useSelector } from "react-redux";
import ResidancyCard from "../ResidancyCard/ResidancyCard";
import {
  getAllPropertiesAsync,
  properties,
} from "../../features/Properties/PropertiesSlice";
const Residancies = () => {
  const dispath = useDispatch();
  const allListedProperties = useSelector(properties);
  const toggleState = useSelector(toggleValue);

  const fetchAllProperties = () => {
    dispath(getAllPropertiesAsync());
  };

  useEffect(() => {
    fetchAllProperties();
  }, []);

  return (
    <section
      className={`${toggleState ? "r-wrapper blur" : "r-wrapper"}`}
      id="residancy"
    >
      <div className="r-container">
        <div className="r-head">
          <span className="orangeText">Best Choices</span>
          <span className="primaryText">Popular Residencies</span>
        </div>

        <Swiper {...sliderSettings}>
          <SliderButtons />
          {allListedProperties.slice(0, 11).map((item, index) => {
            return (
              <SwiperSlide key={index}>
                <ResidancyCard item={item} />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </section>
  );
};

export default Residancies;

const SliderButtons = () => {
  const swiper = useSwiper();
  return (
    <div className="r-buttons">
      <button onClick={() => swiper.slidePrev()}>&lt;</button>
      <button onClick={() => swiper.slideNext()}>&gt;</button>
    </div>
  );
};
