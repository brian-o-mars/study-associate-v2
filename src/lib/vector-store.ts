import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { PineconeStore } from "langchain/vectorstores/pinecone";
import { Pinecone } from "@pinecone-database/pinecone";
import { guestPdfId } from "@/components/Hero";

export async function embedAndStoreDocs(
  client: Pinecone,
  //@ts-ignore docs type error
  docs: Document<Record<string, any>>[]
) {
  try {
    const embeddings = new OpenAIEmbeddings({
      openAIApiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY!,
    });
    const index = client.Index(process.env.NEXT_PUBLIC_PINECONE_INDEX_NAME!);
    
    //embed PDFs and store in Pinecone
    await PineconeStore.fromDocuments(docs, embeddings, {
      pineconeIndex: index,
      namespace: guestPdfId,
    });
    
  } catch (error) {
    console.log("error", error);
    throw new Error("Failed to embed and load PDFs to Pinecone");
  }
}

// Returns vector-store handle to be used a retrievers on langchains
export async function getVectorStore(client: Pinecone) {
    try {
        const embeddings = new OpenAIEmbeddings({
            openAIApiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY!,
          });
      const index = client.Index(process.env.NEXT_PUBLIC_PINECONE_INDEX_NAME!);
  
      const vectorStore = await PineconeStore.fromExistingIndex(embeddings, {
        pineconeIndex: index,
        namespace: guestPdfId,
      });
  
      return vectorStore;
    } catch (error) {
      console.log("error ", error);
      throw new Error("Something went wrong while getting vector store !");
    }
  }
