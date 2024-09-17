import { Paddle } from "./module.js";
export class Player {
    m_paddle;
    m_up = false;
    m_down = false;
    m_score = 0;
    constructor(posX, posY, canvas, upButton, downButton) {
        this.m_paddle = new Paddle(posX, posY, canvas);
        document.addEventListener("keydown", (event) => {
            if (event.code === upButton)
                this.m_up = true;
            if (event.code === downButton)
                this.m_down = true;
        });
        document.addEventListener("keyup", (event) => {
            if (event.code === upButton)
                this.m_up = false;
            if (event.code === downButton)
                this.m_down = false;
        });
    }
    update(dt) {
        if (this.m_up != this.m_down)
            this.m_paddle.movePaddle(dt, this.m_up == true ? 1 : -1);
    }
    draw(ctx) {
        this.m_paddle.draw(ctx);
    }
    getPaddle() {
        return this.m_paddle;
    }
    getScore() {
        return this.m_score;
    }
    incrementScore() {
        ++this.m_score;
    }
    resetScore() {
        this.m_score = 0;
    }
}
//# sourceMappingURL=Player.js.map