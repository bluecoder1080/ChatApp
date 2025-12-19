import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8080 });

let userCount = 0;
let allSockets = [];

wss.on("connection", (socket) => {
  allSockets.push(socket);
  console.log("User Connected");
  userCount++;
  console.log("User Connected #" + userCount);

  socket.on("message", (message) => {
    console.log("messaged Recieved  " + message.toString());
    setTimeout(() => {
      socket.send(message.toString() + " Sent from The Server .");
    }, 1000);
  });
});
