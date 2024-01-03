"use client";
import { Inbox } from "lucide-react";
import React from "react";
import { useDropzone } from "react-dropzone";
import toast from "react-hot-toast";
import { ID, Storage } from "appwrite";
import { useRouter } from "next/navigation";
import { appWriteclient } from "@/lib/AppwriteClient";
import { v4 } from "uuid";
import { execSync } from "child_process";
import { embedDocs } from "@/scripts/pineconeEmbedDocs";

// export const guestPdfId = ID.unique();
export const guestPdfId = v4();

function Hero() {
  const [uploading, setUploading] = React.useState(false);
  const router = useRouter();

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
          guestPdfId,
          file
        );

        console.log("uploaded to appwrite");

        router.push("/guest");
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
        Elevate your study sessions – give your AI assistant a document to work
        on!
      </div>
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
    </div>
  );
}

export default Hero;
function uuidv4() {
  throw new Error("Function not implemented.");
}
