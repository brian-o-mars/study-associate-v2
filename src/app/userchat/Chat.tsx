'use client'
import { ChatBubble } from "./chat-bubble";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { initialMessages } from "@/lib/utils";
import { Message } from "ai/react";
import { useChat } from "ai/react";

export function Chat() {
  // const messages: Message[] = [
  //   { role: "assistant", content: "Hello, how can I help you today?", id: "1" },
  //   { role: "user", content: "I need help with my account", id: "2" },
  // ];
  // const sources = ["I'm source one", "I'm source two"];
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    initialMessages,
  });

  return (
    <div className="rounded-2xl border h-[75vh] flex flex-col justify-between">
      <div className="p-6 overflow-auto">
        {messages.map(({ id, role, content }: Message, index) => (
          <ChatBubble
            key={id}
            role={role}
            content={content}
            // Start from the third message of the assistant
            sources={[]}
          />
        ))}
      </div>

      <form onSubmit={handleSubmit} className="p-4 flex clear-both">
        <Input
          placeholder={"Type to chat with AI..."}
          value={input}
          onChange={handleInputChange}
          className="mr-2"
        />

        <Button type="submit" className="w-24">
        {isLoading ? <Spinner /> : "Ask"}
        </Button>
      </form>
    </div>
  );
}
