import { Paddle, Player } from "./module.js";
import { Ball } from "./module.js";
import CONSTANTS from "./module.js";
import { CollisionDetector } from "./module.js";
export class Game{
    private m_canvas: HTMLCanvasElement;
    private m_ctx: CanvasRenderingContext2D;
    private m_isPlaying: boolean = false;
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
        this.drawElements()

        document.getElementById("playButton")!.addEventListener("click", () => this.play(), {once: true});
    }

    private async play(){
        let startTime = window.performance.now() / 1000;
        //causes velocity to increase still
        //document.getElementById("playButton")!.addEventListener("click", () => this.resetGame(), {once: true});
        this.m_isPlaying = true;
        while(this.m_lPlayer.getScore() < 3 && this.m_rPlayer.getScore() < 3){
            this.m_dt = window.performance.now() / 1000 - startTime;
            startTime = window.performance.now() / 1000;
            

            this.m_lPlayer.update(this.m_dt)
            this.m_rPlayer.update(this.m_dt)
            this.m_ball.update(this.m_dt);  
            this.drawElements();
            this.checkCollisions();

            await this.sleep(1);
        }
    }

    private resetGame(){
        //todo reset the score board
        document.getElementById("playButton")!.addEventListener("click", () => this.play(), {once: true});
        this.m_lPlayer.resetScore();
        this.m_rPlayer.resetScore();
        this.resetItems();
        this.play();

    }

    private resetItems(): void{
        this.m_lPlayer.getPaddle().setPosition(CONSTANTS.LPLAYER_STARTX, CONSTANTS.LPLAYER_STARTY);
        this.m_rPlayer.getPaddle().setPosition(CONSTANTS.RPLAYER_STARTX, CONSTANTS.RPLAYER_STARTY);
        this.m_ball.reset();
        this.drawElements();
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

    private drawElements(): void{
        this.m_ctx.clearRect(0,0, this.m_canvas.width, this.m_canvas.height);
        this.drawDashedLine();
        this.m_lPlayer.draw(this.m_ctx);
        this.m_rPlayer.draw(this.m_ctx);
        this.m_ball.draw(this.m_ctx);
        this.displayScore(this.m_lPlayer);
        this.displayScore(this.m_rPlayer);
    }

    private checkCollisions(): void{
        let pad: Paddle | undefined;
        if(CollisionDetector.checkPaddleCollision(this.m_ball, this.m_lPlayer.getPaddle())){
            pad = this.m_lPlayer.getPaddle();
        }else if(CollisionDetector.checkPaddleCollision(this.m_ball, this.m_rPlayer.getPaddle())){
            pad = this.m_rPlayer.getPaddle();
        }
        
        if(pad){
            this.m_ball.bounceX();
            let max = 64 // todo padH + 2rad // there is 64 pixel height where collision can occure
            let padRange = pad.getPositionY() + pad.getHeight() + 7; // 7 = ball.rad
            let diff = padRange - this.m_ball.getPositionY();// distance from bottom of pad detect range and balls posY
            //the percentage of the way from the top
            let percentage = (diff) / max;
            //use this percentage to get that percent between -pi/4 and pi/4 (45deg)
            //first part is to use the same range but make it positive then subtract off again.(to deal with the negatives)
            let theta = (percentage * Math.PI / 2) - Math.PI / 4;
            let ballNegXMagnitude = Math.min(this.m_ball.getVelocityX(), -this.m_ball.getVelocityX())
            this.m_ball.setVelocityY(ballNegXMagnitude * Math.tan(theta));
        }

        if(CollisionDetector.checkCeilingCollision(this.m_ball, this.m_canvas.height))
            this.m_ball.bounceY();
        
        if(CollisionDetector.checkSideWallCollision(this.m_ball, this.m_canvas.width)){
            //left wall
            if(this.m_ball.getVelocityX() < 0){
                this.m_rPlayer.incrementScore();
            }else{//right wall
                this.m_lPlayer.incrementScore();
            }
            this.resetItems();
        }
    }

    private displayScore(player: Player){
        this.m_ctx.font = "40px Impact";
        this.m_ctx.textAlign = "center";
        let offset: number = 0;
        if (player == this.m_lPlayer) {
            offset = -50;
        } else {
            offset = 50
        }
        this.m_ctx.fillText(String(player.getScore()), this.m_canvas.width / 2 + offset, this.m_canvas.height / 8);
    }
}

