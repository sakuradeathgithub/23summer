class Joystick extends egret.DisplayObjectContainer{
//Joystick

    private touchArea:egret.Shape = null;
    private bg:egret.Shape = null;
    private knob:egret.Shape = null;

    private startX = 150;
    private startY = 900;

    constructor(){
        super();
        this.init();
    }

    //init
    private init(){
        let startX = this.startX;
        let startY = this.startY;

        //touch touchArea,透明的可操作背景
        let touchArea = Params.createCircle(startX, startY, 200, 0x000000, 0);
        this.touchArea = touchArea;
        this.addChild(touchArea)

        //bg
        let bg = Params.createCircle(startX, startY, 100, 0xffffff, 0.4);
        this.bg = bg;
        this.addChild(bg);

        //knob
        let knob = Params.createCircle(startX, startY, 40, 0xffffff, 0.6);
        this.knob = knob;
        this.addChild(knob);
        touchArea.touchEnabled = true;
        touchArea.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBegin, this);
        touchArea.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchMove, this);
        touchArea.addEventListener(egret.TouchEvent.TOUCH_END, this.touchEnd, this);

    }

    //move the knob
    //第一下点击，将knob移动到点击位置
    private touchBegin(event:egret.TouchEvent){
        // console.log("Joystick_bg:touched");
        this.moveKnob(event.stageX, event.stageY);
    }
    private touchMove(event:egret.TouchEvent){
        this.moveKnob(event.stageX, event.stageY);
    }
    private touchEnd(event:egret.TouchEvent){
        egret.Tween.get(this.knob)
            .to({x: 0, y: 0}, 100)
            .call(()=>{
                //
            })
    }
    private moveKnob(x:number, y:number){
        let dx = x - this.startX;
        let dy = y - this.startY;
        let distance = Math.sqrt(dx * dx + dy * dy);
        //方便传递参数
        Params.angle = Math.atan2(dy, dx);
        // console.log(this.startY + "  " + y);
        //当操作超出边界
        if(Math.abs(dx) > 100 || Math.abs(dy) > 100){
            dx *= 100 / distance;
            dy *= 100 / distance;
        }
        egret.Tween.get(this.knob)
            .to({x: dx, y: dy}, 50)
            .call(()=>{
                //
            });
    }
    
}