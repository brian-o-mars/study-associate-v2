"use client";
import React, { useEffect, useState } from "react";
import { guestPdfId } from "@/components/Hero";
import { Storage } from "appwrite";
import { appWriteclient } from "@/lib/AppwriteClient";
import { Document, Page, pdfjs } from "react-pdf";
import { WebPDFLoader } from "langchain/document_loaders/web/pdf";
// import { getPdfContent } from "./ProcessPdf";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
// import { indexDocs, llmResponse } from "@/lib/vectorStore";
import { Pinecone } from "@pinecone-database/pinecone";
import { ChainValues } from "langchain/schema";
import { PineconeStore } from "langchain/vectorstores/pinecone";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { OpenAI } from "langchain/llms/openai";
import { VectorDBQAChain } from "langchain/chains";
// import { Document } from "langchain/document";

// pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const Guest = () => {
  const [file, setFile] = useState<Object | null>(null); // Add this line
  const [filename, setFilename] = useState("");
  const [pdf, setPdf] = useState([] as any);
  const [textChunks, setTextChunks] = useState([] as any);
  const [summary, setSummary] = useState<ChainValues | null>(null);
  const [vectorStore, setVectorStore] = useState<PineconeStore>([] as any);


  //Initializing client variables
  const storage = new Storage(appWriteclient());
  const bucketId = process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID!;
  const fileId = guestPdfId;
  const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!;

  //initializing variables
const pinecone = new Pinecone({
  apiKey: process.env.NEXT_PUBLIC_PINECONE_API_KEY!,
  environment: process.env.NEXT_PUBLIC_PINECONE_ENVIRONMENT!,
});

 const pineconeIndex = pinecone.Index(
    process.env.NEXT_PUBLIC_PINECONE_INDEX_NAME!
  );
  
const embeddings = new OpenAIEmbeddings({
    openAIApiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY!,
  });
  
  const model = new OpenAI({
      openAIApiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY!,
  });

  const pdfUrl = `https://cloud.appwrite.io/v1/storage/buckets/${bucketId}/files/${fileId}/view?project=${projectId}&mode=admin`;

  //Load and split PDF functions
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

  // Load and split PDF from url
  useEffect(() => {
    const loadAndSplitPDF = async () => {
      const docs = await loadPDF(pdfUrl);
      const textChunks = await splitPdf(docs);
      setPdf(docs);
      setTextChunks(textChunks);
    };

    const fetchData = async () => {
      try {
        await indexDocs(textChunks);
        await loadVectorStore();
      } catch (error) {
        console.error("Failed to fetch data", error);
      }
    };

    loadAndSplitPDF();
    const timerId = setTimeout(() => {
      fetchData();
    }, 2000); // 3000 milliseconds = 3 seconds
  
    // Cleanup function to clear the timeout if the component unmounts
    return () => clearTimeout(timerId);
  }, [pdfUrl]);

//Send textchunks from the pdf to pinecone. Docs is in Guest.tsx
  const indexDocs = async (textChunks: any) => {
    try {
      await PineconeStore.fromDocuments(textChunks, embeddings, {
        pineconeIndex,
        namespace: guestPdfId
      });
      console.log("Indexed documents");
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  //Creates a vector store from the pinecone index
const loadVectorStore = async () => {
  await new Promise(resolve => setTimeout(resolve, 3000)); 

  try {
    const vectorStore = await PineconeStore.fromExistingIndex(embeddings, {
      pineconeIndex,
      namespace: guestPdfId
    });
    setVectorStore(vectorStore);
    console.log("Loaded vector store");
    return vectorStore;
  } catch (error) {
    console.error("Failed to load vector store", error);
    throw error;
  }
};

//Creates a qa chain from the vector store
const llmResponse = async (textChunks: any, query: string) => {
  try {
    // await indexDocs(textChunks);
    const vectorStore = await loadVectorStore();
    const chain = VectorDBQAChain.fromLLM(model, vectorStore, {
      k: 1
    });
    const llmResponse = await chain.call({ query: query });
    console.log("Chain completed");
    return llmResponse;
  } catch (error) {
    console.error("Failed to load chain", error);
    throw error;
  }
};

  

  const query = "Provide a summary of the text"
  
    // const fetchSummary = async () => {
    //   try {
    //     const result = await llmResponse(textChunks, query);
    //     setSummary(result.text);
    //   } catch (error) {
    //     console.error("Failed to fetch summary", error);
    //   }
    // };

    useEffect(() => {
      const getSummary = async () =>{ 
        try { const result = await llmResponse(textChunks, query);
          setSummary(result.text);
          if (summary) {
            console.log(summary);
          }
        } catch (error) {
          console.error("Failed to fetch data", error);
        }
      }
    
      const timerId = setTimeout(() => {
        getSummary();
      }, 3000); // 3000 milliseconds = 3 seconds
    
      // Cleanup function to clear the timeout if the component unmounts
      return () => clearTimeout(timerId);
    }, [textChunks, query]); // dependencies

    

    // useEffect(() => {
    //   const fetchSummary = async () => {
    //     try {
    //       const result = await llmResponse(textChunks, query);
    //       setSummary(result.text);
    //     } catch (error) {
    //       console.error("Failed to fetch summary", error);
    //     }
    //   };
    //   fetchSummary();
    //   // const timerId1 = setTimeout(() => {
    //   //   fetchSummary();
    //   // }, 3000); // 3000 milliseconds = 3 seconds
    
    //   // // Cleanup function to clear the timeouts if the component unmounts
    //   // return () => {
    //   //   clearTimeout(timerId1);
    //   // };
    // }, [textChunks, query]); // dependencies

    const logSummary = () => {
      // getSummary();
      console.log(summary);
    }

    // const timerId = setTimeout(() => {
    //   fetchSummary();
    // }, 2000); // 2000 milliseconds = 2 seconds
  
    // // Cleanup function to clear the timeout if the component unmounts
    // return () => clearTimeout(timerId);
  
  //  const llmSummary = llmResponse(textChunks)




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
          onClick={() => logSummary()}
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
