import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";

import workerSrc from "pdfjs-dist/build/pdf.worker.min.mjs?url";
pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;

import pdfExampleUrl from "../assets/pdfs/PDFExample-2.pdf";

// <h1 className="text-sm text-white">
// Import or drag-and-drop a pdf file to get started
//</h1>
// include when ready. set to default when no pdf is loaded.

export default function PDFCanvas() {
  const [numPages, setNumPages] = useState();
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
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

  return (
    <>
      <div className="w-full h-full border border-gray-300 mt-[5vh]">
        <Document file={pdfExampleUrl} onLoadSuccess={onDocumentLoadSuccess}>
          <Page
            pageNumber={pageNumber}
            renderTextLayer="false"
            renderAnnotationLayer="false"
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
      </div>
      <p className="text-red-400 text-sm font-bold text-center mt-1 z-10 absolute bottom-8 right-8">
        Page {pageNumber} of {numPages}
      </p>
    </>
  );
}
