export abstract class GameObject {
    protected m_posX: number;
    protected m_posY: number;
    protected m_canvas: HTMLCanvasElement;
    constructor(x:number, y:number, canvas: HTMLCanvasElement){
        this.m_posX = x;
        this.m_posY = y;
        this.m_canvas = canvas;
    }
    
    abstract update(dt: number): void;
    abstract draw(ctx: CanvasRenderingContext2D): void;
}