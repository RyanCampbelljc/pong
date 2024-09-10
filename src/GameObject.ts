abstract class GameObject {
    private m_posX: number;
    private m_posY: number;
    constructor(x:number, y:number){
        this.m_posX = x;
        this.m_posY = y;
    }
    
    abstract update(dt: number): void;
    abstract draw(ctx: CanvasRenderingContext2D): void;
}