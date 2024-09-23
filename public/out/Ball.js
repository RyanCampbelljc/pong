import { GameObject } from "./module.js";
export class Ball extends GameObject {
    static S_COLOR = "yellow";
    static S_START_VEL = 400;
    m_radius = 7;
    m_velocityX = Ball.S_START_VEL;
    m_velocityY = 0;
    m_bounceCount = 0;
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
        ctx.filter = "blur(10px)";
        ctx.arc(this.m_posX, this.m_posY, this.m_radius, 0, 2 * Math.PI);
        ctx.fill();
        ctx.fillStyle = Ball.S_COLOR;
        ctx.filter = "none";
        ctx.arc(this.m_posX, this.m_posY, this.m_radius, 0, 2 * Math.PI);
        ctx.fill();
    }
    reset() {
        this.m_velocityX = Ball.S_START_VEL;
        this.m_velocityY = 0;
        this.m_posX = this.m_canvas.width / 2;
        this.m_posY = this.m_canvas.height / 2;
        this.m_bounceCount = 0;
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
    getRadius() {
        return this.m_radius;
    }
    bounceX() {
        this.m_velocityX *= -1;
        ++this.m_bounceCount;
        if (this.m_bounceCount % 5 == 0) {
            this.m_velocityX > 0 ? this.m_velocityX += 100 : this.m_velocityX -= 100;
        }
    }
    bounceY() {
        this.m_velocityY *= -1;
    }
    setVelocity(x, y) {
        this.m_velocityX = x;
        this.m_velocityY = y;
    }
    getVelocityX() {
        return this.m_velocityX;
    }
    getVelocityY() {
        return this.m_velocityY;
    }
    setRandomDirection() {
        if (Math.random() > 0.5)
            this.m_velocityX *= -1;
    }
}
//# sourceMappingURL=Ball.js.map