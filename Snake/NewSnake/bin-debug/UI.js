var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var UI = (function (_super) {
    __extends(UI, _super);
    //private isSpeedUp:boolean = false;
    function UI() {
        var _this = _super.call(this) || this;
        //实现摇杆和按钮
        _this.joystick = null;
        _this.button = null;
        _this.joystick = new Joystick();
        _this.button = new egret.Shape();
        _this.init();
        return _this;
    }
    //init
    UI.prototype.init = function () {
        //joystick
        var joystick = new Joystick();
        this.addChild(joystick);
        //button
        var button = new egret.Shape();
        button.graphics.beginFill(0xffffff, 0.6);
        button.graphics.drawCircle(500, 900, 60);
        button.graphics.endFill();
        this.addChild(this.drawFlash());
        this.addChild(button);
        button.touchEnabled = true;
        button.addEventListener(egret.TouchEvent.TOUCH_TAP, this.speedUp, this);
    };
    //在加速按钮上绘制flash图标
    UI.prototype.drawFlash = function () {
        var flash = new egret.Shape();
        var lg = flash.graphics;
        lg.lineStyle(2, 0xffffff, 0.9);
        lg.moveTo(490, 870); // 移动到起始点
        lg.lineTo(530, 870); // 绘制横线
        lg.lineTo(510, 910); // 绘制斜线
        lg.lineTo(530, 910); //绘制横线
        lg.lineTo(480, 950); //绘制斜线
        lg.moveTo(490, 870); // 移动到起始点
        lg.lineTo(480, 950); // 绘制斜线
        return flash;
    };
    //点击按钮改变加速状态
    UI.prototype.speedUp = function () {
        //直接取反
        if (Params.isSpeedUp == "true") {
            Params.isSpeedUp = "false";
        }
        else {
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
    };
    return UI;
}(egret.DisplayObjectContainer));
__reflect(UI.prototype, "UI");
//# sourceMappingURL=UI.js.map