class UI extends egret.DisplayObjectContainer{
//实现摇杆和按钮
    private joystick:Joystick = null;
    private button:egret.Shape = null;

    //private isSpeedUp:boolean = false;

    constructor(){
        super();
        this.joystick = new Joystick();
        this.button = new egret.Shape();
        this.init();
    }

    //init
    private init(){
        //joystick
        let joystick = new Joystick();
        this.addChild(joystick);

        //button
        let button = new egret.Shape();
        button.graphics.beginFill(0xffffff, 0.6);
        button.graphics.drawCircle(500, 900, 60);
        button.graphics.endFill();
        this.addChild(this.drawFlash());
        this.addChild(button);
        button.touchEnabled = true;
        button.addEventListener(egret.TouchEvent.TOUCH_TAP, this.speedUp, this);
    }
    //在加速按钮上绘制flash图标
    private drawFlash():egret.Shape{
        let flash = new egret.Shape();
        let lg = flash.graphics;
        lg.lineStyle(2, 0xffffff, 0.9);
        lg.moveTo(490, 870); // 移动到起始点
        lg.lineTo(530, 870); // 绘制横线
        lg.lineTo(510, 910); // 绘制斜线
        lg.lineTo(530, 910);//绘制横线
        lg.lineTo(480, 950);//绘制斜线
        lg.moveTo(490, 870); // 移动到起始点
        lg.lineTo(480, 950); // 绘制斜线
        return flash;
    }
    //点击按钮改变加速状态
    private speedUp(){
        //直接取反
        if(Params.isSpeedUp == "true"){
            Params.isSpeedUp = "false";
        }else{
            Params.isSpeedUp = "true";
        }
        //为真
        // if(StaticItems.isSpeedUp){
        //     this.button.mask = Main.createCircle(500, 900, 60, 0x000000, 0.5);
        //     console.log("add mask");
        // }else{
        //     this.button.mask = null;            
        //     console.log("remove mask");
        // }
    }


}