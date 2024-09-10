import { Player } from "./module.js";
export class Game{
    private m_canvas: HTMLCanvasElement;
    private m_ctx: CanvasRenderingContext2D;
    private m_gameOver: boolean = true;
    private m_lPlayer: Player;
    private m_rPlayer: Player
    private m_dt: number = 0;
    //todo pass these in as a list of drawables
    constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, lPlayer: Player, rPlayer: Player){
        this.m_canvas = canvas; 
        this.m_ctx = ctx;
        this.m_lPlayer = lPlayer;
        this.m_rPlayer = rPlayer;
    }

    public async play(){
        let startTime = window.performance.now() / 1000;
        while(this.m_gameOver){
            this.m_dt = window.performance.now() / 1000 - startTime;
            startTime = window.performance.now() / 1000;
            this.m_ctx.clearRect(0,0, this.m_canvas.width, this.m_canvas.height);

            this.m_lPlayer.update(this.m_dt)
            this.m_rPlayer.update(this.m_dt)
            this.m_lPlayer.draw(this.m_ctx);
            this.m_rPlayer.draw(this.m_ctx);

            await this.sleep(1);
        }
    }

    private sleep(ms: number) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }
}