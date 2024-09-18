import { Paddle } from "./module.js";
export class Player{
    private m_paddle: Paddle;
    private m_up: boolean = false;
    private m_down: boolean = false;
    private m_score: number = 0;
    private m_socket: any;//socket is just null if the game is in singleplayer mode.
    constructor(posX: number, posY: number, canvas: HTMLCanvasElement, upButton: string, downButton: string, socket: any = null){
        this.m_paddle = new Paddle(posX, posY, canvas);
        this.m_socket = socket;
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
        //checks to see if up and down is being pressed at the same time.
        if(this.m_up != this.m_down){
            this.m_paddle.movePaddle(dt, this.m_up == true ? 1: -1)
            if(this.m_socket){
                this.m_socket.emit("playerMoved", this.m_paddle.getPositionY());
            }
        }
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

    public setPosY(posY: number){
        this.m_paddle.setPositionY(posY);
    }
}