import { useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const [messages, setMessages] = useState(["Hi There"]);
 const wsRef = useRef<WebSocket | null>(null);


  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080");
    ws.onopen = () => {
      ws.send(
        JSON.stringify({
          type: "join",
          payload: {
            roomId: "red",
          },
        })
      );
    };

 ws.onmessage = (event) => {
  const data = JSON.parse(event.data);

  if (data.type === "chat") {
    setMessages((m) => [...m, data.message]);
  }
};


    wsRef.current = ws;
    
  }, []);
  return (
    <>
      <div className="h-screen bg-black flex flex-col text-white">
        {/* <!-- Header --> */}
        <div className="px-6 py-4 border-b border-gray-800 text-lg font-semibold">
          Live Chat
        </div>

        {/* <!-- Messages Area --> */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3 bg-black">
          {messages.map((message) => (
            <div className="max-w-[70%] bg-gray-800 px-4 py-2 rounded-lg">
              {message}
            </div>
          ))}

          <div className="max-w-[70%] bg-blue-700 px-4 py-2 rounded-lg ml-auto">
            Hi, this looks clean!
          </div>
        </div>

        {/* <!-- Broadcaster Style Input --> */}
        <div className="border-t border-gray-800 bg-black px-4 py-3">
          <div className="flex items-center gap-3 bg-gray-900 rounded-xl px-4 py-2">
            <input
              id="input_box"
              type="text"
              placeholder="Send a message..."
              className="flex-1 bg-transparent text-white placeholder-gray-400 
               focus:outline-none"
            />

            <button
              onClick={() => {
                const message = document.getElementById("input_box")?.value;
                wsRef.current?.send(
                  JSON.stringify({
                    type : "chat",
                    payload : {
                      message: message,
                    },
                  })
                );
              }}
              className="px-5 py-2 rounded-lg bg-blue-600 text-white font-medium
               hover:bg-blue-700 active:scale-95 transition"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
