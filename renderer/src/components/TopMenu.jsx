import pdfIcon from "../assets/static/filetype-pdf.svg";
import saveIcon from "../assets/static/floppy.svg";

export default function TopMenu() {
  return (
    <div className="w-full h-[5vh] absolute top-0">
      <div className="h-full ml-2 flex justify-start">
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
    </div>
  );
}
