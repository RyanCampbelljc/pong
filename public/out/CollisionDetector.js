export class CollisionDetector {
    static checkPaddleCollision(ball, paddle) {
        const rad = ball.getRadius();
        const ballLeft = ball.getPositionX() - rad;
        const ballRight = ball.getPositionX() + rad;
        const ballTop = ball.getPositionY() - rad;
        const ballBottom = ball.getPositionY() + rad;
        const padLeft = paddle.getPositionX();
        const padRight = padLeft + paddle.getWidth();
        const padTop = paddle.getPositionY();
        const padBottom = padTop + paddle.getHeight();
        return (ballRight > padLeft &&
            ballLeft < padRight &&
            ballBottom > padTop &&
            ballTop < padBottom);
    }
    static checkCeilingCollision(ball, canvHeight) {
        const rad = ball.getRadius();
        const ballTop = ball.getPositionY() - rad;
        const ballBottom = ball.getPositionY() + rad;
        return (ballTop <= 0) || (ballBottom >= canvHeight);
    }
    static checkSideWallCollision(ball, canvWidth) {
        const rad = ball.getRadius();
        const ballLeft = ball.getPositionX() - rad;
        const ballRight = ball.getPositionX() + rad;
        return (ballLeft <= 0) || (ballRight >= canvWidth);
    }
}
//# sourceMappingURL=CollisionDetector.js.map