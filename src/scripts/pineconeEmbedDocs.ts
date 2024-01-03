import { getChunkedDocsFromPDF, getChunkedDocsFromPDFUser } from "@/lib/pdf-loader";
import { getPineconeClient } from "@/lib/pinecone-client";
import { embedAndStoreDocs, embedAndStoreDocsUser } from "@/lib/vector-store";
import { Pinecone } from "@pinecone-database/pinecone";

const pineconeClient = new Pinecone({
    apiKey: process.env.NEXT_PUBLIC_PINECONE_API_KEY!,
    environment: process.env.NEXT_PUBLIC_PINECONE_ENVIRONMENT!,
  });

  
// This operation might fail because indexes likely need
// more time to init, so give some 5 mins after index
// creation and try again.
// (async () => {
//   try {
//     // const pineconeClient = await getPineconeClient();
//     console.log("Preparing chunks from PDF file");
//     const docs = await getChunkedDocsFromPDF();
//     console.log(`Loading ${docs.length} chunks into pinecone...`);
//     await embedAndStoreDocs(pineconeClient, docs);
//     console.log("Data embedded and stored in pine-cone index");
//   } catch (error) {
//     console.error("Init client script failed ", error);
//   }
// })();

export async function embedDocs() {
    try {
        // const pineconeClient = await getPineconeClient();
      console.log("Preparing chunks from PDF file");
      const docs = await getChunkedDocsFromPDF();
      console.log(`Loading ${docs.length} chunks into pinecone...`);
      await embedAndStoreDocs(pineconeClient, docs);
      console.log("Data embedded and stored in pine-cone index");
    } catch (error) {
      console.error("Init client script failed ", error);
    }
  }

//User section
export async function embedDocsUser() {
  try {
    // const pineconeClient = await getPineconeClient();
    console.log("Preparing chunks from PDF file");
    const docs = await getChunkedDocsFromPDFUser();
    console.log(`Loading ${docs.length} chunks into pinecone...`);
    await embedAndStoreDocsUser(pineconeClient, docs);
    console.log("Data embedded and stored in pine-cone index");
  } catch (error) {
    console.error("Init client script failed ", error);
  }
}