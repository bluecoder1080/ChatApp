import { WebSocketServer, WebSocket } from "ws";
import http from "http";
import dotenv from "dotenv";

dotenv.config();

// Use PORT from environment for Render, default to 8080 locally
const PORT = Number(process.env.PORT ?? 8080);

// Create an HTTP server so Render can health check and proxy WebSocket upgrades
const server = http.createServer((req, res) => {
  if (req.url === "/health") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("OK");
    return;
  }
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("Chat backend running");
});

// Attach WebSocket server to the HTTP server
const wss = new WebSocketServer({ server });

interface User {
  socket: WebSocket;
  room: string;
}

let allSockets: User[] = [];

const broadcastUserCount = (room: string) => {
  const count = allSockets.filter((u) => u.room === room).length;
  allSockets.forEach((user) => {
    if (user.room === room) {
      user.socket.send(JSON.stringify({ type: "userCount", count }));
    }
  });
};

wss.on("connection", (socket) => {
  socket.on("message", (message) => {
    const parsedMessage = JSON.parse(message as unknown as string);

    if (parsedMessage.type === "join") {
      allSockets.push({
        socket,
        room: parsedMessage.payload.roomId,
      });
      broadcastUserCount(parsedMessage.payload.roomId);
    }

    if (parsedMessage.type === "chat") {
      const currentUser = allSockets.find((x) => x.socket === socket);
      if (!currentUser) return;
      allSockets.forEach((user) => {
        if (user.room === currentUser.room && user.socket !== socket) {
          user.socket.send(
            JSON.stringify({
              type: "chat",
              message: parsedMessage.payload.message,
            })
          );
        }
      });
    }

    if (parsedMessage.type === "typing") {
      const currentUser = allSockets.find((x) => x.socket === socket);
      if (!currentUser) return;
      allSockets.forEach((user) => {
        if (user.room === currentUser.room && user.socket !== socket) {
          user.socket.send(
            JSON.stringify({
              type: "typing",
              isTyping: parsedMessage.payload.isTyping,
            })
          );
        }
      });
    }
  });

  socket.on("close", () => {
    const user = allSockets.find((u) => u.socket === socket);
    const room = user?.room;
    allSockets = allSockets.filter((u) => u.socket !== socket);
    if (room) broadcastUserCount(room);
  });
});

// Start the HTTP server
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
