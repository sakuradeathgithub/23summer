class Time extends egret.DisplayObjectContainer{
    private timer:egret.Timer = null;
    private textField:egret.TextField = null;
    private gameTime:number = 60 * 5;

    constructor(){
        super();
        //1000ms 一跳，即为一秒
        this.timer = new egret.Timer(1000);
        let timer = this.timer;
        timer.repeatCount = this.gameTime;
        timer.addEventListener(egret.TimerEvent.TIMER, this.onTimerTick, this);
        timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.onTimerComplete, this);

        this.textField = new egret.TextField();
        let textField = this.textField;
        textField.x = 10;
        textField.y = 10;
        textField.textColor = 0xffffff;
        textField.size = 24;
        textField.bold = true;

        this.addChild(this.textField);
        
    }
    //游戏开始，计时开始
    public startGame(){
        this.timer.start();
    }

    //格式化时间
    private formatTime(time:number):string{
        let minutes = Math.floor(time/60);
        let seconds = time%60;
        return minutes+":"+seconds;
    }
    private onTimerTick(event:egret.TimerEvent){
        this.gameTime--;
        this.textField.text = this.formatTime(this.gameTime);
    }
    private onTimerComplete(event:egret.TimerEvent){
        //计时结束
        if(this.gameTime <= 0){
            console.log("time end");
            egret.Event.dispatchEvent(this, "GameEnd")
            //this.showWinner();
        }
    }

    // private showWinner(){
    //     let k = 0;
    //     let array = this.lenRank;
    //     for(let i=0;i<array.length;i++){
    //        k =  array[k].length < array[i].length ? i : k;
    //     }

    //     let textField = new egret.TextField();
    //     textField.width = 500;
    //     textField.height = 200;
    //     textField.text = "Winner: "+array[k].name + " length: "+array[k].length.toString();
    //     // textField.x = StaticItems.uiLayer.width / 2;
    //     // textField.y = StaticItems.uiLayer.height / 2;
    //     textField.verticalAlign = egret.VerticalAlign.MIDDLE;
    //     textField.textAlign = egret.HorizontalAlign.CENTER;
    //     textField.textColor = 0x000000;
    //     textField.size = 35;
    //     textField.bold = true;
    //     console.log(textField.text);

    //     this.addChild(textField);
    // }

}