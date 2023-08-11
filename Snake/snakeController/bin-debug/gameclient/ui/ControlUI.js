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
var gameclient;
(function (gameclient) {
    var engine;
    (function (engine) {
        var ControlUI = (function (_super) {
            __extends(ControlUI, _super);
            function ControlUI(nickname) {
                var _this = _super.call(this) || this;
                _this.nickname = null;
                _this.nickname = nickname;
                _this.init();
                return _this;
            }
            //
            ControlUI.prototype.init = function () {
                // title shows nickname
                var title = new egret.TextField();
                title.text = "nickName: " + this.nickname;
                title.x = 512 / 2 - this.width / 2;
                title.y = 200;
                title.textAlign = egret.HorizontalAlign.CENTER;
                title.verticalAlign = egret.VerticalAlign.MIDDLE;
                title.textColor = 0x00ffff;
                title.size = 40;
                this.addChild(title);
                // controller button and joystick
                var joystick = new Joystick();
                var button = new Button();
                this.addChild(joystick);
                this.addChild(button);
            };
            return ControlUI;
        }(egret.DisplayObjectContainer));
        engine.ControlUI = ControlUI;
        __reflect(ControlUI.prototype, "gameclient.engine.ControlUI");
        // joystick and button
        // joystick class
        var Joystick = (function (_super) {
            __extends(Joystick, _super);
            function Joystick() {
                var _this = _super.call(this) || this;
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
                var touchArea = this.createCircle(startX, startY, 200, 0x000000, 0);
                this.touchArea = touchArea;
                this.addChild(touchArea);
                //bg
                var bg = this.createCircle(startX, startY, 100, 0xffffff, 0.4);
                this.bg = bg;
                this.addChild(bg);
                //knob
                var knob = this.createCircle(startX, startY, 40, 0xffffff, 0.6);
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
                Joystick.angle = Math.atan2(dy, dx);
                // console.log(this.startY + "  " + y);
                //当操作超出边界
                if (Math.abs(dx) > 100 || Math.abs(dy) > 100) {
                    dx *= 100 / distance;
                    dy *= 100 / distance;
                }
                egret.Tween.get(this.knob)
                    .to({ x: dx, y: dy }, 50)
                    .call(function () {
                    //console.log(this.angle);
                });
            };
            Joystick.prototype.createCircle = function (x, y, r, color, alpha) {
                var shape = new egret.Shape();
                shape.graphics.beginFill(color, alpha);
                shape.graphics.drawCircle(x, y, r);
                shape.graphics.endFill();
                return shape;
            };
            // Joystick
            Joystick.angle = 0;
            return Joystick;
        }(egret.DisplayObjectContainer));
        engine.Joystick = Joystick;
        __reflect(Joystick.prototype, "gameclient.engine.Joystick");
        // speed button class
        var Button = (function (_super) {
            __extends(Button, _super);
            function Button() {
                var _this = _super.call(this) || this;
                _this.button = null;
                _this.init();
                return _this;
            }
            //
            Button.prototype.init = function () {
                var button = new egret.Shape();
                button.graphics.beginFill(0xffffff, 0.6);
                button.graphics.drawCircle(500, 900, 60);
                button.graphics.endFill();
                this.addChild(this.drawFlash());
                this.addChild(button);
                button.touchEnabled = true;
                button.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                    if (Button.isSpeedUp == "false")
                        Button.isSpeedUp = "true";
                    else
                        Button.isSpeedUp = "false";
                }, this);
            };
            //在加速按钮上绘制flash图标
            Button.prototype.drawFlash = function () {
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
            Button.isSpeedUp = "false";
            return Button;
        }(egret.DisplayObjectContainer));
        engine.Button = Button;
        __reflect(Button.prototype, "gameclient.engine.Button");
    })(engine = gameclient.engine || (gameclient.engine = {}));
})(gameclient || (gameclient = {}));
//# sourceMappingURL=ControlUI.js.map