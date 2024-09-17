import { GameObject } from "./module.js";
import { Paddle } from "./module.js";
export class Ball extends GameObject{
    private static readonly S_COLOR: string = "yellow";
    private static readonly S_START_VEL:number = 400;
    private m_radius: number = 7;
    private m_velocityX: number = Ball.S_START_VEL;
    private m_velocityY: number = 0;
    private m_bounceCount = 0;

    constructor(x:number, y: number, canvas: HTMLCanvasElement){
        super(x, y, canvas);
    }

    public update(dt:number): void{
        this.m_posX += this.m_velocityX * dt;
        this.m_posY += this.m_velocityY * dt;
    }

    public draw(ctx: CanvasRenderingContext2D): void{
        ctx.beginPath();
        ctx.fillStyle = Ball.S_COLOR;
        ctx.arc(this.m_posX, this.m_posY, this.m_radius, 0, 2 * Math.PI); //x,y,r, The starting angle, in radians (0 is at the 3 o'clock position of the arc's circle),The ending angle, in radians
        ctx.fill();
    }

    public reset(){
        this.m_velocityX = Ball.S_START_VEL;
        this.m_velocityY = 0
        this.m_posX = this.m_canvas.width / 2;
        this.m_posY = this.m_canvas.height / 2;
        this.m_bounceCount = 0;
    }

    public getPositionX(){
        return this.m_posX;
    }

    public getPositionY(){
        return this.m_posY;
    }

    public getRadius(){
        return this.m_radius;
    }

    public bounceX(){
        this.m_velocityX *= -1;
        ++this.m_bounceCount;
        if(this.m_bounceCount % 5 == 0){
            this.m_velocityX > 0 ? this.m_velocityX += 100 : this.m_velocityX -= 100;
        }
    }
    public bounceY(){
        this.m_velocityY *= -1;
    }
    public setVelocityY(vel: number){
        this.m_velocityY = vel;
    }
    public getVelocityX(): number{
        return this.m_velocityX;
    }

    public setRandomDirection(){
        if(Math.random() > 0.5)
            this.m_velocityX *= -1;
    }
}