import React from "react";
import { Storage } from "appwrite";
import { appWriteclient } from "@/lib/AppwriteClient";
import { guestPdfId } from "@/components/Hero";

const storage = new Storage(appWriteclient());

const file = storage.getFile(
  process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID!,
  guestPdfId
);

const GetPdf = () => {
  return <div>GetPdf</div>;
};

export default GetPdf;
