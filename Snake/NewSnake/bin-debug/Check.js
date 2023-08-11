var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Check = (function () {
    //传入头部坐标，进行判断
    function Check() {
        this.snake = null;
        this.point = null;
        this.candy = null;
    }
    Check.prototype.check = function (snake, candy) {
        if (snake.stateDeath)
            return;
        var x = snake.body[0].x;
        var y = snake.body[0].y;
        this.candy = candy;
        this.checkEdge(x, y, snake);
        this.checkCandy(x, y, snake);
    };
    Check.prototype.checkEdge = function (x, y, snake) {
        var checkR = 10;
        if ((x < checkR || x > Params.stageSize - checkR || y < checkR || y > Params.stageSize - checkR) && (!snake.stateDeath)) {
            // generate candies at where it dies
            if (x == 0 && y == 0)
                return true;
            this.candy.generateCandy(snake.position);
            snake.onDeath();
            setTimeout(function () {
                snake.respawn();
            }, 3000);
            snake.stateDeath = true;
            console.log("out of edge: X: " + x + " Y: " + y);
            return false;
        }
        return true;
    };
    Check.prototype.checkCandy = function (x, y, snake) {
        var _this = this;
        if (snake.stateDeath)
            return;
        var checkR = 70;
        var _loop_1 = function (i) {
            if (Math.abs(Candy.candies[i].x - x) < checkR && Math.abs(Candy.candies[i].y - y) < checkR) {
                // showing a template candy 
                var tcandy_1 = Candy.candies[i];
                this_1.candy.addCandy(tcandy_1);
                Candy.candies.splice(i, 1);
                egret.Tween.get(tcandy_1)
                    .to({ x: x, y: y }, 100)
                    .call(function () {
                    _this.candy.removeChild(tcandy_1);
                    snake.addBody();
                });
            }
        };
        var this_1 = this;
        for (var i = 0; i < Candy.candies.length; i++) {
            _loop_1(i);
        }
    };
    // 判断与其他snake的碰撞
    Check.prototype.chekcOtherSnake = function (snakes, checkSnake) {
        if (checkSnake.stateDeath)
            return;
        var x = checkSnake.body[0].x;
        var y = checkSnake.body[0].y;
        if (x == 0 && y == 0)
            return;
        var checkR = 10;
        var _loop_2 = function (i) {
            var snake = snakes[i];
            // if the snake is dead, just quit 
            if (snake.stateDeath)
                return "continue";
            for (var j = 0; j < snake.body.length; j++) {
                var point = snake.position[j];
                if (point.x == 0 && point.y == 0)
                    continue;
                if (Math.abs(point.x - x) < checkR && Math.abs(point.y - y) < checkR) {
                    if (j == 0 && checkSnake.getLength() > snake.getLength()) {
                        return { value: void 0 };
                    }
                    this_2.candy.generateCandy(checkSnake.position);
                    checkSnake.onDeath();
                    setTimeout(function () {
                        snake.respawn();
                    }, 3000);
                    snake.stateDeath = true;
                    console.log("crush happens: " + checkSnake.nickname + " to " + snake.nickname);
                    return { value: false };
                }
            }
        };
        var this_2 = this;
        for (var i = 0; i < snakes.length; i++) {
            var state_1 = _loop_2(i);
            if (typeof state_1 === "object")
                return state_1.value;
        }
    };
    return Check;
}());
__reflect(Check.prototype, "Check");
//# sourceMappingURL=Check.js.map