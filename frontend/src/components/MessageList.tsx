interface Message {
  id: number;
  text: string;
  sender: "me" | "other";
}

interface MessageListProps {
  messages: Message[];
}

const MessageList = ({ messages }: MessageListProps) => {
  return (
    <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3 bg-black">
      {messages.length === 0 ? (
        <div className="text-center text-gray-500 mt-8">
          No messages yet. Start the conversation!
        </div>
      ) : (
        messages.map((message) => (
          <div
            key={message.id}
            className={`max-w-[70%] ${
              message.sender === "me" ? "ml-auto bg-blue-700" : "bg-gray-800"
            } px-4 py-2 rounded-lg`}
          >
            {message.text}
          </div>
        ))
      )}
    </div>
  );
};

export default MessageList;
