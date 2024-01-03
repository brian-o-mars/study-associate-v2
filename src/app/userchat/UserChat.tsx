"use client";
import React, { useEffect, useRef } from "react";
import { fileId, pdfUrl, userPdfId } from "../userpage/HeroUser";
import { Chat } from "./Chat";
import { embedDocsUser } from "@/scripts/pineconeEmbedDocs";
// import Chatview from "./Chatview";

function Userchat() {
  //   const bucketId = process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID!;
  //   const fileId = userPdfId.toString();
  //   const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!;
  //   const pdfUrl = `https://cloud.appwrite.io/v1/storage/buckets/${bucketId}/files/${fileId}/view?project=${projectId}&mode=admin`;
  const hasRun = useRef(false);

  //embedDocs is from pineconeEmbedDocs.tsx.
  // getChunkedDocsFromPDF from pdf-loader and embedAndStoreDocs
  // from vector-store are passed to embedDocs in pineconeEmbedDocs.tsx.
  useEffect(() => {
    if (!hasRun.current) {
      const embedData = async () => {
        await embedDocsUser();
      };
      embedData();
      hasRun.current = true;
    }
  }, []);

  return (
    <div className="flex flex-col md:flex-row space-x-4 h-[88vh] w-[95%] mx-auto ">
      <div className="flex-1">
        <iframe src={pdfUrl} className="w-full h-full rounded-lg"></iframe>
      </div>
      <div className="flex-1">
        <Chat />
      </div>
    </div>
  );
}

export default Userchat;
