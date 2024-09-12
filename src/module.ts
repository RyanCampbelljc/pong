export { GameObject } from "./GameObject.js" // todo why does the game break if this isnt listed first
export { Game } from "./Game.js"
export { Paddle } from "./Paddle.js"
export { Player } from "./Player.js"
export { Ball } from "./Ball.js"
export { CollisionDetector } from "./CollisionDetector.js"
const LPLAYER_STARTX:number = 20;
const LPLAYER_STARTY:number = 225;
const RPLAYER_STARTX:number = 770;
const RPLAYER_STARTY:number = 225;
const CONSTANTS = {LPLAYER_STARTX, LPLAYER_STARTY, RPLAYER_STARTX, RPLAYER_STARTY};
export default CONSTANTS;
