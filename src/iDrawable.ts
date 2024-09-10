export abstract class iDrawable{
    protected m_canvas: HTMLCanvasElement;
    constructor(canvas: HTMLCanvasElement){
        this.m_canvas = canvas;
    }
    abstract draw(ctx: CanvasRenderingContext2D): void;
}