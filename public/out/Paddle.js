import { GameObject } from "./module.js";
export class Paddle extends GameObject {
    static S_WIDTH = 10;
    static S_HEIGHT = 50;
    static S_COLOR = "white";
    m_velocity = 400;
    constructor(x, y, canvas) {
        super(x, y, canvas);
    }
    movePaddle(dt, dirY) {
        let movement = this.m_velocity * dt;
        if (dirY > 0) {
            this.m_posY -= Math.min(movement, this.m_posY);
        }
        else {
            this.m_posY += Math.min(movement, this.m_canvas.height - (this.m_posY + Paddle.S_HEIGHT));
        }
    }
    draw(ctx) {
        ctx.fillStyle = Paddle.S_COLOR;
        ctx.shadowColor = 'rgba(255, 0, 0, 1)';
        ctx.shadowBlur = 50;
        ctx.fillRect(this.m_posX, this.m_posY, Paddle.S_WIDTH, Paddle.S_HEIGHT);
    }
    getPositionX() {
        return this.m_posX;
    }
    getPositionY() {
        return this.m_posY;
    }
    setPosition(x, y) {
        this.m_posX = x;
        this.m_posY = y;
    }
    setPositionY(y) {
        this.m_posY = y;
    }
    getWidth() {
        return Paddle.S_WIDTH;
    }
    getHeight() {
        return Paddle.S_HEIGHT;
    }
}
//# sourceMappingURL=Paddle.js.map