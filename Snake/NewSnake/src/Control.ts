class Control{
    // private snake:Snake = null;
    //private check:Check = null;

    private speed: number = 10;

    constructor(){

    }

    //move the snake 帧事件,传入移动的参数
    public moveSnake(snake: Snake, angle: number, state: string){
        if(snake.stateDeath) return;

        // control head animation rotation
        snake.dragonbonesMC.rotation = angle / (2*Math.PI) *360 + 90;

        // control move speed
        let speed = this.speed;
        let speedTimes: number = 1;
        if (state == "true") {
            speedTimes = 1.5;
        }else{
            speedTimes = 1;
        }

        // calculate parameters about movement
        let dx = speed * speedTimes * Math.cos(angle);
        let dy = speed * speedTimes * Math.sin(angle);
        let body = snake.body;
        let position = snake.position;

        snake.dragonbonesMC.rotation = angle / (2*Math.PI) *360 + 90;

        // move the head and head animation
        egret.Tween.get(snake.dragonbonesMC)
            .to({ x: snake.dragonbonesMC.x + dx, y: snake.dragonbonesMC.y + dy })
            .call(() => {});
        egret.Tween.get(body[0])
            .to({ x: snake.dragonbonesMC.x + dx, y: snake.dragonbonesMC.y + dy })
            .call(() => {});
        egret.Tween.get(snake.nickTitle)
            .to({ x: snake.dragonbonesMC.x + dx, y: snake.dragonbonesMC.y + dy - 100 })
            .call(() => {});

        // control bodies
        for(let i=1;i<body.length;i++){
            let newdy = position[i-1].y - position[i].y;
            let newdx = position[i-1].x - position[i].x;
            let angle = Math.atan2(newdy, newdx);
            let targetX = position[i-1].x;
            let targetY = position[i-1].y;
            egret.Tween.get(body[i])
                .to({x: targetX, y: targetY})
                .call(()=>{});
        }
        //更新坐标
        for(let i=0;i<position.length;i++){
            position[i].x = body[i].x;
            position[i].y = body[i].y;
        }
        
    }

    public aiMopve(aiSnake: Snake){
        if(aiSnake.stateDeath) return;
        let angle = 0;
        let checkR = 200;
        let x = aiSnake.body[0].x;
        let y = aiSnake.body[0].y;
        if(x < checkR || x > Params.stageSize - checkR || y < checkR || y > Params.stageSize - checkR){
            if(x < checkR){
                angle += 1;
            }else if(x > Params.stageSize - checkR){
                angle -= 1.5;
            }else if(y < checkR){
                angle += 2;
            }else if(y > Params.stageSize - checkR){
                angle -= 2;
            }
            angle %= Math.PI;
        }

        let state = "false";
        // control head animation rotation
        aiSnake.dragonbonesMC.rotation = angle / (2*Math.PI) *360 + 90;

        // control move speed
        let speed = this.speed;
        let speedTimes: number = 1;
        if (state == "true") {
            speedTimes = 1.5;
        }else{
            speedTimes = 1;
        }

        // calculate parameters about movement
        let dx = speed * speedTimes * Math.cos(angle);
        let dy = speed * speedTimes * Math.sin(angle);
        let body = aiSnake.body;
        let position = aiSnake.position;

        aiSnake.dragonbonesMC.rotation = angle / (2*Math.PI) *360 + 90;

        // move the head and head animation and nick name title
        egret.Tween.get(aiSnake.dragonbonesMC)
            .to({ x: aiSnake.dragonbonesMC.x + dx, y: aiSnake.dragonbonesMC.y + dy })
            .call(() => {});
        egret.Tween.get(body[0])
            .to({ x: aiSnake.dragonbonesMC.x + dx, y: aiSnake.dragonbonesMC.y + dy })
            .call(() => {});
        egret.Tween.get(aiSnake.nickTitle)
            .to({ x: aiSnake.dragonbonesMC.x + dx, y: aiSnake.dragonbonesMC.y + dy - 100})
            .call(() => {});

        // control bodies
        for(let i=1;i<body.length;i++){
            let newdy = position[i-1].y - position[i].y;
            let newdx = position[i-1].x - position[i].x;
            let angle = Math.atan2(newdy, newdx);
            let targetX = position[i-1].x;
            let targetY = position[i-1].y;
            egret.Tween.get(body[i])
                .to({x: targetX, y: targetY})
                .call(()=>{});
        }
        //更新坐标
        for(let i=0;i<position.length;i++){
            position[i].x = body[i].x;
            position[i].y = body[i].y;
        }
        
    }
}