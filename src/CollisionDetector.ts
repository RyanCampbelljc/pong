import { Paddle } from "./module.js";
import { Ball } from "./module.js";
export class CollisionDetector{
    public static checkPaddleCollision(ball: Ball, paddle: Paddle): boolean{
        const rad = ball.getRadius();
        const ballLeft = ball.getPositionX() - rad
        const ballRight = ball.getPositionX() + rad
        const ballTop = ball.getPositionY() - rad
        const ballBottom = ball.getPositionY() + rad
        
        const padLeft = paddle.getPositionX();
        const padRight = padLeft + paddle.getWidth();
        const padTop = paddle.getPositionY();
        const padBottom = padTop + paddle.getHeight();


        return(
            ballRight > padLeft &&
            ballLeft < padRight && 
            ballBottom > padTop &&
            ballTop < padBottom
        );
    }

    public static checkCeilingCollision(ball: Ball, canvHeight: number){
        const rad = ball.getRadius();
        const ballTop = ball.getPositionY() - rad 
        const ballBottom = ball.getPositionY() + rad

        return (ballTop <= 0) || (ballBottom >= canvHeight);
    }

    public static checkSideWallCollision(ball: Ball, canvWidth: number){
        const rad = ball.getRadius();
        const ballLeft = ball.getPositionX() - rad;
        const ballRight = ball.getPositionX() + rad;
        
        return (ballLeft <= 0) || (ballRight >= canvWidth);
    }
}