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
  const [userCount, setUserCount] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    if (!currentRoom) return;

    const WS_URL =
      (import.meta as any).env?.VITE_WS_URL ||
      "wss://chatapp-backend-l53l.onrender.com/";
    const ws = new WebSocket(WS_URL);
    wsRef.current = ws;

    ws.onopen = () => {
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
      if (data.type === "userCount") {
        setUserCount(data.count);
      }
      if (data.type === "typing") {
        setIsTyping(data.isTyping);
      }
    };

    ws.onclose = () => {
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

  const handleTyping = (isTyping: boolean) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(
        JSON.stringify({
          type: "typing",
          payload: { isTyping },
        })
      );
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
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-blue-900 flex items-center justify-center text-white px-4">
        <div className="max-w-4xl w-full">
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent animate-slide-down">
              Live Chat
            </h1>
            <p className="text-xl text-gray-400 animate-slide-up">
              Connect instantly with anyone, anywhere
            </p>
          </div>

          <div className="bg-gray-900/50 backdrop-blur-lg p-8 rounded-2xl shadow-2xl border border-gray-800 animate-scale-in">
            <form onSubmit={handleJoinRoom} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Enter Room Name
                </label>
                <input
                  type="text"
                  value={roomId}
                  onChange={(e) => setRoomId(e.target.value)}
                  placeholder="e.g., general, team-alpha, friends..."
                  className="w-full px-4 py-4 bg-gray-800/50 text-white rounded-xl border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  autoFocus
                />
              </div>
              <button
                type="submit"
                className="w-full px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed transform transition-all duration-200 hover:scale-105 active:scale-95"
                disabled={!roomId.trim()}
              >
                Join Room
              </button>
            </form>

            <div className="mt-8 pt-6 border-t border-gray-800">
              <p className="text-sm text-gray-500 text-center">
                Create or join a room to start chatting
              </p>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-3 gap-4 text-center animate-fade-in-delayed">
            <div className="p-4">
              <div className="text-3xl mb-2">⚡</div>
              <p className="text-sm text-gray-400">Real-time</p>
            </div>
            <div className="p-4">
              <div className="text-3xl mb-2">🔒</div>
              <p className="text-sm text-gray-400">Private Rooms</p>
            </div>
            <div className="p-4">
              <div className="text-3xl mb-2">💬</div>
              <p className="text-sm text-gray-400">Instant Messaging</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-black flex flex-col text-white font-sans">
      <ChatHeader
        roomName={currentRoom}
        isConnected={isConnected}
        userCount={userCount}
      />
      <MessageList messages={messages} isTyping={isTyping} />
      <MessageInput onSendMessage={handleSendMessage} onTyping={handleTyping} />
    </div>
  );
}

export default App;
