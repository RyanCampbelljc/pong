export class Game {
    m_canvas;
    m_ctx;
    m_gameOver = true;
    m_lPlayer;
    m_rPlayer;
    m_dt = 0;
    constructor(canvas, ctx, lPlayer, rPlayer) {
        this.m_canvas = canvas;
        this.m_ctx = ctx;
        this.m_lPlayer = lPlayer;
        this.m_rPlayer = rPlayer;
    }
    async play() {
        let startTime = window.performance.now() / 1000;
        while (this.m_gameOver) {
            this.m_dt = window.performance.now() / 1000 - startTime;
            startTime = window.performance.now() / 1000;
            this.m_ctx.clearRect(0, 0, this.m_canvas.width, this.m_canvas.height);
            this.m_lPlayer.update(this.m_dt);
            this.m_rPlayer.update(this.m_dt);
            this.m_lPlayer.draw(this.m_ctx);
            this.m_rPlayer.draw(this.m_ctx);
            await this.sleep(1);
        }
    }
    sleep(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }
}
//# sourceMappingURL=Game.js.map