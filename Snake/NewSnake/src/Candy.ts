class Candy extends egret.DisplayObjectContainer{
    //
    private candyTimer:egret.Timer = null;
    private candyR: number = 10;
    public static candies: egret.Shape[] = null;

    constructor(){
        super();
        // 启动糖豆生成计时器
        this.candyTimer = new egret.Timer(5000);
        this.candyTimer.addEventListener(egret.TimerEvent.TIMER, this.init, this);
        this.candyTimer.start();

        Candy.candies = [];
    }

    //生成糖豆
    private init(){
        console.log("candy added");
        let candyR = this.candyR;
        for(let i=0;i<5;i++){
            let point = Params.randomPoint();
            let candy = Params.createCircle(0, 0, candyR, Params.randomColor());
            candy.x = point.x;
            candy.y = point.y;
            candy.anchorOffsetX = candyR;
            candy.anchorOffsetY = candyR;
            Candy.candies.push(candy);
            this.addChild(candy);
        }
    }
    
    public generateCandy(points:egret.Point[]){
        let candyR = this.candyR;
        for(let i=0;i<points.length;i++){
            let point = points[i];
            let candy = Params.createCircle(0, 0, candyR, Params.randomColor());
            candy.x = point.x;
            candy.y = point.y;
            candy.anchorOffsetX = candyR;
            candy.anchorOffsetY = candyR;
            Candy.candies.push(candy);
            this.addChild(candy);
        }
    }
    public addCandy(candy: egret.Shape){
        this.addChild
    }
    
}