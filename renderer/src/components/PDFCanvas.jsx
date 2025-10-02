import { useState, useCallback } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import TopMenu from "./TopMenu";

import workerSrc from "pdfjs-dist/build/pdf.worker.min.mjs?url";
pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;

import pdfExampleUrl from "../assets/pdfs/PDFExample-2.pdf";

// <h1 className="text-sm text-white">
// Import or drag-and-drop a pdf file to get started
//</h1>
// include when ready. set to default when no pdf is loaded.

export default function PDFCanvas() {
  const [file, setFile] = useState(null);
  const [numPages, setNumPages] = useState();
  const [pageNumber, setPageNumber] = useState(1);
  const [error, setError] = useState(null);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setError(null);
  }

  function onDocumentLoadError(err) {
    setError(err?.message || "Failed to load PDF");
  }

  function handlePickedFile(f) {
    setFile(f);
    setPageNumber(1);
    setNumPages(undefined);
    setError(null);
  }

  function changePage(offset) {
    setPageNumber((prevPageNumber) => prevPageNumber + offset);
  }

  function previousPage() {
    changePage(-1);
  }

  function nextPage() {
    changePage(1);
  }

  function onFileChange(e) {
    const f = e.target.files?.[0];
    if (f) {
      setFile(f);
      setPageNumber(1);
      setNumPages(undefined);
    }
  }

  // Drag & drop
  const onDrop = useCallback((e) => {
    e.preventDefault();
    const f = e.dataTransfer.files?.[0];
    if (f && f.type === "application/pdf") {
      setFile(f);
      setPageNumber(1);
      setNumPages(undefined);
      setError(null);
    }
  }, []);

  const onDragOver = (e) => e.preventDefault();

  return (
    <>
      <div className="h-screen grid place-items-center bg-slate-900">
        <TopMenu onPickFile={handlePickedFile} currentFileName={file?.name} />
      </div>
      <div className="w-full h-full flex flex-col items-center">
        <div
          className="relative w-full h-full border border-gray-300 mt-[2vh] flex items-center justify-center"
          onDrop={onDrop}
          onDragOver={onDragOver}
        >
          <Document
            file={file || pdfExampleUrl}
            onLoadSuccess={onDocumentLoadSuccess}
            onLoadError={onDocumentLoadError}
            loading={<p className="text-sm text-gray-500">Loading...</p>}
          >
            <Page
              pageNumber={pageNumber}
              renderTextLayer={false}
              renderAnnotationLayer={false}
            />
          </Document>

          <button
            type="button"
            disabled={pageNumber <= 1}
            onClick={previousPage}
            className="absolute top-1/2 left-2 bg-slate-700 text-white px-2 py-1 rounded opacity-70 hover:opacity-100 disabled:opacity-30 disabled:cursor-not-allowed z-10"
          >
            Previous
          </button>
          <button
            type="button"
            disabled={pageNumber >= numPages}
            onClick={nextPage}
            className="absolute top-1/2 right-2 bg-slate-700 text-white px-2 py-1 rounded opacity-70 hover:opacity-100 disabled:opacity-30 disabled:cursor-not-allowed z-10"
          >
            Next
          </button>

          {!file && (
            <div className="absolute top-2 left-2 text-[10px] text-gray-400 bg-black/40 px-2 py-1 rounded">
              Drag & drop a PDF here
            </div>
          )}
        </div>
        <p className="text-red-400 text-sm font-bold text-center mt-1">
          {numPages
            ? `Page ${pageNumber} of ${numPages}`
            : "No document loaded"}
        </p>
        {error && <p className="text-xs text-rose-500">{error}</p>}
      </div>
    </>
  );
}
