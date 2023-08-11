var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Params = (function () {
    function Params() {
    }
    // 生成随机量:颜色，数值，点，角度
    Params.randomColor = function () {
        var color = Math.random() * 0xffffff;
        return color;
    };
    Params.randomNum = function () {
        return Math.random() * Params.stageSize;
    };
    Params.randomPoint = function () {
        var x = Math.random() * Params.stageSize;
        var y = Math.random() * Params.stageSize;
        return new egret.Point(x, y);
    };
    Params.randomAngle = function () {
        return Math.random() * 2 * Math.PI;
    };
    // 生成圆形
    Params.createCircle = function (x, y, r, color, alpha) {
        if (color === void 0) { color = 0x000000; }
        if (alpha === void 0) { alpha = 0.7; }
        var circle = new egret.Shape();
        var cg = circle.graphics;
        cg.beginFill(color, alpha);
        cg.drawCircle(x, y, r);
        cg.endFill();
        return circle;
    };
    // 初始舞台数据
    Params.stageSize = 1500;
    // 控制相关的参数，摇杆角度，是否加速
    Params.angle = 0;
    Params.isSpeedUp = "false";
    Params.nickname = "";
    return Params;
}());
__reflect(Params.prototype, "Params");
//# sourceMappingURL=Params.js.map