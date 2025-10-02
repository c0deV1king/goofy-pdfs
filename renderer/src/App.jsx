import TopMenu from "./components/TopMenu";
import PDFCanvas from "./components/PDFCanvas";

export default function App() {
  return (
    <div className="h-screen grid place-items-center bg-slate-900">
      <div className="text-center">
        <PDFCanvas />
        <p className="opacity-80 mt-2 text-white text-xs absolute bottom-1 right-1">
          GoofyPDFs by c0dev1king
        </p>
      </div>
    </div>
  );
}
