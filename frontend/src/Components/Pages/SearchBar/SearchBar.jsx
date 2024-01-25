import React, { useEffect, useState } from "react";
import { HiLocationMarker } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import {
  filter,
  getAllPropertiesAsync,
  getFilteredProprtiesAsync,
} from "../../../features/Properties/PropertiesSlice";

const SearchBar = ({ text, setText }) => {
  const dispatch = useDispatch();
  const handleClick = () => {
    try {
      if (!text) return;
      dispatch(getFilteredProprtiesAsync({ keyword: text }));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="search-bar">
      <HiLocationMarker color="var(--blue)" size={30} />
      <input
        onChange={(e) => setText(e.target.value)}
        value={text}
        type="text"
      />
      <button onClick={() => handleClick()} className="button">
        Search
      </button>
    </div>
  );
};

export default SearchBar;
