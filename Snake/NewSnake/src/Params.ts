class Params{
    // 初始舞台数据
    public static stageSize: number = 1500;

    // 控制相关的参数，摇杆角度，是否加速
    public static angle: number = 0;
    public static isSpeedUp: string = "false";

    public static nickname:string = "";

    // 生成随机量:颜色，数值，点，角度
    public static randomColor():number{
        let color = Math.random() * 0xffffff;
        return color;
    }
    public static randomNum(): number{
        return Math.random() * Params.stageSize;
    }
    public static randomPoint():egret.Point{
        let x = Math.random() * Params.stageSize;
        let y = Math.random() * Params.stageSize;
        return new egret.Point(x, y);
    }
    public static randomAngle():number{
        return Math.random() * 2 * Math.PI;
    }

    // 生成圆形
    public static createCircle(x:number, y:number, r:number, color:number=0x000000, alpha:number=0.7):egret.Shape{
        let circle = new egret.Shape();
        let cg = circle.graphics;
        cg.beginFill(color, alpha);
        cg.drawCircle(x, y, r);
        cg.endFill();
        return circle;
    }
}