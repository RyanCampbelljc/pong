import { Game } from "/out/module.js";
import { Player } from "/out/module.js";
import CONSTANTS from "/out/module.js";
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
	socket.on("startGame", () => {
		startGame();
		game.play();
	});
	//todo make this typed.
	socket.on("updateRightPlayer", (posY) => {
		console.log("updated player position");
		rPlayer.setPosY(posY);
	});
	socket.on("resetItems", () => {
		game.resetItemPositions();
	});
});

//todo should get reference to context and create players to pass to game.
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

function startGame() {
	let canvas = document.getElementById("myCanvas");
	let ctx = canvas.getContext("2d");
	lPlayer = new Player(
		CONSTANTS.LPLAYER_STARTX,
		CONSTANTS.LPLAYER_STARTY,
		canvas,
		"KeyW",
		"KeyS",
		socket
	);
	rPlayer = new Player(
		CONSTANTS.RPLAYER_STARTX,
		CONSTANTS.LPLAYER_STARTY,
		canvas,
		"ArrowUp",
		"ArrowDown",
		socket
	);
	game = new Game(canvas, ctx, lPlayer, rPlayer);
}
