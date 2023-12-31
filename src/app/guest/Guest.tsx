"use client";
import React, { useEffect, useState } from "react";
import { guestPdfId } from "@/components/Hero";
import { Storage } from "appwrite";
import { appWriteclient } from "@/lib/AppwriteClient";
import { Document, Page, pdfjs } from "react-pdf";
import { WebPDFLoader } from "langchain/document_loaders/web/pdf";
// import { getPdfContent } from "./ProcessPdf";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
// import { Document } from "langchain/document";

// pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const Guest = () => {
  const [file, setFile] = useState<Object | null>(null); // Add this line
  const [filename, setFilename] = useState("");
  const [pdf, setPdf] = useState([] as any);
  const [textChunks, setTextChunks] = useState([] as any);
  const storage = new Storage(appWriteclient());

  const bucketId = process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID!;
  const fileId = guestPdfId;
  const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!;

  const pdfUrl = `https://cloud.appwrite.io/v1/storage/buckets/${bucketId}/files/${fileId}/view?project=${projectId}&mode=admin`;

  async function loadPDF(url: string | URL | Request) {
    const response = await fetch(url);
    const data = await response.blob();
    const loader = new WebPDFLoader(data);
    const docs = await loader.load();
    console.log({ docs });
    return docs;
  }

  async function splitPdf(pdf: any) {
    const textSplitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000,
      chunkOverlap: 200,
    });
    const textChunks = textSplitter.splitDocuments(pdf);
    console.log({ textChunks });
    return textChunks;
  }



  useEffect(() => {
    const loadAndSplitPDF = async () => {
      const docs = await loadPDF(pdfUrl);
      const textChunks = await splitPdf(docs);
      setPdf(docs);
      setTextChunks(textChunks);
    };

    loadAndSplitPDF();
  }, [pdfUrl]);

  // const textSplitter = new RecursiveCharacterTextSplitter({
  //   chunkSize: 1000,
  //   chunkOverlap: 200,
  // });
  // const textChunks = textSplitter.splitDocuments(pdf);
  

  return (
    <div className="flex items-center justify-center flex-col">
      <div className=" text-[#202942] mb-4 text-4xl md:text-5xl tracking-tight font-extrabold">
        Welcome Guest
      </div>
      <div className=" text-[#202942]  my-4 text-center text-xl md:text-2xl tracking-tight font-extrabold">
        You&apos;ve uploaded a PDF called {filename}
      </div>
      <div>
        <button
          className="rounded-full bg-[#202942] text-[#dfeff4] 
           hover:bg-[#3a435e]
         font-bold text-sm md:text-base py-2 px-3"
          onClick={() => console.log(textChunks.length)}
        >
          Process Document
        </button>
        <Document file={pdfUrl}>
          <Page pageNumber={1} />
        </Document>
      </div>
      guestPdfId: {guestPdfId}
    </div>
  );
};

export default Guest;
