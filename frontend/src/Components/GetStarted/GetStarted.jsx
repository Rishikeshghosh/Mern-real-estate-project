import React from 'react'
import "./GetStarted.css"
import { toggleValue } from '../ToggleMode/ToggleSlice'
import { useSelector } from 'react-redux'
const GetStarted = () => {
  const toogleState = useSelector(toggleValue)
  return (
   <section className={`${toogleState ? "g-wrapper blur" : "g-wrapper"}` } id="getStarted">
    <div className="g-container">
        <div className="g-detail">
            <span className='primary'>Get started with Homyz</span>
            <span className='secondaryText'>Subscribe and find super attractive price quotes from us.
            <br/>
               Find your residence soon</span>
         <div className="button">
           <a href="mailto:rishikeshghoshghosh@gmail.com">Get Started</a>
         </div>
            
        </div>

    </div>
   </section>
  )
}

export default GetStarted