import { Ball } from "./module.js";
export class Game {
    m_canvas;
    m_ctx;
    m_gameOver = true;
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
    }
    async play() {
        let startTime = window.performance.now() / 1000;
        while (this.m_gameOver) {
            this.m_dt = window.performance.now() / 1000 - startTime;
            startTime = window.performance.now() / 1000;
            this.m_ctx.clearRect(0, 0, this.m_canvas.width, this.m_canvas.height);
            this.drawDashedLine();
            this.m_lPlayer.update(this.m_dt);
            this.m_rPlayer.update(this.m_dt);
            this.m_ball.update(this.m_dt);
            this.m_lPlayer.draw(this.m_ctx);
            this.m_rPlayer.draw(this.m_ctx);
            this.m_ball.draw(this.m_ctx);
            await this.sleep(1);
        }
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
}
//# sourceMappingURL=Game.js.map