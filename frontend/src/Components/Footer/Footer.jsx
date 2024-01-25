import React from 'react'
import "./Footer.css"
import logo from "../../Assets/logo2.png"
import { toggleValue } from '../ToggleMode/ToggleSlice'
import { useSelector } from 'react-redux'
const Footer = () => {
   const toogleState = useSelector(toggleValue)
  return (
  <section className={`${toogleState ? "f-wrapper blur" : "f-wrapper"}`}>
    <div className="f-container">
        <div className="r-left">
             <img src={logo} />
                <span className='secondaryText'>
                   Our vision is to make all people <br/>
                   the best place to live for them.
                </span>
        </div>

        <div className="r-right">
            <div className='f-info'>
            <span className='primaryText'>Information</span>
            <span className="secondaryText">145 New York, FL 5467, USA</span>
            </div>
            <div className='f-links'>
                 <span>Property</span>
                 <span >Services</span>
                 <span>Product</span>
                 <span >About Us</span>
            </div>
            
        </div>

    </div>
  </section>
  )
}

export default Footer