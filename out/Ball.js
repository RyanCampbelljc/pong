import { GameObject } from "./module.js";
export class Ball extends GameObject {
    static S_COLOR = "yellow";
    s_radius = 7;
    m_velocityX = 400;
    m_velocityY = 0;
    constructor(x, y, canvas) {
        super(x, y, canvas);
    }
    update(dt) {
    }
    draw(ctx) {
        ctx.beginPath();
        ctx.fillStyle = Ball.S_COLOR;
        ctx.arc(this.m_posX, this.m_posY, this.s_radius, 0, 2 * Math.PI);
        ctx.fill();
    }
}
//# sourceMappingURL=Ball.js.map