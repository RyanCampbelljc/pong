

import { Game } from "./module.js";
import { Player } from "./module.js";
import CONSTANTS from "./module.js";


// app.get("/", (req, res) => {
//   res.sendFile(join(_dirname, "testNode.html"));
// });



window.addEventListener("DOMContentLoaded", setup);

//todo should get reference to context and create players to pass to game.
//this way the game class does need to change when multiplayer becomes a thing
function setup() {
    let canvas = document.getElementById("myCanvas")! as HTMLCanvasElement;
    let ctx = canvas.getContext("2d")! as CanvasRenderingContext2D;
    let gamecode = document.getElementById("gamecode");
}







//  //todo somehow encapsulate these controls schemes and start positions
//  let lPlayer = new Player(CONSTANTS.LPLAYER_STARTX, CONSTANTS.LPLAYER_STARTY, canvas, "KeyW", "KeyS");
//  let rPlayer2 = new Player(CONSTANTS.RPLAYER_STARTX, CONSTANTS.LPLAYER_STARTY, canvas, "ArrowUp", "ArrowDown");
//  let g = new Game(canvas, ctx, lPlayer, rPlayer2);