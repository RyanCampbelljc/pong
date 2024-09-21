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
const BOUNCE_AUDIO: string = "assets/bounce.mp3";
const SCORE_AUDIO: string = "assets/score.mp3";
const WIN_AUDIO: string = "assets/win.mp3";
export const AUDIO_FILES = {BOUNCE_AUDIO, SCORE_AUDIO, WIN_AUDIO};
const CONSTANTS = {LPLAYER_STARTX, LPLAYER_STARTY, RPLAYER_STARTX, RPLAYER_STARTY};
export default CONSTANTS;
export class NetworkInformation {
    isMultiplayer: boolean;
    socketID: any
    sessionID: any
    side: string
    constructor(isMultiplayer: boolean, socket: any, session: any, side: string) {
        this.isMultiplayer = isMultiplayer;
        this.socketID = socket;
        this.sessionID = session
        this.side = side;
    }
}

