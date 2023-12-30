"use client";
import React, { useEffect } from "react";
import { WebPDFLoader } from "langchain/document_loaders/web/pdf";
import { guestPdfId } from "@/components/Hero";



const bucketId = process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID!;
const fileId = guestPdfId;
const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!;

const pdfUrl = `https://cloud.appwrite.io/v1/storage/buckets/${bucketId}/files/${fileId}/view?project=${projectId}&mode=admin`;

// async function downloadPdf(url: string) {
//   const response = await fetch(url);

//   if (
//     response.ok &&
//     response.headers.get("Content-Type")?.includes("application/pdf")
//   ) {
//     // return await response.buffer();
//     console.log("response");
//   } else {
//     console.log(`Failed to download the PDF. Status code: ${response.status}`);
//     return null;
//   }
// }

async function downloadPDF(url: string) {
    // try {
    //   const response = await fetch(url);
  
    //   // Check if the response is successful and is a PDF
    //   if (response.ok && response.headers.get('content-type') === 'application/pdf') {
    //     const pdfContent = await response.buffer();
    //     return pdfContent;
    //     // console.log("response");
    //   } else {
    //     console.error(`Failed to download the PDF. Status code: ${response.status}`);
    //     return null;
    //   }
    // } catch (error) {
    //   console.error('Error downloading PDF:', error);
    //   return null;
    // }
  }

export async function getPdfContent() {
  const pdfContent = await downloadPDF(pdfUrl);
  return pdfContent;
}

const ProcessPdf = () => {
//   useEffect(() => {
//     getPdfContent();
//   }, []);
  return <div></div>;
};

export default ProcessPdf;
