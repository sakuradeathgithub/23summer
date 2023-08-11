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
var Time = (function (_super) {
    __extends(Time, _super);
    function Time() {
        var _this = _super.call(this) || this;
        _this.timer = null;
        _this.textField = null;
        _this.gameTime = 60 * 5;
        //1000ms 一跳，即为一秒
        _this.timer = new egret.Timer(1000);
        var timer = _this.timer;
        timer.repeatCount = _this.gameTime;
        timer.addEventListener(egret.TimerEvent.TIMER, _this.onTimerTick, _this);
        timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, _this.onTimerComplete, _this);
        _this.textField = new egret.TextField();
        var textField = _this.textField;
        textField.x = 10;
        textField.y = 10;
        textField.textColor = 0xffffff;
        textField.size = 24;
        textField.bold = true;
        _this.addChild(_this.textField);
        return _this;
    }
    //游戏开始，计时开始
    Time.prototype.startGame = function () {
        this.timer.start();
    };
    //格式化时间
    Time.prototype.formatTime = function (time) {
        var minutes = Math.floor(time / 60);
        var seconds = time % 60;
        return minutes + ":" + seconds;
    };
    Time.prototype.onTimerTick = function (event) {
        this.gameTime--;
        this.textField.text = this.formatTime(this.gameTime);
    };
    Time.prototype.onTimerComplete = function (event) {
        //计时结束
        if (this.gameTime <= 0) {
            console.log("time end");
            egret.Event.dispatchEvent(this, "GameEnd");
            //this.showWinner();
        }
    };
    return Time;
}(egret.DisplayObjectContainer));
__reflect(Time.prototype, "Time");
//# sourceMappingURL=Time.js.map