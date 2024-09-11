import { Paddle } from "./module.js";
export class Player{
    private m_paddle: Paddle;
    private m_up: boolean = false;
    private m_down: boolean = false;
    private m_score: number = 0;
    constructor(posX: number, posY: number, canvas: HTMLCanvasElement, upButton: string, downButton: string){
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

    public update(dt:number): void{
        if(this.m_up != this.m_down)
            this.m_paddle.movePaddle(dt, this.m_up == true ? 1: -1)
    }
    public draw(ctx: CanvasRenderingContext2D): void{
        this.m_paddle.draw(ctx);
    }

    public getPaddle(): Paddle{
        return this.m_paddle;
    }

    public getScore(): number{
        return this.m_score;
    }

    public incrementScore(): void{
        ++this.m_score;
    }

    public resetScore(): void{
        this.m_score = 0;
    }
}