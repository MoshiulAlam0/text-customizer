'use client'

import React, { useState } from 'react'
// import React from "react";

const Switch = ({props, colorValue , modeText, setmodeText}) => {
  const [num, setnum] = useState(0);
  const [bgColor, setbgColor] = useState("bg-[#363a49]");
  const [xValue, setxValue] = useState("");
  return (
    <div className="switch flex items-center justify-center">
      <input type="checkbox" id="chack" className="w-0" />
      <label
        onClick={() => {
          if (num === 0) {
            props.changeMode("white", colorValue, false);
            setnum(1);
          } else {
            props.changeMode("black", "white", true);
            setnum(0);
          }
          modeText === "light" ? setmodeText("drak") : setmodeText("light");
          bgColor === "bg-[#363a49]"
            ? setbgColor("bg-[#16386e]")
            : setbgColor("bg-[#363a49]");
          xValue === "" ? setxValue("translate-x-[100%]") : setxValue("");
        }}
        htmlFor="chack"
        className={` sw-btn cursor-pointer w-[10vmin] h-[5vmin] relative  rounded-[50px] ${bgColor}`}
      >
        <div
          className={`sw-boll absolute top-0 left-0 ${xValue}  w-[5vmin] h-full bg-blue-500 rounded-full `}
        ></div>
      </label>
    </div>
  );
};

export default Switch;
