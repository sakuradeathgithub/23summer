class BG extends egret.DisplayObjectContainer{
//绘制背景网格图
    private bgWidth:number = null;
    private bgHeight:number = null;
    private gridSize = 50;

    constructor(bgWidth:number, bgHeight:number){
        super();
        this.bgWidth = bgWidth;
        this.bgHeight = bgHeight;
        this.init();
    }

    //init
    private init(){
        let gridSize = this.gridSize;
        let bgWidth = this.bgWidth;
        let bgHeight = this.bgHeight;
        for(let x=0;x<bgWidth;x+=gridSize){
            let line = new egret.Shape();
            let lg = line.graphics;
            lg.lineStyle(2, 0xCCCCCC);
            lg.moveTo(x, 0);
            lg.lineTo(x, bgHeight);
            this.addChild(line);
        }
        for(let y=0;y<bgHeight;y+=gridSize){
            let line = new egret.Shape();
            let lg = line.graphics;
            lg.lineStyle(2, 0xCCCCCC);
            lg.moveTo(0, y);
            lg.lineTo(bgWidth, y);
            this.addChild(line);
        }
        this.alpha = 0.5;
    }
}