import { Pinecone } from "@pinecone-database/pinecone";
import { VectorDBQAChain } from "langchain/chains";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { OpenAI } from "langchain/llms/openai";
import { PineconeStore } from "langchain/vectorstores/pinecone";

//initializing variables
const pinecone = new Pinecone({
  apiKey: process.env.NEXT_PUBLIC_PINECONE_API_KEY!,
  environment: process.env.NEXT_PUBLIC_PINECONE_ENVIRONMENT!,
});

export const pineconeIndex = pinecone.Index(
  process.env.NEXT_PUBLIC_PINECONE_INDEX_NAME!
);

export const embeddings = new OpenAIEmbeddings({
  openAIApiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY!,
});

const model = new OpenAI({
    openAIApiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY!,
});

//Send textchunks from the pdf to pinecone. Docs is in Guest.tsx
export const indexDocs = async (textChunks: any) => {
  try {
    await PineconeStore.fromDocuments(textChunks, embeddings, {
      pineconeIndex,
    });
    console.log("Indexed documents");
  } catch (error) {
    console.log(error);
    throw error;
  }
};

//Creates a vector store from the pinecone index
export const loadVectorStore = async () => {
    try {
      const vectorStore = await PineconeStore.fromExistingIndex(embeddings, {
        pineconeIndex,
      });
      console.log("Loaded vector store");
      return vectorStore;
    } catch (error) {
      console.error("Failed to load vector store", error);
      throw error;
    }
  };

//Creates a qa chain from the vector store
  export const llmResponse = async (textChunks: any, query: string) => {
    try {
      await indexDocs(textChunks);
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


// export const vectorStore = new PineconeStore(pineconeIndex, embeddings);
