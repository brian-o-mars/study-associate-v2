import { userPdfId } from "@/app/userpage/HeroUser";
import { guestPdfId } from "@/components/Hero";
import { WebPDFLoader } from "langchain/document_loaders/web/pdf";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";

const bucketId = process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID!;
const fileId = guestPdfId;
const userFileId = userPdfId
const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!;
const pdfUrl = `https://cloud.appwrite.io/v1/storage/buckets/${bucketId}/files/${fileId}/view?project=${projectId}&mode=admin`;
const userpdfUrl = `https://cloud.appwrite.io/v1/storage/buckets/${bucketId}/files/${userFileId}/view?project=${projectId}&mode=admin`;

//Guest section
export async function getChunkedDocsFromPDF() {
  try {
    const url = pdfUrl;
    const response = await fetch(url);
    const data = await response.blob();
    const loader = new WebPDFLoader(data);
    const docs = await loader.load();

    const textSplitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000,
      chunkOverlap: 200,
    });

    const chunkedDocs = textSplitter.splitDocuments(docs);

    return chunkedDocs;

  } catch (error) {
    console.log(error);
    throw new Error("Failed to load and chunk PDF");
  }
}

//User section

export async function getChunkedDocsFromPDFUser() {
  try {
    const url = userpdfUrl;
    const response = await fetch(url);
    const data = await response.blob();
    const loader = new WebPDFLoader(data);
    const docs = await loader.load();

    const textSplitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000,
      chunkOverlap: 200,
    });

    const chunkedDocs = textSplitter.splitDocuments(docs);

    return chunkedDocs;

  } catch (error) {
    console.log(error);
    throw new Error("Failed to load and chunk PDF");
  }
}
