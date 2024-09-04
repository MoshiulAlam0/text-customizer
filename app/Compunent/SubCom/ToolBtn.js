import React from "react";

const ToolBtn = ({ func, text, styeleObj }) => {
  return (
    <button
    
      className="tool-btn w-[20vmin] py-[.4vmin]  bg-[#00a677] border-[1px] border-solid border-white text-white text-[17px] hover:border-[#ff6017] hover:bg-[#00245e] font-light transition-all"
      onClick={func}
    >
      {text}
    </button>
  );
};

export default ToolBtn;
