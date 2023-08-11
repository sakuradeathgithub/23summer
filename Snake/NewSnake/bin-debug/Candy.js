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
var Candy = (function (_super) {
    __extends(Candy, _super);
    function Candy() {
        var _this = _super.call(this) || this;
        //
        _this.candyTimer = null;
        _this.candyR = 10;
        // 启动糖豆生成计时器
        _this.candyTimer = new egret.Timer(5000);
        _this.candyTimer.addEventListener(egret.TimerEvent.TIMER, _this.init, _this);
        _this.candyTimer.start();
        Candy.candies = [];
        return _this;
    }
    //生成糖豆
    Candy.prototype.init = function () {
        console.log("candy added");
        var candyR = this.candyR;
        for (var i = 0; i < 5; i++) {
            var point = Params.randomPoint();
            var candy = Params.createCircle(0, 0, candyR, Params.randomColor());
            candy.x = point.x;
            candy.y = point.y;
            candy.anchorOffsetX = candyR;
            candy.anchorOffsetY = candyR;
            Candy.candies.push(candy);
            this.addChild(candy);
        }
    };
    Candy.prototype.generateCandy = function (points) {
        var candyR = this.candyR;
        for (var i = 0; i < points.length; i++) {
            var point = points[i];
            var candy = Params.createCircle(0, 0, candyR, Params.randomColor());
            candy.x = point.x;
            candy.y = point.y;
            candy.anchorOffsetX = candyR;
            candy.anchorOffsetY = candyR;
            Candy.candies.push(candy);
            this.addChild(candy);
        }
    };
    Candy.prototype.addCandy = function (candy) {
        this.addChild;
    };
    Candy.candies = null;
    return Candy;
}(egret.DisplayObjectContainer));
__reflect(Candy.prototype, "Candy");
//# sourceMappingURL=Candy.js.map