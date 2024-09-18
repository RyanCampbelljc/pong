import express from "express";
import session from "express-session";
import { createServer } from "node:http";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { Server } from "socket.io";
import path from "path";
const app = express();
const server = createServer(app);
const io = new Server(server);

const sessionMiddleware = session({
	secret: "mySecretKey",
	resave: false,
	saveUninitialized: true,
	cookie: { secure: false },
});

const __filename = fileURLToPath(import.meta.url);
console.log(__filename);
const __dirname = path.dirname(__filename);

//use session middleware in express
app.use(sessionMiddleware);

//allow server to give any file in public folder
app.use(express.static(path.join(__dirname, "public")));

//home page when someone joins server
app.get("/", (req, res) => {
	res.sendFile(join(__dirname, "public", "index.html"));
});

//make sessions available to socketio
io.use((socket, next) => {
	sessionMiddleware(socket.request, socket.request.res || {}, next);
});

//when a socket connects to server need to add all these event handlers to that specific socket
io.on("connection", (socket) => {
	let socketID = socket.id.substring(0, 4);
	const session = socket.request.session;
	const sessionID = session.id.substring(0, 4); //todo why id and not userId
	console.log(
		`socket id: ${socketID}; session id ${sessionID}; joined server`
	);

	socket.on("joinRoom", (roomCode) => {
		// let exists = doesRoomExist(roomCode);
		// console.log("room exists: " + exists);
		if (roomCode === undefined) {
			console.log("error roomCode is null");
		}
		const roomSize = io.sockets.adapter.rooms.get(roomCode)?.size || 0;
		if (roomSize == 2) {
			console.log("room is full");
		} else {
			socket.join(roomCode);
			console.log(
				`${socketID} joined room: ${roomCode}; room size: ${
					roomSize + 1
				}`
			);
			if (roomSize + 1 == 2) {
				io.to(roomCode).emit("startGame"); // to all sockets in the room
			}
		}
	});

	socket.on("loadMP", (roomCode) => {
		if (roomCode === undefined) roomCode = randomCode();
		loadMulitplayer(socket, roomCode);
	});

	socket.on("disconnect", () => {
		console.log("disconnected");
	});

	//todo make code les breakable(socket could be in more rooms)
	socket.on("playerMoved", (posY) => {
		//convert rooms set into an array but filter out the room that is equal to the
		// sockets id(this one is joined automatically)
		//only should be one room left which should be in rooms[0]
		let rooms = Array.from(socket.rooms).filter(
			(room) => room !== socket.id
		);
		let room = rooms[0];
		//emits to all other sockets in the room(not the sender)
		socket.to(room).emit("updateRightPlayer", posY);
	});
});

server.listen(3000, () => {
	console.log("server running at http://localhost:3000");
});

//rooms is a map
//roomCode is a key and room is the value
//this is called destructing assignment
function doesRoomExist(code) {
	const rooms = io.sockets.adapter.rooms;
	for (let [roomCode, room] of rooms) {
		if (roomCode == code) {
			return true;
		}
	}
	return false;
}

function loadMulitplayer(socket, code) {
	const pageData = {
		page: "multiPlayer.html",
		gameCode: code,
	};
	socket.emit("loadPage", pageData);
}

function randomCode() {
	return Math.floor(Math.random() * 10000);
}
