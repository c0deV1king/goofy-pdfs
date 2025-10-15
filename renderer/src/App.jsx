import TopMenu from "./components/TopMenu";
import PDFCanvas from "./components/PDFCanvas";

export default function App() {
  return (
    <div className="h-screen grid place-items-center bg-slate-800">
      <div className="text-center">
        <PDFCanvas />
        <p className="opacity-80 mt-2 text-white text-xs absolute bottom-1 right-1">
          <span className="text-yellow-600 font-bold">GoofyPDFs</span> by
          c0dev1king
        </p>
      </div>
    </div>
  );
}
