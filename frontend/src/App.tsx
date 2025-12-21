import { useEffect, useRef, useState } from "react";
import "./App.css";
import ChatHeader from "./components/ChatHeader";
import MessageList from "./components/MessageList";
import MessageInput from "./components/MessageInput";

interface Message {
  id: number;
  text: string;
  sender: "me" | "other";
}

function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [roomId, setRoomId] = useState("");
  const [currentRoom, setCurrentRoom] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    if (!currentRoom) return;

    const ws = new WebSocket("ws://localhost:8080");
    wsRef.current = ws;

    ws.onopen = () => {
      console.log("WebSocket connected");
      ws.send(
        JSON.stringify({ type: "join", payload: { roomId: currentRoom } })
      );
      setIsConnected(true);
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === "chat") {
        const newMessage: Message = {
          id: Date.now(),
          text: data.message,
          sender: "other",
        };
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      }
    };

    ws.onclose = () => {
      console.log("WebSocket disconnected");
      setIsConnected(false);
    };

    return () => {
      ws.close();
    };
  }, [currentRoom]);

  const handleJoinRoom = (e: React.FormEvent) => {
    e.preventDefault();
    if (roomId.trim()) {
      setCurrentRoom(roomId.trim());
      setMessages([]);
    }
  };

  const handleSendMessage = (message: string) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(
        JSON.stringify({
          type: "chat",
          payload: { message },
        })
      );
      const newMessage: Message = {
        id: Date.now(),
        text: message,
        sender: "me",
      };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    }
  };

  if (!currentRoom) {
    return (
      <div className="h-screen bg-black flex items-center justify-center text-white">
        <div className="bg-gray-900 p-8 rounded-lg shadow-lg w-96">
          <h1 className="text-2xl font-bold mb-6 text-center">
            Join Chat Room
          </h1>
          <form onSubmit={handleJoinRoom}>
            <input
              type="text"
              value={roomId}
              onChange={(e) => setRoomId(e.target.value)}
              placeholder="Enter room name..."
              className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 mb-4"
              autoFocus
            />
            <button
              type="submit"
              className="w-full px-4 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:bg-gray-600"
              disabled={!roomId.trim()}
            >
              Join Room
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-black flex flex-col text-white font-sans">
      <ChatHeader roomName={currentRoom} isConnected={isConnected} />
      <MessageList messages={messages} />
      <MessageInput onSendMessage={handleSendMessage} />
    </div>
  );
}

export default App;
