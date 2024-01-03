"use client";
import React, { use, useEffect, useRef, useState } from "react";
import { guestPdfId } from "@/components/Hero";
import { embedDocs } from "@/scripts/pineconeEmbedDocs";
import toast from "react-hot-toast";
// import { useRouter } from "next/router";
import { Storage } from "appwrite";
import { appWriteclient } from "@/lib/AppwriteClient";
import { useDropzone } from "react-dropzone";
import { Inbox } from "lucide-react";
import { useRouter } from "next/navigation";
import { v4 } from "uuid";

type ButtonState = "usersum" | "userchat" | "userpicsum" | null;

export const userPdfId = v4();

const bucketId = process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID!;
export const fileId = userPdfId;
const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!;
export const pdfUrl = `https://cloud.appwrite.io/v1/storage/buckets/${bucketId}/files/${fileId}/view?project=${projectId}&mode=admin`;


const HeroUser = () => {
  const [activeButton, setActiveButton] = useState<ButtonState>(null);
  const [uploading, setUploading] = React.useState(false);
  const router = useRouter();

  const baseButtonStyle = "rounded-full text-[#dfeff4] font-bold py-2 px-3";
  const activeButtonStyle = "bg-[#202942] ";
  const inactiveButtonStyle = "bg-opacity-50 bg-[#202942] hover:bg-[#3a435e]";

 
  

  const storage = new Storage(appWriteclient());

  const { getRootProps, getInputProps } = useDropzone({
    accept: { "application/pdf": [".pdf"] },
    maxFiles: 1,
    onDrop: async (acceptedFiles) => {
      console.log(acceptedFiles);
      const file = acceptedFiles[0];
      if (!file) {
        toast.error("No file selected!");
        return;
      } else if (file.size > 10 * 1024 * 1024) {
        toast.error("File too large!");
        return;
      }

      try {
        setUploading(true);
        if (uploading) {
          toast.loading("Uploading...");
        }

        await storage.createFile(
          process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID!,
          userPdfId,
          file
        );

        
        console.log("uploaded to appwrite");

        router.push(`/${activeButton}`);
      } catch (error) {
        toast.error("Upload failed!");
        console.log(error);
      } finally {
        setUploading(false);
        toast.success("Upload successful!");
      }
    },
  });

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div className="text-[#202942] font-bold text-xl md:text-[30px] text-center my-5">
        Select an option and upload your document to start your study session
      </div>
      <div>
        <ul className="flex flex-col space-y-3 md:flex-row md:space-x-10 md:space-y-0 justify-between items-center">
          <li>
            <button
              onClick={() => setActiveButton("usersum")}
              className={`${baseButtonStyle} ${
                activeButton === "usersum"
                  ? activeButtonStyle
                  : inactiveButtonStyle
              }`}
            >
              Summarization
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveButton("userchat")}
              className={`${baseButtonStyle} ${
                activeButton === "userchat"
                  ? activeButtonStyle
                  : inactiveButtonStyle
              }`}
            >
              Chat with document
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveButton("userpicsum")}
              className={`${baseButtonStyle} ${
                activeButton === "userpicsum"
                  ? activeButtonStyle
                  : inactiveButtonStyle
              }`}
            >
              Pitographic summary
            </button>
          </li>
        </ul>
      </div>

      {activeButton === null ? (
        <div
        className=
              "md:py-10 md:px-20 py-5 px-10 mt-3 border-dashed border-2 rounded-xl cursor-pointer bg-gray-50 flex justify-center items-center flex-col"
      >
        <input {...getInputProps()} />
        <>
          <Inbox className="md:w-20 md:h-20 w-10 h-10 m-5 text-blue-400" />
          <p className="mt-2 text-sm text-center text-slate-400">
            <span className="font-semibold">Select an option above</span> <br /> before you upload your file
          </p>
        </>
      </div>
      ) : (
        <div
          {...getRootProps({
            className:
              "md:py-10 md:px-20 py-5 px-10 mt-3 border-dashed border-2 rounded-xl cursor-pointer bg-gray-50 flex justify-center items-center flex-col",
          })}
        >
          <input {...getInputProps()} />
          <>
            <Inbox className="md:w-20 md:h-20 w-10 h-10 m-5 text-blue-400" />
            <p className="mt-2 text-sm text-center text-slate-400">
              <span className="font-semibold">Click to upload</span> or drag and
              drop
            </p>
          </>
        </div>
      )}

      {/* <div
        {...getRootProps({
          className:
            "md:py-10 md:px-20 py-5 px-10 mt-3 border-dashed border-2 rounded-xl cursor-pointer bg-gray-50 flex justify-center items-center flex-col",
        })}
      >
        <input {...getInputProps()}
         />
        <>
          <Inbox className="md:w-20 md:h-20 w-10 h-10 m-5 text-blue-400" />
          <p className="mt-2 text-sm text-center text-slate-400">
            <span className="font-semibold">Click to upload</span> or drag and
            drop
          </p>
        </>
      </div> */}
      <button onClick={() => setActiveButton(null)}>ssss</button>
    </div>
  );
};

export default HeroUser;
