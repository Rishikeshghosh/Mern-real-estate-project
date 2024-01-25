import React from 'react'
import "./Companies.css"
import prologies from "../../Assets/prologis.png"
import equinix from "../../Assets/equinix.png"
import realty from "../../Assets/realty.png"
import tower from "../../Assets/tower.png"
import { toggleValue } from '../ToggleMode/ToggleSlice'
import { useSelector } from 'react-redux'
const Companies = () => {
  const toogleState = useSelector(toggleValue)
  
  return (
    <section className={`${toogleState ? "c-wrapper blur" : "c-wrapper"}`}>
        <div className='c-container'>
          <img src={prologies} alt="" />
          <img src={equinix} alt="" />
          <img src={realty} alt="" />
          <img src={tower} alt="" />
        </div>
    </section>
  )
}

export default Companies