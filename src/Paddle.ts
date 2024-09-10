import { iDrawable } from "./iDrawable.js";
export class Paddle extends iDrawable{
    private static readonly S_WIDTH: number = 10;
    private static readonly S_HEIGHT: number = 50;
    private static readonly S_COLOR: string = "red"; // red
    private m_posx: number;
    private m_posy: number;
    private m_velocity: number = 400;

    constructor(x:number, y: number, canvas: HTMLCanvasElement){
        super(canvas);
        this.m_posx = x;
        this.m_posy = y;
    }

    public movePaddle(dt:number, dirY:number){
        let movement = this.m_velocity * dt;
        if(dirY > 0){ // upwords
            this.m_posy -= Math.min(movement, this.m_posy)
        }
        else{
            this.m_posy += Math.min(movement, this.m_canvas.height - (this.m_posy + Paddle.S_HEIGHT));
        }

    }

    public draw(ctx: CanvasRenderingContext2D): void {
        ctx.fillStyle = Paddle.S_COLOR;
        ctx.fillRect(this.m_posx, this.m_posy, Paddle.S_WIDTH, Paddle.S_HEIGHT); //x,y,width,height
    }
}