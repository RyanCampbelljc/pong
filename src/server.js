import express from "express";
import { createServer } from "node:http";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { Server } from "socket.io";
const app = express();
const server = createServer(app);
const io = new Server(server);

const _dirname = dirname(fileURLToPath(import.meta.url));

function startServer() {
  io.on("connection", (socket) => {
    //todo make a random room code
    const roomSize = io.sockets.adapter.rooms.get("room1")?.size || 0;
    if (roomSize < 2) {
      socket.join("room1");
      console.log("${socket.id} joined room: ${roomCode}");
    } else {
      console.log("unable to join room. Room is full");
    }
  });

  server.listen(3000, () => {
    console.log("server running at http://localhost:3000");
  });
}
