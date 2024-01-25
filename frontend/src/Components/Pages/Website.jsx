import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import Hero from "../Hero/Hero";
import Companies from "../Companies/Companies";
import Residancies from "../Residancies/Residancies";
import ColorSplash from "../CoolTitles/ColorSplash";
import Value from "../Value/Value";
import Contact from "../Contact/Contact";
import GetStarted from "../GetStarted/GetStarted";
import Footer from "../Footer/Footer";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllPropertiesAsync,
  properties,
} from "../../features/Properties/PropertiesSlice";

const Website = () => {
  const [title1, setTitle1] = useState("YOU FOUND THE RIGHT PLACE !");
  const [title2, setTitle2] = useState("MAKE YOUR DREAM TRUE TODAY !");
  const [title3, setTitle3] = useState("SUPRISE YOUR FAMILY WITH A GIFT !");
  const dispath = useDispatch();

  const listedProperties = useSelector(properties);

  return (
    <div className="App">
      <div>
        <div className="white-gradient" />
        <Header />
        <Hero />
      </div>
      <Companies />
      <Residancies />
      <ColorSplash title={title2} />
      <Value />
      <ColorSplash title={title3} />
      <Contact />
      <GetStarted />
      <Footer />
    </div>
  );
};

export default Website;
