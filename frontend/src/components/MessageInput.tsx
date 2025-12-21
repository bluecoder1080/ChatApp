import { useState, useRef } from "react";

interface MessageInputProps {
  onSendMessage: (message: string) => void;
  onTyping: (isTyping: boolean) => void;
}

const MessageInput = ({ onSendMessage, onTyping }: MessageInputProps) => {
  const [inputValue, setInputValue] = useState("");
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleSend = () => {
    if (inputValue.trim()) {
      onSendMessage(inputValue);
      setInputValue("");
      onTyping(false);
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    onTyping(true);
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    typingTimeoutRef.current = setTimeout(() => {
      onTyping(false);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <div className="border-t border-gray-800 bg-black px-4 py-3">
      <div className="flex items-center gap-3 bg-gray-900 rounded-lg px-4 py-2">
        <input
          type="text"
          value={inputValue}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
          placeholder="Type a message..."
          className="flex-1 bg-transparent text-white placeholder-gray-500 focus:outline-none"
        />
        <button
          onClick={handleSend}
          className="px-5 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 disabled:bg-gray-600"
          disabled={!inputValue.trim()}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default MessageInput;
