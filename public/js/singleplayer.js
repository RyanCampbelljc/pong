import { Game } from "/public/out/module.js";
import { Player } from "/public/out/module.js";
import CONSTANTS from "/public/out/module.js";
window.addEventListener("DOMContentLoaded", setup);
function setup() {
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
