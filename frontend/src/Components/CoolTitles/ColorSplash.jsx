import React from 'react'
import "./ColorSplash.css"
import { toggleValue } from '../ToggleMode/ToggleSlice'
import { useSelector } from 'react-redux'
const ColorSplash = ({title}) => {
  
  const toogleState = useSelector(toggleValue)
  return (
    <div className={`${toogleState ? "container blur" : "container"}`}>
 
    <div className="col-md-12 text-center">
      <h3 className="animate-charcter">{title}</h3>
   
  </div>
</div> 
  )
}

export default ColorSplash