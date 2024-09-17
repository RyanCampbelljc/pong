import express from "express";
import { createServer } from "node:http";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { Server } from "socket.io";
import path from "path";
const app = express();
const server = createServer(app);
const io = new Server(server);

const __filename = fileURLToPath(import.meta.url);
console.log(__filename);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(join(__dirname, "public", "index.html"));
});

//when a socket connects to server need to add all these event handlers to that specific socket
io.on("connection", (socket) => {
  console.log(`${socket.id} joined server`);

  socket.on("joinRoom", (roomCode) => {
    const roomSize = io.sockets.adapter.rooms.get(roomCode)?.size || 0;
    if (roomSize < 2) {
      socket.join(roomCode);
      console.log(`${socket.id} joined room: ${roomCode}`);
      socket.emit("playerJoin");
    } else {
      console.log("room is full");
    }
  });

  socket.on("createLobby", () => {
    //todo make this random code
    const code = "room1";
    socket.join(code);
    const pageData = {
      page: "multiPlayer.html",
      gameCode: code,
    };
    socket.emit("loadPage", pageData);
  });
});

server.listen(3000, () => {
  console.log("server running at http://localhost:3000");
});

//  //todo make a random room code
// const roomSize = io.sockets.adapter.rooms.get("room1")?.size || 0;
// if (roomSize < 2) {
// socket.join("room1");
// console.log("${socket.id} joined room: ${roomCode}");
// } else {
// console.log("unable to join room. Room is full");
// }
