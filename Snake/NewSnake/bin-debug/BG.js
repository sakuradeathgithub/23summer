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
var BG = (function (_super) {
    __extends(BG, _super);
    function BG(bgWidth, bgHeight) {
        var _this = _super.call(this) || this;
        //绘制背景网格图
        _this.bgWidth = null;
        _this.bgHeight = null;
        _this.gridSize = 50;
        _this.bgWidth = bgWidth;
        _this.bgHeight = bgHeight;
        _this.init();
        return _this;
    }
    //init
    BG.prototype.init = function () {
        var gridSize = this.gridSize;
        var bgWidth = this.bgWidth;
        var bgHeight = this.bgHeight;
        for (var x = 0; x < bgWidth; x += gridSize) {
            var line = new egret.Shape();
            var lg = line.graphics;
            lg.lineStyle(2, 0xCCCCCC);
            lg.moveTo(x, 0);
            lg.lineTo(x, bgHeight);
            this.addChild(line);
        }
        for (var y = 0; y < bgHeight; y += gridSize) {
            var line = new egret.Shape();
            var lg = line.graphics;
            lg.lineStyle(2, 0xCCCCCC);
            lg.moveTo(0, y);
            lg.lineTo(bgWidth, y);
            this.addChild(line);
        }
        this.alpha = 0.5;
    };
    return BG;
}(egret.DisplayObjectContainer));
__reflect(BG.prototype, "BG");
//# sourceMappingURL=BG.js.map