import { Game } from "/out/module.js";
import { Player } from "/out/module.js";
import CONSTANTS from "/out/module.js";
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
		CONSTANTS.RPLAYER_STARTY,
		canvas,
		"ArrowUp",
		"ArrowDown"
	);
	let g = new Game(canvas, ctx, lPlayer, rPlayer2);
}
