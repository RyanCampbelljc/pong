import { iDrawable } from "./iDrawable.js";
export class Paddle extends iDrawable {
    static S_WIDTH = 10;
    static S_HEIGHT = 50;
    static S_COLOR = "red";
    m_posx;
    m_posy;
    m_velocity = 400;
    constructor(x, y, canvas) {
        super(canvas);
        this.m_posx = x;
        this.m_posy = y;
    }
    movePaddle(dt, dirY) {
        let movement = this.m_velocity * dt;
        if (dirY > 0) {
            this.m_posy -= Math.min(movement, this.m_posy);
        }
        else {
            this.m_posy += Math.min(movement, this.m_canvas.height - (this.m_posy + Paddle.S_HEIGHT));
        }
    }
    draw(ctx) {
        ctx.fillStyle = Paddle.S_COLOR;
        ctx.fillRect(this.m_posx, this.m_posy, Paddle.S_WIDTH, Paddle.S_HEIGHT);
    }
}
//# sourceMappingURL=Paddle.js.map