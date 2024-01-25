import React, { useState } from "react";
import "./PriceRange.css";
import { useDispatch } from "react-redux";
import { fiterPropertiesByPriceAsync } from "../../../features/Properties/PropertiesSlice";
const PriceRange = () => {
  const [minVal, setMinVal] = useState(1000);
  const [maxVal, setMaxVal] = useState(5000);
  const dispath = useDispatch();
  const handleApplyPriceFilter = (data) => {
    try {
      let data = {
        minPrice: minVal,
        maxPrice: maxVal,
      };
      dispath(fiterPropertiesByPriceAsync(data));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <section className="price-range-warapper">
      <div className="title">
        <span className="title-span">Filter your desirable price here</span>
      </div>

      <div className="price-range-container">
        <div className="price-min-max">
          <div className="min-max">
            Min <span>{minVal}</span>
          </div>
          <div className="min-max">
            Max <span>{maxVal}</span>
          </div>
        </div>
        <div className="ranges">
          <input
            onChange={(e) => setMinVal(e.target.value)}
            type="range"
            min="500"
            max="5000"
          />
          <input
            onChange={(e) => setMaxVal(e.target.value)}
            type="range"
            min="500"
            max="10000"
          />
        </div>
        <div className="filter-btn">
          <button onClick={() => handleApplyPriceFilter()}>Apply</button>
        </div>
      </div>
    </section>
  );
};

export default PriceRange;
