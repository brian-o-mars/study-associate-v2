import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { PineconeStore } from "langchain/vectorstores/pinecone";
import { Pinecone } from "@pinecone-database/pinecone";
import { guestPdfId } from "@/components/Hero";
import { userPdfId } from "@/app/userpage/HeroUser";

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
      //change this to guestPdfId for guest
      namespace: userPdfId,
      textKey: "text",
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
      //change this to guestPdfId for guest
      namespace: userPdfId,
      textKey: "text",
    });

    return vectorStore;
  } catch (error) {
    console.log("error ", error);
    throw new Error("Something went wrong while getting vector store !");
  }
}

//User section
export async function embedAndStoreDocsUser(
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
      namespace: userPdfId,
    });
  } catch (error) {
    console.log("error", error);
    throw new Error("Failed to embed and load PDFs to Pinecone");
  }
}

// Returns vector-store handle to be used a retrievers on langchains
export async function getVectorStoreUser(client: Pinecone) {
  try {
    const embeddings = new OpenAIEmbeddings({
      openAIApiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY!,
    });
    const index = client.Index(process.env.NEXT_PUBLIC_PINECONE_INDEX_NAME!);

    const vectorStore = await PineconeStore.fromExistingIndex(embeddings, {
      pineconeIndex: index,
      namespace: userPdfId,
    });

    return vectorStore;
  } catch (error) {
    console.log("error ", error);
    throw new Error("Something went wrong while getting vector store !");
  }
}
