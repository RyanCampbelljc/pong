import { Game } from "./module.js";
import { Player } from "./module.js";
window.addEventListener("DOMContentLoaded", setup);

//todo should get reference to context and create players to pass to game.
//this way the game class does need to change when multiplayer becomes a thing
function setup() {
    let canvas = document.getElementById("myCanvas")! as HTMLCanvasElement;
    let ctx = canvas.getContext("2d")! as CanvasRenderingContext2D;
    //todo somehow encapsulate these controls schemes and start positions
    let lPlayer = new Player(20, 225, canvas, "KeyW", "KeyS");
    let rPlayer2 = new Player(770, 225, canvas, "ArrowUp", "ArrowDown");
    let g = new Game(canvas, ctx, lPlayer, rPlayer2);
    g.play();
}
