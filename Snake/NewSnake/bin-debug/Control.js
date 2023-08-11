var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Control = (function () {
    function Control() {
        // private snake:Snake = null;
        //private check:Check = null;
        this.speed = 5;
    }
    //move the snake 帧事件,传入移动的参数
    Control.prototype.moveSnake = function (snake, angle, state) {
        if (snake.stateDeath)
            return;
        // control head animation rotation
        snake.dragonbonesMC.rotation = angle / (2 * Math.PI) * 360 + 90;
        // control move speed
        var speed = this.speed;
        var speedTimes = 1;
        if (state == "true") {
            speedTimes = 1.5;
        }
        else {
            speedTimes = 1;
        }
        // calculate parameters about movement
        var dx = speed * speedTimes * Math.cos(angle);
        var dy = speed * speedTimes * Math.sin(angle);
        var body = snake.body;
        var position = snake.position;
        snake.dragonbonesMC.rotation = angle / (2 * Math.PI) * 360 + 90;
        // move the head and head animation
        egret.Tween.get(snake.dragonbonesMC)
            .to({ x: snake.dragonbonesMC.x + dx, y: snake.dragonbonesMC.y + dy })
            .call(function () { });
        egret.Tween.get(body[0])
            .to({ x: snake.dragonbonesMC.x + dx, y: snake.dragonbonesMC.y + dy })
            .call(function () { });
        egret.Tween.get(snake.nickTitle)
            .to({ x: snake.dragonbonesMC.x + dx, y: snake.dragonbonesMC.y + dy - 100 })
            .call(function () { });
        // control bodies
        for (var i = 1; i < body.length; i++) {
            var newdy = position[i - 1].y - position[i].y;
            var newdx = position[i - 1].x - position[i].x;
            var angle_1 = Math.atan2(newdy, newdx);
            var targetX = position[i - 1].x;
            var targetY = position[i - 1].y;
            egret.Tween.get(body[i])
                .to({ x: targetX, y: targetY })
                .call(function () { });
        }
        //更新坐标
        for (var i = 0; i < position.length; i++) {
            position[i].x = body[i].x;
            position[i].y = body[i].y;
        }
    };
    Control.prototype.aiMopve = function (aiSnake) {
        if (aiSnake.stateDeath)
            return;
        var angle = 0;
        var checkR = 200;
        var x = aiSnake.body[0].x;
        var y = aiSnake.body[0].y;
        if (x < checkR || x > Params.stageSize - checkR || y < checkR || y > Params.stageSize - checkR) {
            if (x < checkR) {
                angle += 1;
            }
            else if (x > Params.stageSize - checkR) {
                angle -= 1.5;
            }
            else if (y < checkR) {
                angle += 2;
            }
            else if (y > Params.stageSize - checkR) {
                angle -= 2;
            }
            angle %= Math.PI;
        }
        var state = "false";
        // control head animation rotation
        aiSnake.dragonbonesMC.rotation = angle / (2 * Math.PI) * 360 + 90;
        // control move speed
        var speed = this.speed;
        var speedTimes = 1;
        if (state == "true") {
            speedTimes = 1.5;
        }
        else {
            speedTimes = 1;
        }
        // calculate parameters about movement
        var dx = speed * speedTimes * Math.cos(angle);
        var dy = speed * speedTimes * Math.sin(angle);
        var body = aiSnake.body;
        var position = aiSnake.position;
        aiSnake.dragonbonesMC.rotation = angle / (2 * Math.PI) * 360 + 90;
        // move the head and head animation and nick name title
        egret.Tween.get(aiSnake.dragonbonesMC)
            .to({ x: aiSnake.dragonbonesMC.x + dx, y: aiSnake.dragonbonesMC.y + dy })
            .call(function () { });
        egret.Tween.get(body[0])
            .to({ x: aiSnake.dragonbonesMC.x + dx, y: aiSnake.dragonbonesMC.y + dy })
            .call(function () { });
        egret.Tween.get(aiSnake.nickTitle)
            .to({ x: aiSnake.dragonbonesMC.x + dx, y: aiSnake.dragonbonesMC.y + dy - 100 })
            .call(function () { });
        // control bodies
        for (var i = 1; i < body.length; i++) {
            var newdy = position[i - 1].y - position[i].y;
            var newdx = position[i - 1].x - position[i].x;
            var angle_2 = Math.atan2(newdy, newdx);
            var targetX = position[i - 1].x;
            var targetY = position[i - 1].y;
            egret.Tween.get(body[i])
                .to({ x: targetX, y: targetY })
                .call(function () { });
        }
        //更新坐标
        for (var i = 0; i < position.length; i++) {
            position[i].x = body[i].x;
            position[i].y = body[i].y;
        }
    };
    return Control;
}());
__reflect(Control.prototype, "Control");
//# sourceMappingURL=Control.js.map