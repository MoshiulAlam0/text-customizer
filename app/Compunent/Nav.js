'use client'

import { useState } from 'react'
import React from 'react'
import Switch from './SubCom/Switch';


const Nav = (props) => {
    const [colorValue, setcolorValue] = useState('');
    const [modeText, setmodeText] = useState("light");

  return (
    <div style={{backgroundColor:props.styeleObj.backgroundColor === "white" ? "#7d6450" : '#1b191d', color: props.styeleObj.color === 'black' ? "black" : "white"}} className='flex items-center justify-between px-[5vmin] py-[1vmin] '>
      <h1 id='logo' className=' text-[4vmin]  font-bold text-colorfull'>Text <span className='leading-tight'>Customizer</span></h1>
      <div className="flex items-center justify-center gap-3  capitalize">
        <input id='color-field' onChange={(e)=>{setcolorValue(e.target.value)}} type="color" />
        <Switch props={props} modeText={modeText} setmodeText={setmodeText} colorValue={colorValue}/>
        <p id='modeText' className='text-[2.4vmin] font-light capitalize w-[20vmin]'>{modeText}</p>
      </div>
    </div>
  )
}

export default Nav

