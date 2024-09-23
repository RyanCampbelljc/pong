import { Ball } from "./module.js";
import CONSTANTS from "./module.js";
import { CollisionDetector } from "./module.js";
import { AUDIO_FILES } from "./module.js";
export class Game {
    m_canvas;
    m_ctx;
    m_isPlaying = false;
    m_lPlayer;
    m_rPlayer;
    m_ball;
    m_dt = 0;
    m_socket;
    m_playButton;
    constructor(canvas, ctx, lPlayer, rPlayer, socket = null) {
        this.m_canvas = canvas;
        this.m_ctx = ctx;
        this.m_lPlayer = lPlayer;
        this.m_rPlayer = rPlayer;
        this.m_ball = new Ball(this.m_canvas.width / 2, this.m_canvas.height / 2, this.m_canvas);
        this.m_socket = socket;
        this.drawElements();
        this.m_playButton = document.getElementById("playButton");
        if (this.m_socket == null) {
            this.m_playButton.addEventListener("click", () => {
                this.play();
            }, { once: true });
        }
        else {
            this.m_playButton.setAttribute("listener-exists", "false");
        }
    }
    async play() {
        this.m_playButton.disabled = true;
        let startTime = window.performance.now() / 1000;
        this.m_isPlaying = true;
        while (this.m_lPlayer.getScore() < 3 && this.m_rPlayer.getScore() < 3) {
            this.m_dt = window.performance.now() / 1000 - startTime;
            startTime = window.performance.now() / 1000;
            this.m_lPlayer.update(this.m_dt);
            this.m_rPlayer.update(this.m_dt);
            this.m_ball.update(this.m_dt);
            this.drawElements();
            this.checkCollisions();
            await this.sleep(1);
        }
        this.m_playButton.disabled = false;
        this.m_isPlaying = false;
        this.playSound(AUDIO_FILES.WIN_AUDIO);
        if (this.m_socket) {
            this.m_playButton.disabled = false;
            if (this.m_playButton.getAttribute("listener-exists") == "false") {
                this.m_playButton.addEventListener("click", () => {
                    this.m_socket.emit("restartGame");
                    this.restartGame();
                    this.m_playButton.setAttribute("listener-exists", "false");
                }, { once: true });
            }
            this.m_playButton.setAttribute("listener-exists", "true");
        }
        else {
            this.m_playButton.addEventListener("click", () => this.restartGame(), { once: true });
        }
        while (!this.m_isPlaying) {
            this.printWinner();
            await this.sleep(1);
        }
    }
    restartGame() {
        this.m_isPlaying = true;
        this.m_lPlayer.resetScore();
        this.m_rPlayer.resetScore();
        this.displayScore(this.m_lPlayer);
        this.displayScore(this.m_rPlayer);
        this.resetItemPositions();
        this.play();
    }
    resetItemPositions() {
        this.m_lPlayer.getPaddle().setPosition(CONSTANTS.LPLAYER_STARTX, CONSTANTS.LPLAYER_STARTY);
        this.m_rPlayer.getPaddle().setPosition(CONSTANTS.RPLAYER_STARTX, CONSTANTS.RPLAYER_STARTY);
        this.m_ball.reset();
        this.drawElements();
    }
    sleep(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }
    drawDashedLine() {
        this.m_ctx.strokeStyle = "#1435f0";
        this.m_ctx.filter = "blur(5px)";
        this.m_ctx.beginPath();
        this.m_ctx.setLineDash([56, 18]);
        this.m_ctx.moveTo(this.m_canvas.width / 2, 0);
        this.m_ctx.lineTo(this.m_canvas.width / 2, this.m_canvas.height);
        this.m_ctx.lineWidth = 13;
        this.m_ctx.stroke();
        this.m_ctx.closePath();
        this.m_ctx.imageSmoothingEnabled = false;
        this.m_ctx.strokeStyle = "#9fecff";
        this.m_ctx.filter = "none";
        this.m_ctx.beginPath();
        this.m_ctx.setLineDash([50, 25]);
        this.m_ctx.moveTo(this.m_canvas.width / 2, 0);
        this.m_ctx.lineTo(this.m_canvas.width / 2, this.m_canvas.height);
        this.m_ctx.lineWidth = 3;
        this.m_ctx.stroke();
        this.m_ctx.closePath();
    }
    drawElements() {
        this.m_ctx.clearRect(0, 0, this.m_canvas.width, this.m_canvas.height);
        this.drawDashedLine();
        this.m_lPlayer.draw(this.m_ctx);
        this.m_rPlayer.draw(this.m_ctx);
        this.m_ball.draw(this.m_ctx);
        this.displayScore(this.m_lPlayer);
        this.displayScore(this.m_rPlayer);
    }
    checkCollisions() {
        let pad;
        if (CollisionDetector.checkPaddleCollision(this.m_ball, this.m_lPlayer.getPaddle()) && this.m_ball.getVelocityX() < 0) {
            pad = this.m_lPlayer.getPaddle();
        }
        else if (CollisionDetector.checkPaddleCollision(this.m_ball, this.m_rPlayer.getPaddle()) && this.m_ball.getVelocityX() > 0) {
            pad = this.m_rPlayer.getPaddle();
        }
        if (pad) {
            this.m_ball.bounceX();
            let rad = this.m_ball.getRadius();
            let max = pad.getHeight() + 2 * rad;
            let padRange = pad.getPositionY() + pad.getHeight() + rad;
            let diff = padRange - this.m_ball.getPositionY();
            let percentage = (diff) / max;
            let theta = (percentage * Math.PI / 2) - Math.PI / 4;
            let vX = this.m_ball.getVelocityX();
            let ballNegXMagnitude = Math.min(vX, -this.m_ball.getVelocityX());
            this.m_ball.setVelocity(vX, ballNegXMagnitude * Math.tan(theta));
            this.playSound(AUDIO_FILES.BOUNCE_AUDIO);
            if (this.m_socket) {
                this.m_socket.emit("updateBallPosition", this.m_ball.getPositionX(), this.m_ball.getPositionY(), vX, this.m_ball.getVelocityY());
            }
        }
        if (CollisionDetector.checkCeilingCollision(this.m_ball, this.m_canvas.height)) {
            this.m_ball.bounceY();
            this.playSound(AUDIO_FILES.BOUNCE_AUDIO);
        }
        if (CollisionDetector.checkSideWallCollision(this.m_ball, this.m_canvas.width)) {
            if (this.m_ball.getVelocityX() < 0) {
                this.m_rPlayer.incrementScore();
            }
            else {
                this.m_lPlayer.incrementScore();
            }
            this.resetItemPositions();
            this.playSound(AUDIO_FILES.SCORE_AUDIO);
        }
    }
    displayScore(player) {
        this.m_ctx.font = "40px Impact";
        this.m_ctx.textAlign = "center";
        this.m_ctx.fillStyle = "red";
        let offset = 0;
        if (player == this.m_lPlayer) {
            offset = -50;
        }
        else {
            offset = 50;
        }
        this.m_ctx.fillText(String(player.getScore()), this.m_canvas.width / 2 + offset, this.m_canvas.height / 8);
    }
    printWinner() {
        this.m_ctx.font = "100px Impact";
        let time = window.performance.now() / 500;
        let r = (Math.cos(time * Math.PI + Math.PI) + 1) / 2;
        let g = (Math.cos(time * Math.PI + Math.PI / 2) + 1) / 2;
        let b = (Math.cos(time * Math.PI + Math.PI * 2) + 1) / 2;
        this.m_ctx.fillStyle = "rgb(" + r * 255 + "," + g * 255 + "," + b * 255 + ")";
        this.m_ctx.textAlign = "center";
        let text = "";
        if (this.m_lPlayer.getScore() > this.m_rPlayer.getScore())
            text = "PLAYER 1";
        else
            text = "PLAYER 2";
        this.m_ctx.fillText(text, this.m_canvas.width / 2, this.m_canvas.height / 3);
        this.m_ctx.fillText("WINS!", this.m_canvas.width / 2, this.m_canvas.height / 2 + 15);
    }
    playSound(file) {
        let audio = new Audio(file);
        audio.play();
    }
    updateBall(posX, posY, vX, vY) {
        this.m_ball.setPosition(posX, posY);
        this.m_ball.setVelocity(vX, vY);
    }
}
//# sourceMappingURL=Game.js.map