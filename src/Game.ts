import { Player } from "./module.js";
import { Ball } from "./module.js";
export class Game{
    private m_canvas: HTMLCanvasElement;
    private m_ctx: CanvasRenderingContext2D;
    private m_gameOver: boolean = true;
    private m_lPlayer: Player;
    private m_rPlayer: Player;
    private m_ball: Ball;
    private m_dt: number = 0;
    //todo pass these in as a list of drawables
    constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, lPlayer: Player, rPlayer: Player){
        this.m_canvas = canvas; 
        this.m_ctx = ctx;
        this.m_lPlayer = lPlayer;
        this.m_rPlayer = rPlayer;
        this.m_ball = new Ball(this.m_canvas.width / 2, this.m_canvas.height / 2, this.m_canvas)
    }

    public async play(){
        let startTime = window.performance.now() / 1000;
        while(this.m_gameOver){
            this.m_dt = window.performance.now() / 1000 - startTime;
            startTime = window.performance.now() / 1000;
            this.m_ctx.clearRect(0,0, this.m_canvas.width, this.m_canvas.height);

            this.drawDashedLine();
            this.m_lPlayer.update(this.m_dt)
            this.m_rPlayer.update(this.m_dt)
            this.m_ball.update(this.m_dt);
            this.m_lPlayer.draw(this.m_ctx);
            this.m_rPlayer.draw(this.m_ctx);
            this.m_ball.draw(this.m_ctx);

            await this.sleep(1);
        }
    }

    private sleep(ms: number) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }

    private drawDashedLine(){
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