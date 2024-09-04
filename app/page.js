'use client'
import React, { useState } from 'react'
import Nav from './Compunent/Nav'
import Field from './Compunent/Field';

const page = () => {
  const [mode, setMode] = useState({
    color: "black",
    backgroundColor: 'white'
  });
  const switchDrackMode = (color ,bgColor, isChange) =>{
    setMode({
      color: color,
      backgroundColor:bgColor === "" ? '#070b1c' : bgColor,
      isChange: isChange, 
    })
  }
  return (
    <div style={{backgroundColor:mode.backgroundColor}} className={`w-full relative h-screen overflow-x-hidden`}>
      <Nav styeleObj={mode} changeMode={switchDrackMode}/>
      <Field styeleObj={mode}/>
      <h1 className='absolute bottom-4 left-0 w-full text-center text-[10px] tracking-[6px] text-zinc-500'>Built by Moshiulalam0</h1>
    </div>
  )
}

export default page
