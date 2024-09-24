import { Paddle, Player } from "./module.js";
import { Ball } from "./module.js";
import CONSTANTS from "./module.js";
import { CollisionDetector } from "./module.js";
import { AUDIO_FILES } from "./module.js";
export class Game{
    private m_canvas: HTMLCanvasElement;
    private m_ctx: CanvasRenderingContext2D;
    private m_isPlaying: boolean = false;
    private m_lPlayer: Player;
    private m_rPlayer: Player;
    private m_ball: Ball;
    private m_dt: number = 0;
    private m_socket : any;
    private m_playButton : HTMLButtonElement;
    constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, lPlayer: Player, rPlayer: Player, socket : any = null){
        this.m_canvas = canvas; 
        this.m_ctx = ctx;
        this.m_lPlayer = lPlayer;
        this.m_rPlayer = rPlayer;
        this.m_ball = new Ball(this.m_canvas.width / 2, this.m_canvas.height / 2, this.m_canvas)
        this.m_socket = socket;
        this.drawElements()

        //only want this if singleplayer.
        this.m_playButton = document.getElementById("playButton") as HTMLButtonElement;
        if(this.m_socket == null){
            this.m_playButton!.addEventListener("click", () => {
                this.play()
            }, 
            {once: true});
        }else{// multiplayer
            //make sure only one event listener can be added to the button.
            //since either player can click play button once the game finishes
            //its possible for the code to add the event listener for the button
            //on the other client more than once.
            //kind of a hacky workaround 
            this.m_playButton.setAttribute("listener-exists","false");
        }
        
        
    }

    //called in single player when the play button is pressed
    //called in mp when the second player joins
    public async play(){
        this.m_playButton.disabled = true;
        let startTime = window.performance.now() / 1000;
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
        this.m_playButton.disabled = false;
        this.m_isPlaying = false;
        this.playSound(AUDIO_FILES.WIN_AUDIO);
        if(this.m_socket){
            this.m_playButton.disabled = false;
            if(this.m_playButton.getAttribute("listener-exists") == "false"){
                this.m_playButton.addEventListener("click", () => {
                    this.m_socket.emit("restartGame");
                    this.restartGame()
                    this.m_playButton.setAttribute("listener-exists","false");
                },
                {once: true});
            }
            this.m_playButton.setAttribute("listener-exists","true");
        
        }else{
            this.m_playButton.addEventListener("click", () => this.restartGame(), {once: true});
        }
        
        while(!this.m_isPlaying){
            this.printWinner();
            await this.sleep(1);
        }
    }

    private restartGame(){
        this.m_isPlaying = true;
        this.m_lPlayer.resetScore();
        this.m_rPlayer.resetScore();
        this.displayScore(this.m_lPlayer);
        this.displayScore(this.m_rPlayer);
        this.resetItemPositions();
        this.play();

    }

    //todo make ball direction go towards player that last scored
    private resetItemPositions(): void{
        this.m_lPlayer.getPaddle().setPosition(CONSTANTS.LPLAYER_STARTX, CONSTANTS.LPLAYER_STARTY);
        this.m_rPlayer.getPaddle().setPosition(CONSTANTS.RPLAYER_STARTX, CONSTANTS.RPLAYER_STARTY);
        this.m_ball.reset();
        // this.m_ball.setRandomDirection();
        this.drawElements();
    }

    private sleep(ms: number) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }

    private drawDashedLine(){
        //glow
        this.m_ctx.strokeStyle = "#1435f0";
        this.m_ctx.filter = "blur(5px)"
        this.m_ctx.beginPath();
        this.m_ctx.setLineDash([56, 18]);
        this.m_ctx.moveTo(this.m_canvas.width / 2, 0);
        this.m_ctx.lineTo(this.m_canvas.width / 2, this.m_canvas.height);
        this.m_ctx.lineWidth = 13;
        this.m_ctx.stroke();
        this.m_ctx.closePath();

        //line
        this.m_ctx.imageSmoothingEnabled = false;
        this.m_ctx.strokeStyle = "#9fecff";
        this.m_ctx.filter = "none"
        this.m_ctx.beginPath();
        this.m_ctx.setLineDash([50, 25]);
        this.m_ctx.moveTo(this.m_canvas.width / 2, 0);
        this.m_ctx.lineTo(this.m_canvas.width / 2, this.m_canvas.height);
        this.m_ctx.lineWidth = 3;
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
        //checking the velocity as well ensures that th ball doesnt spaz when it hits a paddle.
        //consider the ball hitting the paddle part way through such that even when it switches direction its still in contact with pad next frame
        if(CollisionDetector.checkPaddleCollision(this.m_ball, this.m_lPlayer.getPaddle()) && this.m_ball.getVelocityX() < 0){
            pad = this.m_lPlayer.getPaddle();
        }else if(CollisionDetector.checkPaddleCollision(this.m_ball, this.m_rPlayer.getPaddle()) && this.m_ball.getVelocityX() > 0){
            pad = this.m_rPlayer.getPaddle();
        }
        
        if(pad){
            this.m_ball.bounceX();
            let rad = this.m_ball.getRadius();
            //the height of possible area where collision can occur
            let max = pad.getHeight() + 2 * rad  // there is 64 pixel height where collision can occure
            let padRange = pad.getPositionY() + pad.getHeight() + rad; 
            let diff = padRange - this.m_ball.getPositionY();// distance from bottom of pad detect range and balls posY
            //the percentage of the way from the top
            let percentage = (diff) / max;
            //use this percentage to get that percent between -pi/4 and pi/4 (45deg)
            //first part is to use the same range but make it positive then subtract off again.(to deal with the negatives)
            let theta = (percentage * Math.PI / 2) - Math.PI / 4;
            let vX  = this.m_ball.getVelocityX()
            let ballNegXMagnitude = Math.min(vX, -this.m_ball.getVelocityX())
            this.m_ball.setVelocity(vX, ballNegXMagnitude * Math.tan(theta));
            this.playSound(AUDIO_FILES.BOUNCE_AUDIO);

            //will be null when singleplayer
            if(this.m_socket){
                this.m_socket.emit("updateBallPosition", this.m_ball.getPositionX(), this.m_ball.getPositionY(), vX, this.m_ball.getVelocityY())
            }
        }

        if(CollisionDetector.checkCeilingCollision(this.m_ball, this.m_canvas.height)){
            this.m_ball.bounceY();
            this.playSound(AUDIO_FILES.BOUNCE_AUDIO);
        }

        //player scored
        if(CollisionDetector.checkSideWallCollision(this.m_ball, this.m_canvas.width)){
            //left wall
            if(this.m_ball.getVelocityX() < 0){
                this.m_rPlayer.incrementScore();
            }else{//right wall
                this.m_lPlayer.incrementScore();
            }
            this.resetItemPositions();
            this.playSound(AUDIO_FILES.SCORE_AUDIO);
        }
    }

    private displayScore(player: Player){
        this.m_ctx.font = "40px Orbitron";
        this.m_ctx.textAlign = "center";
        this.m_ctx.fillStyle = "red";
        let offset: number = 0;
        if (player == this.m_lPlayer) {
            offset = -50;
        } else {
            offset = 50
        }
        this.m_ctx.fillText(String(player.getScore()), this.m_canvas.width / 2 + offset, this.m_canvas.height / 8);
    }

    private printWinner() {
        this.m_ctx.font = "100px Orbitron";
        let time = window.performance.now() / 500;
        let r = (Math.cos(time * Math.PI + Math.PI) + 1) / 2;
        let g = (Math.cos(time * Math.PI + Math.PI / 2) + 1) / 2;
        let b = (Math.cos(time * Math.PI + Math.PI * 2) + 1) / 2;
        this.m_ctx.fillStyle = "rgb(" + r * 255 + "," + g * 255 + "," + b * 255 + ")";
        this.m_ctx.textAlign = "center";
        
        let text:string = "";
        if (this.m_lPlayer.getScore() > this.m_rPlayer.getScore()) 
            text = "PLAYER 1";
        else 
            text = "PLAYER 2";
        this.m_ctx.fillText(text,  this.m_canvas.width / 2,  this.m_canvas.height / 3);
        this.m_ctx.fillText("WINS!",  this.m_canvas.width / 2,  this.m_canvas.height / 2 + 15);
      }

      private playSound(file: string){
        let audio = new Audio(file);
        audio.play();
      }

      public updateBall(posX: number, posY: number, vX: number, vY: number){
        this.m_ball.setPosition(posX, posY);
        this.m_ball.setVelocity(vX, vY);
      }
}

