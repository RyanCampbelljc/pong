import { Ball } from "./module.js";
import CONSTANTS from "./module.js";
import { CollisionDetector } from "./module.js";
export class Game {
    m_canvas;
    m_ctx;
    m_isPlaying = false;
    m_lPlayer;
    m_rPlayer;
    m_ball;
    m_dt = 0;
    constructor(canvas, ctx, lPlayer, rPlayer) {
        this.m_canvas = canvas;
        this.m_ctx = ctx;
        this.m_lPlayer = lPlayer;
        this.m_rPlayer = rPlayer;
        this.m_ball = new Ball(this.m_canvas.width / 2, this.m_canvas.height / 2, this.m_canvas);
        this.drawElements();
        document.getElementById("playButton").addEventListener("click", () => this.play(), { once: true });
    }
    async play() {
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
    }
    resetGame() {
        document.getElementById("playButton").addEventListener("click", () => this.play(), { once: true });
        this.m_lPlayer.resetScore();
        this.m_rPlayer.resetScore();
        this.resetItems();
        this.play();
    }
    resetItems() {
        this.m_lPlayer.getPaddle().setPosition(CONSTANTS.LPLAYER_STARTX, CONSTANTS.LPLAYER_STARTY);
        this.m_rPlayer.getPaddle().setPosition(CONSTANTS.RPLAYER_STARTX, CONSTANTS.RPLAYER_STARTY);
        this.m_ball.reset();
        this.drawElements();
    }
    sleep(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }
    drawDashedLine() {
        this.m_ctx.strokeStyle = "#ffffff";
        this.m_ctx.beginPath();
        this.m_ctx.setLineDash([20, 10]);
        this.m_ctx.moveTo(this.m_canvas.width / 2, 0);
        this.m_ctx.lineTo(this.m_canvas.width / 2, this.m_canvas.height);
        this.m_ctx.lineWidth = 5;
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
        if (CollisionDetector.checkPaddleCollision(this.m_ball, this.m_lPlayer.getPaddle())) {
            pad = this.m_lPlayer.getPaddle();
        }
        else if (CollisionDetector.checkPaddleCollision(this.m_ball, this.m_rPlayer.getPaddle())) {
            pad = this.m_rPlayer.getPaddle();
        }
        if (pad) {
            this.m_ball.bounceX();
            let max = 64;
            let padRange = pad.getPositionY() + pad.getHeight() + 7;
            let diff = padRange - this.m_ball.getPositionY();
            let percentage = (diff) / max;
            let theta = (percentage * Math.PI / 2) - Math.PI / 4;
            let ballNegXMagnitude = Math.min(this.m_ball.getVelocityX(), -this.m_ball.getVelocityX());
            this.m_ball.setVelocityY(ballNegXMagnitude * Math.tan(theta));
        }
        if (CollisionDetector.checkCeilingCollision(this.m_ball, this.m_canvas.height))
            this.m_ball.bounceY();
        if (CollisionDetector.checkSideWallCollision(this.m_ball, this.m_canvas.width)) {
            if (this.m_ball.getVelocityX() < 0) {
                this.m_rPlayer.incrementScore();
            }
            else {
                this.m_lPlayer.incrementScore();
            }
            this.resetItems();
        }
    }
    displayScore(player) {
        this.m_ctx.font = "40px Impact";
        this.m_ctx.textAlign = "center";
        let offset = 0;
        if (player == this.m_lPlayer) {
            offset = -50;
        }
        else {
            offset = 50;
        }
        this.m_ctx.fillText(String(player.getScore()), this.m_canvas.width / 2 + offset, this.m_canvas.height / 8);
    }
}
//# sourceMappingURL=Game.js.map