import pdfIcon from "../assets/static/filetype-pdf.svg";
import saveIcon from "../assets/static/floppy.svg";
import highlightIcon from "../assets/static/marker-tip.svg";
import underlineIcon from "../assets/static/type-underline.svg";
import checkboxIcon from "../assets/static/check2-square.svg";
import textBoxIcon from "../assets/static/bounding-box-circles.svg";
import { useRef } from "react";

export default function TopMenu({ onPickFile, currentFileName }) {
  const fileInputRef = useRef(null);

  function triggerPick() {
    fileInputRef.current?.click();
  }

  function onFileChange(e) {
    const f = e.target.files?.[0];
    if (f && f.type === "application/pdf") {
      onPickFile?.(f);
    }
    e.target.value = "";
  }
  return (
    <div className="w-full h-[5vh] absolute top-0 grid grid-cols-3 items-center z-10">
      <div className="h-full ml-2 flex items-center justify-self-start">
        <img
          className="h-full p-1 opacity-80 hover:opacity-100 hover:cursor-pointer"
          src={saveIcon}
          alt="Save Icon"
        />
        <img
          onClick={triggerPick}
          className="h-full p-1 opacity-80 hover:opacity-100 hover:cursor-pointer"
          src={pdfIcon}
          alt="Open PDF"
          title="Open PDF"
        />
        <input
          ref={fileInputRef}
          type="file"
          accept="application/pdf"
          onChange={onFileChange}
          className="hidden"
        />
        {currentFileName && (
          <span className="text-[10px] text-gray-400 ml-1 max-w-[120px] truncate">
            {currentFileName}
          </span>
        )}
      </div>
      <div className="h-full flex items-center justify-self-center">
        <img
          className="h-full p-1 opacity-80 hover:opacity-100 hover:cursor-pointer"
          src={highlightIcon}
          alt="Highlight Icon"
        />
        <img
          className="h-full p-1 opacity-80 hover:opacity-100 hover:cursor-pointer"
          src={underlineIcon}
          alt="Underline Icon"
        />
        <img
          className="h-full p-1 opacity-80 hover:opacity-100 hover:cursor-pointer"
          src={checkboxIcon}
          alt="Checkbox Icon"
        />
        <img
          className="h-full p-1 opacity-80 hover:opacity-100 hover:cursor-pointer"
          src={textBoxIcon}
          alt="Text Box Icon"
        />
      </div>
    </div>
  );
}
