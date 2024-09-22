import { Game } from "/out/module.js";
import { Player } from "/out/module.js";
import CONSTANTS from "/out/module.js";
import { NetworkInformation } from "/out/module.js";
window.addEventListener("DOMContentLoaded", setup);
let lPlayer;
let rPlayer;
let game;
const socket = io();

socket.on("connect", () => {
	let code = localStorage.getItem("gameCode");
	if (code) {
		socket.emit("joinRoom", code);
	} else {
		console.error("ERROR: No game code in local storage found");
		//todo should I redirect to home page here?
	}
	socket.on("startGame", (side) => {
		startGame(side, socket);
		game.play();
	});

	socket.on("updateRightPlayer", (posY) => {
		rPlayer.setPosY(posY);
	});
	socket.on("updateLeftPlayer", (posY) => {
		lPlayer.setPosY(posY);
	});
	socket.on("resetItems", () => {
		game.resetItemPositions();
	});
	socket.on("updateBallPosition", (posX, posY, vX, vY) => {
		game.updateBall(posX, posY, vX, vY);
	});
	socket.on("restartGame", () => {
		console.log("restarting the game");
		game.restartGame();
	});
});

//this way the game class does need to change when multiplayer becomes a thing
function setup() {
	const gameCode = localStorage.getItem("gameCode");
	if (gameCode) {
		const codeParagraph = document.getElementById("gamecode");
		codeParagraph.innerText = gameCode;
	} else {
		console.error("No gameCode found in localStorage");
	}
}

function startGame(side, socket) {
	console.log("game started");
	let canvas = document.getElementById("myCanvas");
	let ctx = canvas.getContext("2d");

	let lNetwork = {
		isMultiplayer: true,
		socketID: side == "left" ? socket : null,
		sessionID: socket.io.engine.id, // session id from client side
		side: "left",
	};
	lPlayer = new Player(
		CONSTANTS.LPLAYER_STARTX,
		CONSTANTS.LPLAYER_STARTY,
		canvas,
		"ArrowUp",
		"ArrowDown",
		lNetwork
	);

	let rNetwork = {
		isMultiplayer: true,
		socketID: side == "right" ? socket : null,
		sessionID: socket.io.engine.id, // session id from client side
		side: "right",
	};
	rPlayer = new Player(
		CONSTANTS.RPLAYER_STARTX,
		CONSTANTS.RPLAYER_STARTY,
		canvas,
		"ArrowUp",
		"ArrowDown",
		rNetwork
	);
	game = new Game(canvas, ctx, lPlayer, rPlayer, socket);
}
