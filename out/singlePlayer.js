import { Game } from "./module.js";
import { Player } from "./module.js";
window.addEventListener("DOMContentLoaded", setup);
function setup() {
    let canvas = document.getElementById("myCanvas");
    let ctx = canvas.getContext("2d");
    let lPlayer = new Player(20, 225, canvas, "KeyW", "KeyS");
    let rPlayer2 = new Player(770, 225, canvas, "ArrowUp", "ArrowDown");
    let g = new Game(canvas, ctx, lPlayer, rPlayer2);
    g.play();
}
//# sourceMappingURL=singlePlayer.js.map