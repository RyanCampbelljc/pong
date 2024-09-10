import { Paddle } from "./module.js";
import { iDrawable } from "./iDrawable.js";
export class Player extends iDrawable {
    private m_paddle: Paddle;
    private m_up: boolean = false;
    private m_down: boolean = false;
    constructor(posX: number, posY: number, canvas: HTMLCanvasElement, upButton: string, downButton: string){
        super(canvas);
        this.m_paddle = new Paddle(posX, posY, canvas);
        document.addEventListener("keydown", (event: KeyboardEvent) => {
            if(event.code === upButton)
                this.m_up = true;
            if(event.code === downButton)
                this.m_down = true;
        })
        document.addEventListener("keyup", (event: KeyboardEvent) => {
            if(event.code === upButton)
                this.m_up = false;
            if(event.code === downButton)
                this.m_down = false;
        })
    }

    public update(dt:number){
        if(this.m_up != this.m_down)
            this.m_paddle.movePaddle(dt, this.m_up == true ? 1: -1)
    }
    public draw(ctx: CanvasRenderingContext2D){
        this.m_paddle.draw(ctx);
    }
}