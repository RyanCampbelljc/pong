import { GameObject } from "./module.js";
export class Ball extends GameObject {
    static S_COLOR = "yellow";
    static S_START_VEL = 400;
    m_radius = 7;
    m_velocityX = Ball.S_START_VEL;
    m_velocityY = 0;
    constructor(x, y, canvas) {
        super(x, y, canvas);
    }
    update(dt) {
        this.m_posX += this.m_velocityX * dt;
        this.m_posY += this.m_velocityY * dt;
    }
    draw(ctx) {
        ctx.beginPath();
        ctx.fillStyle = Ball.S_COLOR;
        ctx.arc(this.m_posX, this.m_posY, this.m_radius, 0, 2 * Math.PI);
        ctx.fill();
    }
    reset() {
        this.m_velocityX = Ball.S_START_VEL;
        this.m_velocityY = 0;
        this.m_posX = this.m_canvas.width / 2;
        this.m_posY = this.m_canvas.height / 2;
    }
    getPositionX() {
        return this.m_posX;
    }
    getPositionY() {
        return this.m_posY;
    }
    getRadius() {
        return this.m_radius;
    }
    bounceX() {
        this.m_velocityX *= -1;
    }
    bounceY() {
        this.m_velocityY *= -1;
    }
    setVelocityY(vel) {
        this.m_velocityY = vel;
    }
    getVelocityX() {
        return this.m_velocityX;
    }
}
//# sourceMappingURL=Ball.js.map