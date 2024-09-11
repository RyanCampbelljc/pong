import { GameObject } from "./module.js";
export class Paddle extends GameObject {
    static S_WIDTH = 10;
    static S_HEIGHT = 50;
    static S_COLOR = "red";
    m_velocity = 400;
    constructor(x, y, canvas) {
        super(x, y, canvas);
    }
    update(dt) {
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
        ctx.fillRect(this.m_posX, this.m_posY, Paddle.S_WIDTH, Paddle.S_HEIGHT);
    }
    getPositionX() {
        return this.m_posX;
    }
    getPositionY() {
        return this.m_posY;
    }
}
//# sourceMappingURL=Paddle.js.map