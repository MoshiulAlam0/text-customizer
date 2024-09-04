"use client ";
import React, { useState } from "react";
import ToolBtn from "./SubCom/ToolBtn";

import toast, { Toaster } from "react-hot-toast";

import { IoIosArrowUp } from "react-icons/io";

const Field = ({ styeleObj }) => {
  const [rotateValue, setrotateValue] = useState("0deg");
  const [hValue, sethValue] = useState("h-0");
  const [paddingX, setpaddingX] = useState("0px");
  const [totalWord, settotalWord] = useState(0);
  const [totalChar, settotalChar] = useState(0);
  const [readTimeS, setreadTimeS] = useState(0);
  const [readTimeM, setreadTimeM] = useState(0);
  const [sentence, setsentence] = useState(0);
  const [totalExclamatory, settotalExclamatory] = useState(0);
  const [totalQustionMark, settotalQustionMark] = useState(0);
  const [fieldValue, setfieldValue] = useState("");
  const [oldFieldValue, setoldFieldValue] = useState("");
  const [undoText, setundoText] = useState("");
  const updateText = (e) => {
    // for undo text
    setundoText(fieldValue);
    // update field value
    setfieldValue(e.target.value);
    // for store old field value
    setoldFieldValue(e.target.value);
    // for total word
    settotalWord(e.target.value.split(" ").length - 1);
    // total charectar
    settotalChar(e.target.value.split("").length);
    // for read
    const readForTimeS = 0.25210084033; // need 0.25210084033 second to read one word
    const readForTimeM = 0.0042016806721667; // need 0.0042016806721667 minite to read one word
    let totalChar = e.target.value.split(" ").length - 1;
    setreadTimeS((totalChar * readForTimeS).toFixed(3));
    setreadTimeM((totalChar * readForTimeM).toFixed(3));

    let sntArr1 = fieldValue.split(".");
    let sntArr2 = fieldValue.split("!");
    let sntArr3 = fieldValue.split("?");
    let rmvSpaceSntArr1 = rmvSpaceSntFunc(sntArr1);
    let rmvSpaceSntArr2 = rmvSpaceSntFunc(sntArr2);
    let rmvSpaceSntArr3 = rmvSpaceSntFunc(sntArr3);
    setsentence(
      rmvSpaceSntArr1.length -
        1 +
        rmvSpaceSntArr2.length -
        1 +
        rmvSpaceSntArr3.length -
        1
    );
    settotalExclamatory(rmvSpaceSntArr2.length - 1);
    settotalQustionMark(rmvSpaceSntArr3.length - 1);
  };
  // for make UpperCase
  const makeUpar = () => {
    setundoText(fieldValue);
    if (fieldValue === "") {
      alert("type anything...!");
      return;
    }
    setfieldValue(fieldValue.toUpperCase());
    toast.success("UPARCACE successfull..!");
  };
  //   for make lowercase
  const makeLow = () => {
    setundoText(fieldValue);
    if (fieldValue === "") {
      alert("type anything...!");
      return;
    }
    setfieldValue(fieldValue.toLowerCase());
    toast.success("lowercase successfull..!");
  };
  //   for make Capital word
  const makeCap = () => {
    setundoText(fieldValue);
    if (fieldValue === "") {
      alert("type anything...!");
      return;
    }
    let wordArr = fieldValue.split(" ");
    let CapWordArr = wordArr.map((w) => {
      let fristL = w.slice(0, 1).toUpperCase();
      let lastW = w.slice(1, w.length);
      return fristL + lastW;
    });
    setfieldValue(CapWordArr.join(" "));
    toast.success("capitalize successfull..!");
  };
  // for removeExtraSpace
  const rmvSpace = () => {
    setundoText(fieldValue);
    if (fieldValue === "") {
      alert("type anything...!");
      return;
    }
    let splitArr = fieldValue.split(" ");
    let wordArr = [];
    splitArr.forEach((w) => {
      if (w !== "") {
        wordArr.push(w);
      }
    });
    setfieldValue(wordArr.join(" "));
    toast.success("seccessfully space removed..!");
  };
  //   for get link form the text field
  const getLink = () => {
    setundoText(fieldValue);
    let wordArr = fieldValue.split(" ");
    if (fieldValue === "") {
      alert("type anything...!");
      return;
    }
    let links = [];
    wordArr.forEach((w) => {
      let wl = w.toLocaleLowerCase();
      if (wl.startsWith("https://") || wl.startsWith("http://")) {
        links.push(w);
        return;
      }
      if (links.length === 0) {
        setfieldValue("there are no link in here !");
        toast.error("no link in this text!");
        return;
      }
      setfieldValue(links.map((l, inx) => `${++inx}. ${l} `));
      toast.success("we got Links!");
    });
  };
  //   for get Gmail form the text field
  const getGmail = () => {
    setundoText(fieldValue);
    if (fieldValue === "") {
      alert("type anything...!");
      return;
    }
    let wordArr = fieldValue.split(" ");
    let gmails = [];
    wordArr.forEach((w) => {
      let wl = w.toLocaleLowerCase();
      if (
        wl.endsWith(".com") ||
        wl.endsWith(".info") ||
        wl.endsWith(".edu") ||
        wl.endsWith(".org") ||
        wl.endsWith(".ca") ||
        wl.endsWith(".net")
      ) {
        if (w.includes("@")) {
          gmails.push(w);
        }
      }
    });
    // console.log(gmails)
    if (gmails.length === 0) {
      setfieldValue("there are no G-mail in here !");
      toast.error("no Gmail in this text!");
      return;
    }
    setfieldValue(gmails.map((g, i) => `${++i}. ${g} `));
    toast.success("we got Gmails");
  };
  // for get number from the text field
  const getNumber = () => {
    setundoText(fieldValue);
    if (fieldValue === "") {
      alert("type anything...!");
      return;
    }
    let wordArr = fieldValue.split(" ");
    let numArr = [];
    wordArr.forEach((w) => {
      let num = "";
      w.split("").forEach((c) => {
        if (!isNaN(c)) {
          num += c;
        }
      });
      if (num !== "") {
        numArr.push(num);
      }
    });
    let numStr = "";
    numArr.forEach((n, i) => {
      console.log(n);
      numStr += `
      ${++i}: ${n}`;
    });
    if (numStr === "") {
      setfieldValue("there are no number in here !");
      toast.error("sry no number in this text");
      return;
    }
    setfieldValue(numStr);
    toast.success("we got numbers!");
  };
  // for make Undo from the text
  const makeUndo = () => {
    setfieldValue(undoText);
    toast.success("undo successfull!");
  };
  // for make UndoAll from the text
  const makeUndoAll = () => {
    setfieldValue(oldFieldValue);
    toast.success("return to frist!");
  };
  // for make get coppy  from the text
  const getCoppy = () => {
    navigator.clipboard.writeText(fieldValue);
    toast.success("Successfully coppied!");
  };
  // for make get coppy  from the text
  const makeClear = () => {
    setfieldValue("");
    settotalChar(0)
    settotalWord(0)
    settotalExclamatory(0)
    settotalQustionMark(0)
    setsentence(0)
    setreadTimeM(0)
    setreadTimeS(0)
    toast.success("Successfully cleared!");
  };
  // for make sentence structure ========== start   ========
  function rmvSpaceSntFunc(sntArr) {
    let arr = sntArr.map((s) => {
      if (s !== "" && "undefined") {
        return s;
      }
    });
    return arr;
  }
  // ========================= end senteence structure ===========
  // for rotate icon
  function rotatefunc() {
    if (rotateValue === "0deg") {
      setrotateValue("180deg");
      sethValue("h-[20vh]");
      setpaddingX('6px')
    } else {
      setrotateValue("0deg");
      sethValue("h-0");
      setpaddingX('0px')
    }
  }

  return (
    // counter
    <div className="main-section w-full flex flex-col items-center justify-start mt-5">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="count-con w-[95%] font-semibold ">
        <p
          style={{ color: styeleObj.color }}
          className="flex gap-1 leading-none  capitalize text-wrap"
        >
          <span
            style={{
              backgroundColor:
                styeleObj.backgroundColor === "white" ? "#bababa" : "#2c528f",
            }}
            className="  px-[8px]  py-[4px] text-center rounded-full"
          >
            word : <span className="text-rose-500">{totalWord}</span>{" "}
          </span>
          <span
            style={{
              backgroundColor:
                styeleObj.backgroundColor === "white" ? "#bababa" : "#2c528f",
            }}
            className={` px-[8px] py-[4px] text-center  rounded-full`}
          >
            charecter : <span className="text-rose-500">{totalChar}</span>{" "}
          </span>
          <span
            style={{
              backgroundColor:
                styeleObj.backgroundColor === "white" ? "#bababa" : "#2c528f",
            }}
            className={` px-[8px] py-[4px] text-center  rounded-full`}
          >
            read time : <span className="text-rose-500">{readTimeS}</span> sec{" "}
            <span className="text-rose-500">{readTimeM}</span> minite{" "}
          </span>
        </p>
      </div>
      {/* main  */}
      <div
        id="field-main"
        className="w-[95%] flex items-start justify-between gap-5 mt-1"
      >
        <div id="textarea-con" className="field w-[90%]">
          <textarea
            onChange={updateText}
            value={fieldValue}
            className="w-full h-[45vh] border-[1px] p-[2vmin] font-light text-[20px]"
            name=""
            id=""
            style={styeleObj}
            placeholder="type anything ....."
          ></textarea>
          <div
            style={{color: styeleObj.color,}}
            className="details-con relative overflow-hidden"
          >
            <h1
              onClick={rotatefunc}
              className="capitalize font-semibold relative z-[3] cursor-pointer w-[50%] flex items-center justify-between "
            >
              more details{" "}
              <span
                style={{ rotate: rotateValue}}
                className="font-thin text-[30px] leading-none transition-all"
              >
                <IoIosArrowUp />
              </span>
            </h1>
            <div
              className={`${hValue} font-light transition-all bg-blue-300/25 px-4 capitalize rounded-bl-3xl rounded-br-3xl`}
              style={{paddingTop:paddingX}}
            >
              <p className="">
                {" "}
                sentence :{" "}
                <span className="text-green-500 font-semibold">{sentence}</span>
              </p>
              <p className="">
                {" "}
                exclamatory :{" "}
                <span className="text-green-500 font-semibold">
                  {totalExclamatory}
                </span>
              </p>
              <p className="">
                {" "}
                Qustion mark :{" "}
                <span className="text-green-500 font-semibold">
                  {totalQustionMark}
                </span>
              </p>
            </div>
          </div>
        </div>
        <div
          id="tools-con"
          style={{
            backgroundColor:
              styeleObj.backgroundColor === "white" ? "#7d6450" : "#1a181c",
          }}
          className="tools-bar w-auto h-[auto] px-[10px] pt-[5px] pb-[17px]  rounded-xl flex items-center justify-start gap-[4px] flex-col"
        >
          <h1 className="text-[5vmin] capitalize font-light border-b-[1px] mb-2 border-white/35 text-white border-solid leading-none w-full text-center">
            tools
          </h1>
          <ToolBtn styeleObj={styeleObj} func={makeUpar} text={"UPARCASE"} />
          <ToolBtn styeleObj={styeleObj} func={makeLow} text={"lowercase"} />
          <ToolBtn styeleObj={styeleObj} func={makeCap} text={"Capital"} />
          {/* <ToolBtn
            styeleObj={styeleObj}
            func={makeSenStructure}
            text={"SentenceStru"}
          /> */}
          <ToolBtn styeleObj={styeleObj} func={rmvSpace} text={"Rmv__Spaces"} />
          <ToolBtn styeleObj={styeleObj} func={getLink} text={"getLink"} />
          <ToolBtn styeleObj={styeleObj} func={getGmail} text={"getGmail"} />
          <ToolBtn styeleObj={styeleObj} func={getNumber} text={"getNum"} />
          <ToolBtn styeleObj={styeleObj} func={makeUndo} text={"Undo"} />
          <ToolBtn styeleObj={styeleObj} func={makeUndoAll} text={"UndoAll"} />
          <ToolBtn styeleObj={styeleObj} func={getCoppy} text={"Coppy"} />
          <ToolBtn styeleObj={styeleObj} func={makeClear} text={"clear"} />
        </div>
      </div>
    </div>
  );
};

export default Field;
