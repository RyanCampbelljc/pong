export { GameObject } from "./GameObject.js";
export { Game } from "./Game.js";
export { Paddle } from "./Paddle.js";
export { Player } from "./Player.js";
export { Ball } from "./Ball.js";
export { CollisionDetector } from "./CollisionDetector.js";
const LPLAYER_STARTX = 20;
const LPLAYER_STARTY = 225;
const RPLAYER_STARTX = 770;
const RPLAYER_STARTY = 225;
const BOUNCE_AUDIO = "assets/bounce.mp3";
const SCORE_AUDIO = "assets/score.mp3";
const WIN_AUDIO = "assets/win.mp3";
export const AUDIO_FILES = { BOUNCE_AUDIO, SCORE_AUDIO, WIN_AUDIO };
const CONSTANTS = { LPLAYER_STARTX, LPLAYER_STARTY, RPLAYER_STARTX, RPLAYER_STARTY };
export default CONSTANTS;
export class NetworkInformation {
    isMultiplayer;
    socketID;
    sessionID;
    side;
    constructor(isMultiplayer, socket, session, side) {
        this.isMultiplayer = isMultiplayer;
        this.socketID = socket;
        this.sessionID = session;
        this.side = side;
    }
}
//# sourceMappingURL=module.js.map