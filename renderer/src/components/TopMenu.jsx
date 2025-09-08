import pdfIcon from "../assets/static/filetype-pdf.svg";
import saveIcon from "../assets/static/floppy.svg";
import highlightIcon from "../assets/static/marker-tip.svg";
import underlineIcon from "../assets/static/type-underline.svg";
import checkboxIcon from "../assets/static/check2-square.svg";
import textBoxIcon from "../assets/static/bounding-box-circles.svg";

export default function TopMenu() {
  return (
    <div className="w-full h-[5vh] absolute top-0 grid grid-cols-3 items-center z-10">
      <div className="h-full ml-2 flex items-center justify-self-start">
        <img
          className="h-full p-1 opacity-80 hover:opacity-100 hover:cursor-pointer"
          src={saveIcon}
          alt="App Icon"
        />
        <img
          className="h-full p-1 opacity-80 hover:opacity-100 hover:cursor-pointer"
          src={pdfIcon}
          alt="App Icon"
        />
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
