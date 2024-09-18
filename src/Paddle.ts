import { GameObject } from "./module.js";
export class Paddle extends GameObject{
    private static readonly S_WIDTH: number = 10;
    private static readonly S_HEIGHT: number = 50;
    private static readonly S_COLOR: string = "red";
    private m_velocity: number = 400;

    constructor(x:number, y: number, canvas: HTMLCanvasElement){
        super(x, y, canvas);

    }

    public update(dt: number){
        //todo needed?
    }
    public movePaddle(dt:number, dirY:number){
        let movement = this.m_velocity * dt;
        if(dirY > 0){ // upwords
            this.m_posY -= Math.min(movement, this.m_posY)
        }
        else{
            this.m_posY += Math.min(movement, this.m_canvas.height - (this.m_posY + Paddle.S_HEIGHT));
        }

    }

    public draw(ctx: CanvasRenderingContext2D): void {
        ctx.fillStyle = Paddle.S_COLOR;
        ctx.fillRect(this.m_posX, this.m_posY, Paddle.S_WIDTH, Paddle.S_HEIGHT); //x,y,width,height
    }

    public getPositionX():number{
        return this.m_posX;
    }
    public getPositionY():number{
        return this.m_posY;
    }

    public setPosition(x: number, y: number){
        this.m_posX = x;
        this.m_posY = y;
    }
    
    public setPositionY(y: number){
        this.m_posY = y;
    }


    public getWidth(): number{
        return Paddle.S_WIDTH;
    }

    public getHeight(): number{
        return Paddle.S_HEIGHT;
    }
}