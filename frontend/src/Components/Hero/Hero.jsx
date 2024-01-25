import React from 'react'
import heroImg from "../../Assets/hero-image.png"
import {HiLocationMarker} from "react-icons/hi"
import CountUp from "react-countup"
import { toggleValue } from '../ToggleMode/ToggleSlice'
import "./Hero.css"
import { useSelector } from 'react-redux'
import SearchBar from '../Pages/SearchBar/SearchBar'
const Hero = () => {
  const toogleState = useSelector(toggleValue)
  return (
    <section className={`${toogleState ? "hero-wrapper blur " : "hero-wrapper"}`}>
      
    <div className="hero-container">

        <div className="hero-left">
            
           <div className="hero-title">
            <div className='orange-circle' ></div>
              <h1>Discover <br/>Most Suitable<br/>Property </h1>
           </div>

            <div className="hero-des">
               <span className='sm-title'>Find a variety of properties that suit you very easilty.</span>
               <span className='sm-title'>Forget all difficulties in finding a residence for you.</span>
            </div>

         
             <SearchBar/>
           
             <div className="stats">
              <div className='stat'>
                <span><CountUp start={8800} end={9000} duration={4}/></span>
                <span className='orange'>+</span>
                <span className='d-block'>Preimum Products</span>
              </div>
              <div className='stat'>
                <span><CountUp start={1950} end={2000} duration={4}/></span>
                <span className='orange'>+</span>
                <span className='d-block'>Happy Customer</span>
              </div>
              <div className='stat'>
                <span><CountUp  end={50} duration={5}/></span>
                <span className='orange'>+</span>
                <span className='d-block'>Awards Winning</span>
              </div>
             </div>
        </div>

        <div className="hero-right">

          <div className="image-container"><img src={heroImg} alt="" className="image" />
          </div>
        
        </div>
    </div>
      </section>
  )
}

export default Hero