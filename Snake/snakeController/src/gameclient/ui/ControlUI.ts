module gameclient.engine{
    export class ControlUI extends egret.DisplayObjectContainer{
        private nickname:string = null;

        constructor(nickname){
            super();
            this.nickname = nickname;
            this.init();
        }

        //
        private init(){
            // title shows nickname
            let title = new egret.TextField();
            title.text = "nickName: "+this.nickname;
            title.x = 512/2-this.width/2;
            title.y = 200;
            title.textAlign = egret.HorizontalAlign.CENTER;
            title.verticalAlign = egret.VerticalAlign.MIDDLE;
            title.textColor = 0x00ffff;
            title.size = 40;
            this.addChild(title);
            // controller button and joystick
            let joystick = new Joystick();
            let button = new Button();
            this.addChild(joystick);
            this.addChild(button);
        }
    }

    // joystick and button
        // joystick class
    export class Joystick extends egret.DisplayObjectContainer{
        // Joystick
        public static angle: number = 0;

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
            let touchArea = this.createCircle(startX, startY, 200, 0x000000, 0);
            this.touchArea = touchArea;
            this.addChild(touchArea)

            //bg
            let bg = this.createCircle(startX, startY, 100, 0xffffff, 0.4);
            this.bg = bg;
            this.addChild(bg);

            //knob
            let knob = this.createCircle(startX, startY, 40, 0xffffff, 0.6);
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
            Joystick.angle = Math.atan2(dy, dx);
            // console.log(this.startY + "  " + y);
            //当操作超出边界
            if(Math.abs(dx) > 100 || Math.abs(dy) > 100){
                dx *= 100 / distance;
                dy *= 100 / distance;
            }
            egret.Tween.get(this.knob)
                .to({x: dx, y: dy}, 50)
                .call(()=>{
                    //console.log(this.angle);
                    
                });
        }
        public createCircle(x: number, y: number, r: number, color:number, alpha: number): egret.Shape{
            let shape = new egret.Shape();
            shape.graphics.beginFill(color, alpha);
            shape.graphics.drawCircle(x, y, r);
            shape.graphics.endFill();
            return shape;
        }
        
    }
    // speed button class
    export class Button extends egret.DisplayObjectContainer{
        private button: egret.Shape = null;
        public static isSpeedUp: string = "false";

        constructor(){
            super();
            this.init();
        }

        //
        private init(){
            let button = new egret.Shape();
            button.graphics.beginFill(0xffffff, 0.6);
            button.graphics.drawCircle(500, 900, 60);
            button.graphics.endFill();
            this.addChild(this.drawFlash());
            this.addChild(button);
            button.touchEnabled = true;
            button.addEventListener(egret.TouchEvent.TOUCH_TAP, ()=>{
                if(Button.isSpeedUp == "false") Button.isSpeedUp = "true";
                else Button.isSpeedUp = "false";
            }, this);
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

    }
}