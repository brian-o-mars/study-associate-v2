import { ConversationalRetrievalQAChain } from "langchain/chains";
import { getVectorStore, getVectorStoreUser } from "./vector-store";
import { getPineconeClient } from "./pinecone-client";
import {
  StreamingTextResponse,
  experimental_StreamData,
  LangChainStream,
} from "ai";
import { streamingModel, nonStreamingModel } from "./llm";
import { STANDALONE_QUESTION_TEMPLATE, QA_TEMPLATE } from "./prompt-templates";
import { Pinecone } from "@pinecone-database/pinecone";

type callChainArgs = {
  question: string;
  chatHistory: string;
};

// const pineconeClient = new Pinecone({
//     apiKey: process.env.NEXT_PUBLIC_PINECONE_API_KEY!,
//     environment: process.env.NEXT_PUBLIC_PINECONE_ENVIRONMENT!,
//   });

export async function callChain({ question, chatHistory }: callChainArgs) {
    try {
      console.log("Starting callChain");
      // Open AI recommendation
      const sanitizedQuestion = question.trim().replaceAll("\n", " ");
      const pineconeClient = await getPineconeClient();
      const vectorStore = await getVectorStore(pineconeClient);
      const { stream, handlers } = LangChainStream();
      
      console.log("Pinecone client and vector store obtained successfully");
  
      const chain = ConversationalRetrievalQAChain.fromLLM(
        streamingModel,
        vectorStore.asRetriever(),
        {
          qaTemplate: QA_TEMPLATE,
          questionGeneratorTemplate: STANDALONE_QUESTION_TEMPLATE,
          returnSourceDocuments: true, //default 4
          questionGeneratorChainOptions: {
            llm: nonStreamingModel,
          },
         
        }
      );
  
      // Question using chat-history
      // Reference https://js.langchain.com/docs/modules/chains/popular/chat_vector_db#externally-managed-memory
      chain.call(
          {
            question: sanitizedQuestion,
            chat_history: chatHistory,
          },
          [handlers]
        );
  
      // Return the readable stream
      return new StreamingTextResponse(stream);
    } catch (e) {
      console.error("Error in callChain:", e);
      throw new Error("Call chain method failed to execute successfully!!");
    }
  }

//User section
// export async function callChainUser({ question, chatHistory }: callChainArgs) {
//   try {
//     // Open AI recommendation
//     const sanitizedQuestion = question.trim().replaceAll("\n", " ");
//   //   const pineconeClient = await getPineconeClient();
//     const vectorStore = await getVectorStoreUser(pineconeClient);
//     const { stream, handlers } = LangChainStream();
    

//     const chain = ConversationalRetrievalQAChain.fromLLM(
//       streamingModel,
//       vectorStore.asRetriever(),
//       {
//         qaTemplate: QA_TEMPLATE,
//         questionGeneratorTemplate: STANDALONE_QUESTION_TEMPLATE,
//         returnSourceDocuments: true, //default 4
//         questionGeneratorChainOptions: {
//           llm: nonStreamingModel,
//         },
       
//       }
//     );

//     // Question using chat-history
//     // Reference https://js.langchain.com/docs/modules/chains/popular/chat_vector_db#externally-managed-memory
//     chain
//       .call(
//         {
//           question: sanitizedQuestion,
//           chat_history: chatHistory,
//         },
//         [handlers]
//       );
//       // .then(async (res) => {
//       //   const sourceDocuments = res?.sourceDocuments;
//       //   const firstTwoDocuments = sourceDocuments.slice(0, 2);
//       //   const pageContents = firstTwoDocuments.map(
//       //     ({ pageContent }: { pageContent: string }) => pageContent
//       //   );
//       //   console.log("already appended ", data);
//       //   data.append({
//       //     sources: pageContents,
//       //   });
//       //   data.close();
//       // });

//     // Return the readable stream
//     return new StreamingTextResponse(stream);
//   } catch (e) {
//     console.error(e);
//     throw new Error("Call chain method failed to execute successfully!!");
//   }
// }