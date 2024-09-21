import { Paddle } from "./module.js";
import { NetworkInformation } from "./module.js";
export class Player{
    private m_paddle: Paddle;
    private m_up: boolean = false;
    private m_down: boolean = false;
    private m_score: number = 0;
    private m_socket: any;//socket is just null if the game is in singleplayer mode.
    private m_netInfo: NetworkInformation | null;
    //made or null so singleplayer does have to pass NetworkInformation object
    constructor(posX: number, posY: number, canvas: HTMLCanvasElement, upButton: string, downButton: string, netinfo: NetworkInformation | null){
        this.m_paddle = new Paddle(posX, posY, canvas);
        this.m_netInfo = netinfo;
        this.m_socket = netinfo ? netinfo.socketID : null;
        //if null then its singleplayer. Setupinput
        //else its mp but need to make sure there is a socket.(signifies that this client represents this paddle)
        //todo this is ugly
        if(netinfo == null || this.m_socket){
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
        
    }

    public update(dt:number): void{
        //checks to see if up and down is being pressed at the same time.
        if(this.m_up != this.m_down){
            this.m_paddle.movePaddle(dt, this.m_up == true ? 1: -1)
            if(this.m_socket){
                //if socket exists then netInfo must also
                this.m_socket.emit("playerMoved", this.m_paddle.getPositionY(), this.m_netInfo!.side);
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
        // if(this.m_socket){
        //     this.m_socket.emit("playerMoved", this.m_paddle.getPositionY());
        // }
    }
}