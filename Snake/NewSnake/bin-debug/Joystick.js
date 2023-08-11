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
var Joystick = (function (_super) {
    __extends(Joystick, _super);
    function Joystick() {
        var _this = _super.call(this) || this;
        //Joystick
        _this.touchArea = null;
        _this.bg = null;
        _this.knob = null;
        _this.startX = 150;
        _this.startY = 900;
        _this.init();
        return _this;
    }
    //init
    Joystick.prototype.init = function () {
        var startX = this.startX;
        var startY = this.startY;
        //touch touchArea,透明的可操作背景
        var touchArea = Params.createCircle(startX, startY, 200, 0x000000, 0);
        this.touchArea = touchArea;
        this.addChild(touchArea);
        //bg
        var bg = Params.createCircle(startX, startY, 100, 0xffffff, 0.4);
        this.bg = bg;
        this.addChild(bg);
        //knob
        var knob = Params.createCircle(startX, startY, 40, 0xffffff, 0.6);
        this.knob = knob;
        this.addChild(knob);
        touchArea.touchEnabled = true;
        touchArea.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBegin, this);
        touchArea.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchMove, this);
        touchArea.addEventListener(egret.TouchEvent.TOUCH_END, this.touchEnd, this);
    };
    //move the knob
    //第一下点击，将knob移动到点击位置
    Joystick.prototype.touchBegin = function (event) {
        // console.log("Joystick_bg:touched");
        this.moveKnob(event.stageX, event.stageY);
    };
    Joystick.prototype.touchMove = function (event) {
        this.moveKnob(event.stageX, event.stageY);
    };
    Joystick.prototype.touchEnd = function (event) {
        egret.Tween.get(this.knob)
            .to({ x: 0, y: 0 }, 100)
            .call(function () {
            //
        });
    };
    Joystick.prototype.moveKnob = function (x, y) {
        var dx = x - this.startX;
        var dy = y - this.startY;
        var distance = Math.sqrt(dx * dx + dy * dy);
        //方便传递参数
        Params.angle = Math.atan2(dy, dx);
        // console.log(this.startY + "  " + y);
        //当操作超出边界
        if (Math.abs(dx) > 100 || Math.abs(dy) > 100) {
            dx *= 100 / distance;
            dy *= 100 / distance;
        }
        egret.Tween.get(this.knob)
            .to({ x: dx, y: dy }, 50)
            .call(function () {
            //
        });
    };
    return Joystick;
}(egret.DisplayObjectContainer));
__reflect(Joystick.prototype, "Joystick");
//# sourceMappingURL=Joystick.js.map