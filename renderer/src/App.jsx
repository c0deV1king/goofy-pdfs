import TopMenu from "./components/TopMenu";

export default function App() {
  return (
    <div className="h-screen grid place-items-center bg-slate-900">
      <TopMenu />
      <div className="text-center">
        <p className="opacity-80 mt-2 text-white text-xs absolute bottom-1 right-1">
          GoofyPDFs by c0dev1king
        </p>
      </div>
    </div>
  );
}
