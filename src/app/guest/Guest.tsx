"use client";
import React, { useEffect, useState } from "react";
import { guestPdfId } from "@/components/Hero";
import { Storage } from "appwrite";
import { appWriteclient } from "@/lib/AppwriteClient";
import { getPdfContent } from "./ProcessPdf";

const Guest = () => {
  const [file, setFile] = useState<Object | null>(null); // Add this line
  const [filename, setFilename] = useState("");
  const storage = new Storage(appWriteclient());

  useEffect(() => {
    const promise = storage.getFile(
      process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID!,
      guestPdfId
    );

    promise.then(
      function (response) {
        setFile(response);
        setFilename(response.name);
        // Success
      },
      function (error) {
        console.log(error); // Failure
      }
    );
  }, []);

  const logFile = () => console.log(filename);
  

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
         onClick={logFile}
        >
          Process Document
        </button>
      </div>
      guestPdfId: {guestPdfId}
    </div>
  );
};

export default Guest;
