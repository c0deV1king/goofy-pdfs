import { useState, useCallback } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import TopMenu from "./TopMenu";

import workerSrc from "pdfjs-dist/build/pdf.worker.min.mjs?url";
pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;

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
    setNumPages(undefined);
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
      <div className="absolute top-0 left-0 w-full h-full flex flex-col">
        <div className="h-screen grid place-items-center bg-slate-900">
          <TopMenu onPickFile={handlePickedFile} currentFileName={file?.name} />
        </div>
        <div className="w-full h-full flex flex-col items-center">
          <div
            className="relative w-full h-full flex items-center justify-center"
            onDrop={onDrop}
            onDragOver={onDragOver}
          >
            <Document
              file={file}
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

            {Boolean(numPages) && pageNumber > 1 && (
              <button
                type="button"
                onClick={previousPage}
                className="absolute top-1/2 left-2 bg-slate-700 text-white px-2 py-1 rounded opacity-70 hover:opacity-100 disabled:opacity-30 disabled:cursor-not-allowed z-10"
              >
                Previous
              </button>
            )}

            {Boolean(numPages) && pageNumber > 1 && (
              <button
                type="button"
                onClick={previousPage}
                className="absolute top-1/2 left-2 bg-slate-700 text-white px-2 py-1 rounded opacity-70 hover:opacity-100 z-10"
              >
                Previous
              </button>
            )}

            {Boolean(numPages) && pageNumber < numPages && (
              <button
                type="button"
                onClick={nextPage}
                className="absolute top-1/2 right-2 bg-slate-700 text-white px-2 py-1 rounded opacity-70 hover:opacity-100 z-10"
              >
                Next
              </button>
            )}

            {!file && (
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col pointer-events-none select-none">
                <h1 className="text-sm text-white">
                  Import or drag-and-drop a pdf file to get started
                </h1>
              </div>
            )}
          </div>
          <p className="text-yellow-600 text-sm font-bold text-center mt-1">
            {numPages
              ? `Page ${pageNumber} of ${numPages}`
              : "No document loaded"}
          </p>
          {error && <p className="text-xs text-rose-500">{error}</p>}
        </div>
      </div>
    </>
  );
}
