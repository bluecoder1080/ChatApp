import { WebSocketServer, WebSocket } from "ws";

const wss = new WebSocketServer({ port: 8080 });
interface User {
  socket: WebSocket;
  room: string;
}

let allSockets: User[] = [];

wss.on("connection", (socket) => {
  socket.on("message", (message) => {
    const parsedMessage = JSON.parse(message as unknown as string);
    if (parsedMessage.type == "join") {
      allSockets.push({
        socket,
        room: parsedMessage.payload.roomId,
      });
    }

    if (parsedMessage.type == "chat") {
      const currentUser = allSockets.find((x) => x.socket === socket);
      if (!currentUser) return;
      //send message to everyone except the sender
      allSockets.forEach((user) => {
        if (user.room === currentUser.room && user.socket !== socket) {
          user.socket.send(
            JSON.stringify({
              type: "chat",
              room: currentUser.room,
              message: parsedMessage.payload.message,
            })
          );
        }
      });
    }
  });
  socket.on("close", () => {
    allSockets = allSockets.filter((u) => u.socket !== socket);
  });
});
