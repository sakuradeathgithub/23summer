class Check{
    private snake:Snake = null;
    private point:egret.Point = null;
    private candy:Candy = null;

    //传入头部坐标，进行判断
    constructor(){

    }
    public check(snake: Snake, candy: Candy){
        if(snake.stateDeath) return;
        let x = snake.body[0].x;
        let y = snake.body[0].y;
        this.candy = candy;
        this.checkEdge(x, y, snake);
        this.checkCandy(x, y, snake);
    }

    public checkEdge(x: number, y: number, snake: Snake): boolean{
        let checkR = 10;
        if((x < checkR || x > Params.stageSize - checkR || y < checkR || y > Params.stageSize - checkR) && (!snake.stateDeath)){
            // generate candies at where it dies
            if(x == 0 && y == 0) return true;
            this.candy.generateCandy(snake.position);
            snake.onDeath();
            setTimeout(()=>{
                snake.respawn();
            },3000);
            snake.stateDeath = true;
            console.log("out of edge: X: "+x+" Y: "+y);
            return false;
        }
        return true;
    }
    public checkCandy(x: number, y: number, snake: Snake){
        if(snake.stateDeath) return;
        let checkR = 70;
        for(let i=0;i<Candy.candies.length;i++){
            if(Math.abs(Candy.candies[i].x - x) < checkR && Math.abs(Candy.candies[i].y - y) < checkR){
                // showing a template candy 
                let tcandy = Candy.candies[i];
                this.candy.addCandy(tcandy);
                Candy.candies.splice(i, 1);
                egret.Tween.get(tcandy)
                    .to({x: x, y: y}, 100)
                    .call(()=>{
                        this.candy.removeChild(tcandy);
                        snake.addBody();
                    });
            }
        }

    }

    // 判断与其他snake的碰撞
    public chekcOtherSnake(snakes:Snake[], checkSnake:Snake){
        if(checkSnake.stateDeath) return;
        let x = checkSnake.body[0].x;
        let y = checkSnake.body[0].y;
        if(x == 0 && y == 0) return;
        let checkR = 10;
        for(let i=0;i<snakes.length;i++){
            let snake = snakes[i];
            // if the snake is dead, just quit 
            if(snake.stateDeath) continue;
            for(let j=0;j<snake.body.length;j++){
                let point = snake.position[j];
                if(point.x == 0 && point.y == 0) continue;
                if(Math.abs(point.x - x) < checkR && Math.abs(point.y - y) < checkR){
                    if(j == 0 && checkSnake.getLength() > snake.getLength()){
                        // if head to head, let the min one dies
                        return;
                    }
                    this.candy.generateCandy(checkSnake.position);
                    checkSnake.onDeath();
                    setTimeout(()=>{
                        snake.respawn();
                    },3000);
                    snake.stateDeath = true;
                    console.log("crush happens: "+checkSnake.nickname +" to "+snake.nickname);
                    return false;
                }
            }
        }
    }

}