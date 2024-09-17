import { Game } from "/public/out/module.js";
import { Player } from "/public/out/module.js";
import CONSTANTS from "/public/out/module.js";
let socket;
window.addEventListener("DOMContentLoaded", setup);

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
	socket = io();
	socket.on("playerJoin", () => {
		startGame();
	});
}

function startGame() {
	let canvas = document.getElementById("myCanvas");
	let ctx = canvas.getContext("2d");
	let lPlayer = new Player(
		CONSTANTS.LPLAYER_STARTX,
		CONSTANTS.LPLAYER_STARTY,
		canvas,
		"KeyW",
		"KeyS"
	);
	let rPlayer2 = new Player(
		CONSTANTS.RPLAYER_STARTX,
		CONSTANTS.LPLAYER_STARTY,
		canvas,
		"ArrowUp",
		"ArrowDown"
	);
	let g = new Game(canvas, ctx, lPlayer, rPlayer2);
}

//  //todo somehow encapsulate these controls schemes and start positions
