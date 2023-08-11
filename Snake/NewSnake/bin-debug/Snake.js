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
var Snake = (function (_super) {
    __extends(Snake, _super);
    function Snake(x, y, nickname) {
        if (x === void 0) { x = 200; }
        if (y === void 0) { y = 500; }
        if (nickname === void 0) { nickname = "null"; }
        var _this = _super.call(this) || this;
        //用于存储蛇位置，身体数据
        _this.position = null;
        _this.body = null;
        _this.dragonbonesMC = null;
        _this.nickname = null;
        _this.nickTitle = null;
        _this.stateDeath = false;
        //蛇 圆参数
        _this.headR = 20;
        _this.bodyR = 15;
        _this.position = [];
        _this.body = [];
        _this.init(x, y);
        _this.nickname = nickname;
        return _this;
    }
    //init snake at (200, 500)
    Snake.prototype.init = function (x, y) {
        var headX = x;
        var headY = y;
        var headR = this.headR;
        var bodyR = this.bodyR;
        // 头部上方显示nickname
        var title = new egret.TextField();
        title.text = this.nickname;
        title.x = headX;
        title.y = headY - 100;
        title.textColor = 0x22ffff;
        title.alpha = 0.8;
        this.addChild(title);
        this.nickTitle = title;
        //加入蛇头
        var head = Params.createCircle(headX, headY, headR, 0x000000, 0);
        head.anchorOffsetX = headR;
        head.anchorOffsetY = headR;
        this.position.push(new egret.Point(headX, headY));
        this.body.push(head);
        //加入蛇头动画    
        var dragonbonesData = RES.getRes("liruolingxiao_dbbin");
        var textureData = RES.getRes("liruolingxiao_json");
        var texture = RES.getRes("liruolingxiao_png");
        var factory = new dragonBones.EgretFactory();
        //解析并添加龙骨数据
        factory.parseDragonBonesData(dragonbonesData);
        factory.parseTextureAtlasData(textureData, texture);
        //创建龙骨动画实例
        var armatureName = "MovieClip";
        var animationName = "1";
        this.dragonbonesMC = factory.buildArmatureDisplay(armatureName);
        var dragonbonesMC = this.dragonbonesMC;
        dragonbonesMC.x = headX;
        dragonbonesMC.y = headY;
        dragonbonesMC.size = headR;
        dragonbonesMC.anchorOffsetX = headR / 2;
        dragonbonesMC.anchorOffsetY = headR / 2;
        dragonbonesMC.invalidUpdate = true;
        dragonbonesMC.rotation = 90;
        //添加到舞台，并播放
        dragonbonesMC.animation.play(animationName);
        this.addChild(dragonbonesMC);
        //加入蛇身
        for (var i = 0; i < 7; i++) {
            var x_1 = headX - 25 * (i + 1);
            var y_1 = headY;
            var body = Params.createCircle(0, 0, bodyR, Params.randomColor(), 0.8);
            body.x = x_1;
            body.y = y_1;
            body.anchorOffsetX = bodyR / 2;
            body.anchorOffsetY = bodyR / 2;
            this.position.push(new egret.Point(x_1, y_1));
            this.body.push(body);
        }
        this.loadSnake();
    };
    //把蛇加入场景
    Snake.prototype.loadSnake = function () {
        var body = this.body;
        for (var i = 0; i < body.length; i++) {
            this.addChild(body[i]);
        }
    };
    // when eat candy, add one body
    Snake.prototype.addBody = function () {
        if (this.stateDeath)
            return;
        var bodyR = 15;
        var body = this.body;
        var tbody = Params.createCircle(0, 0, bodyR, Params.randomColor(), 0.8);
        var dx = body[body.length - 2].x - body[body.length - 1].x;
        var dy = body[body.length - 2].y - body[body.length - 1].y;
        var angle = Math.atan2(dy, dx);
        tbody.x = body[body.length - 1].x + 25 * Math.cos(angle);
        tbody.y = body[body.length - 1].y + 25 * Math.sin(angle);
        tbody.anchorOffsetX = bodyR / 2;
        tbody.anchorOffsetY = bodyR / 2;
        this.position.push(new egret.Point(tbody.x, tbody.y));
        this.body.push(tbody);
        this.addChild(tbody);
        // console.log("body length +1："+this.getLength());
    };
    Snake.prototype.getLength = function () {
        return this.body.length;
    };
    Snake.prototype.setNickname = function (nickname) {
        this.nickname = nickname;
    };
    Snake.prototype.onDeath = function () {
        this.removeChildren();
        this.body = [];
        this.position = [];
    };
    Snake.prototype.respawn = function () {
        this.stateDeath = false;
        var point = Params.randomPoint();
        this.init(point.x, point.y);
    };
    return Snake;
}(egret.DisplayObjectContainer));
__reflect(Snake.prototype, "Snake");
//# sourceMappingURL=Snake.js.map