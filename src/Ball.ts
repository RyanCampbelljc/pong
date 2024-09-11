import { GameObject } from "./module.js";
export class Ball extends GameObject{
    private static readonly S_COLOR: string = "yellow";
    private s_radius: number = 7;
    private m_velocityX: number = 400;
    private m_velocityY: number = 0;
    constructor(x:number, y: number, canvas: HTMLCanvasElement){
        super(x, y, canvas);
    }

    update(dt:number): void{

    }

    draw(ctx: CanvasRenderingContext2D): void{
        ctx.beginPath();
        ctx.fillStyle = Ball.S_COLOR;
        ctx.arc(this.m_posX, this.m_posY, this.s_radius, 0, 2 * Math.PI); //x,y,r, The starting angle, in radians (0 is at the 3 o'clock position of the arc's circle),The ending angle, in radians
        ctx.fill();
    }
}