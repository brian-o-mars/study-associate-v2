import { Pinecone } from "@pinecone-database/pinecone";
import { delay } from "./utils";

let pineconeClientInstance: Pinecone | null = null;

// Create pineconeIndex if it doesn't exist
async function createIndex(client: Pinecone, indexName: string) {
  try {
    await client.createIndex({
      name: indexName,
      dimension: 1536,
      metric: "cosine",
    });
    console.log(
      `Waiting for ${process.env.INDEX_INIT_TIMEOUT} seconds for index initialization to complete...`
    );
    await delay(Number(process.env.INDEX_INIT_TIMEOUT));
    console.log("Index created !!");
  } catch (error) {
    console.error("error ", error);
    throw new Error("Index creation failed");
  }
}

// Initialize index and ready to be accessed.
async function initPineconeClient() {
  try {
    const pinecone = new Pinecone({
      apiKey: process.env.NEXT_PUBLIC_PINECONE_API_KEY!,
      environment: process.env.NEXT_PUBLIC_PINECONE_ENVIRONMENT!,
    });
    
    // await pineconeClient.init({
    //   apiKey: env.PINECONE_API_KEY,
    //   environment: env.PINECONE_ENVIRONMENT,
    // });
    const indexName: any = process.env.NEXT_PUBLIC_PINECONE_INDEX_NAME;

    const existingIndexes = await pinecone.listIndexes();
    console.log("existingIndexes", existingIndexes);

    if (!existingIndexes.includes(indexName)) {
        createIndex(pinecone, indexName);
    } else {
      console.log("Your index already exists. nice !!");
    }
    // const pineconeClient = pinecone.Index(indexName)
    console.log('Client initialized')
    return pinecone;
  } catch (error) {
    console.error("error", error);
    throw new Error("Failed to initialize Pinecone Client");
  }
}

export async function getPineconeClient() {
  if (!pineconeClientInstance) {
    pineconeClientInstance = await initPineconeClient();
  }

  return pineconeClientInstance;
}
