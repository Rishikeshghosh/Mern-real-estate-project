import React from "react";
import conatct from "../../Assets/contact.jpg";
import "./Contact.css";
import { MdCall, MdChatBubble, MdChatBubbleOutline } from "react-icons/md";
import { BsFillChatDotsFill, BsPersonVideo } from "react-icons/bs";
import { AiOutlineMessage } from "react-icons/ai";
import { toggleValue } from "../ToggleMode/ToggleSlice";
import { useSelector } from "react-redux";
const Contact = () => {
  const toogleState = useSelector(toggleValue);
  return (
    <section
      className={`${toogleState ? "contact-wrapper blur" : "contact-wrapper"}`}
      id="contact"
    >
      <div className="contact-container">
        <div className="contact-left">
          <span className="orangeText">Our Contact Us</span>
          <span className="primaryText">Easy to contact us</span>
          <span className="secondaryText">
            We always ready to help by providing the best services for you. We
            beleive a good blace to live can make your life better
          </span>

          <div className="contactModes">
            <div className="row">
              <div className="mode">
                <div className="flexStart">
                  <div className="icon">
                    <MdCall size={25} />
                  </div>
                  <div className="detail">
                    <span className="block">Call</span>
                    <span className="secondaryText">600-371-3139</span>
                  </div>
                </div>
                <div className="button">Call Now</div>
              </div>
              <div className="mode">
                <div className="flexStart">
                  <div className="icon">
                    <MdChatBubble size={25} />
                  </div>
                  <div className="detail">
                    <span className="block">Chat</span>
                    <span className="secondaryText">600-371-3139</span>
                  </div>
                </div>
                <div className="button">Chat Now</div>
              </div>
              <div className="mode">
                <div className="flexStart">
                  <div className="icon">
                    <BsPersonVideo size={25} />
                  </div>
                  <div className="detail">
                    <span className="block">Video</span>
                    <span className="secondaryText">600-371-3139</span>
                  </div>
                </div>
                <div className="button">Video Call</div>
              </div>
              <div className="mode">
                <div className="flexStart">
                  <div className="icon">
                    <AiOutlineMessage size={25} />
                  </div>
                  <div className="detail">
                    <span className="block">Message</span>
                    <span className="secondaryText">600-371-3139</span>
                  </div>
                </div>
                <div className="button">Message Now</div>
              </div>
            </div>
          </div>
        </div>

        <div className="contact-right">
          <div className="image-container">
            <img src={conatct} alt="" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
