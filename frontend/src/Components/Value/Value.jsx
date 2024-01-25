import React, { useState } from "react";
import logo from "../../Assets/value.png";
import {
  Accordion,
  AccordionItem,
  AccordionItemButton,
  AccordionItemHeading,
  AccordionItemPanel,
  AccordionItemState,
} from "react-accessible-accordion";
import "react-accessible-accordion/dist/fancy-example.css";
import { MdOutlineArrowDropDown } from "react-icons/md";
import data from "../../Utils/Accordian";
import "./Value.css";
import { toggleValue } from "../ToggleMode/ToggleSlice";
import { useSelector } from "react-redux";

const Value = () => {
  const [className, setClassName] = useState(null);
  const toogleState = useSelector(toggleValue);

  return (
    <section
      className={`${toogleState ? "v-wrapper blur" : "v-wrapper"}`}
      id="value"
    >
      <div className="v-container">
        <div className="v-left">
          <div className="image-container">
            <img src={logo} alt="" />
          </div>
        </div>
        <div className="v-right">
          <span className="orangeText">Our Value</span>
          <span className="primaryText">Value We Give to You</span>
          <span className="secondaryText">
            We always ready to help by providijng the best services for you.{" "}
            <br />
            We beleive a good blace to live can make your life better
          </span>
          <Accordion
            className="accordion"
            allowMultipleExpanded={true}
            preExpanded={[0]}
          >
            {data.map((item, index) => {
              return (
                <AccordionItem
                  className={`accordionItem expanded`}
                  uuid={index}
                  key={index}
                >
                  <AccordionItemHeading className="accordionItemHeading">
                    <AccordionItemButton className="accordionButton">
                      <AccordionItemState>
                        {({ expanded }) =>
                          expanded
                            ? setClassName("expanded")
                            : setClassName("nonExpanded")
                        }
                      </AccordionItemState>
                      <div className="icon">{item.icon}</div>
                      <span className="primaryText">{item.heading}</span>
                      <span className="icon">
                        <MdOutlineArrowDropDown size={20} />
                      </span>
                    </AccordionItemButton>
                  </AccordionItemHeading>
                  <AccordionItemPanel>
                    <p className="secondaryText">{item.detail}</p>
                  </AccordionItemPanel>
                </AccordionItem>
              );
            })}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default Value;
