//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////

class Main extends eui.UILayer {


    protected createChildren(): void {
        super.createChildren();

        egret.lifecycle.addLifecycleListener((context) => {
            // custom lifecycle plugin
        })

        // egret.lifecycle.onPause = () => {
        //     egret.ticker.pause();
        // }

        // egret.lifecycle.onResume = () => {
        //     egret.ticker.resume();
        // }

        //inject the custom material parser
        //注入自定义的素材解析器
        let assetAdapter = new AssetAdapter();
        egret.registerImplementation("eui.IAssetAdapter", assetAdapter);
        egret.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());


        this.runGame().catch(e => {
            console.log(e);
        })
    }

    private async runGame() {
        await this.loadResource()
        this.createGameScene();
        const result = await RES.getResAsync("description_json")
        this.startAnimation(result);
        await platform.login();
        const userInfo = await platform.getUserInfo();
        console.log(userInfo);

    }

    private async loadResource() {
        try {
            const loadingView = new LoadingUI();
            this.stage.addChild(loadingView);
            await RES.loadConfig("resource/default.res.json", "resource/");
            await this.loadTheme();
            await RES.loadGroup("preload", 0, loadingView);
            this.stage.removeChild(loadingView);
        }
        catch (e) {
            console.error(e);
        }
    }

    private loadTheme() {
        return new Promise((resolve, reject) => {
            // load skin theme configuration file, you can manually modify the file. And replace the default skin.
            //加载皮肤主题配置文件,可以手动修改这个文件。替换默认皮肤。
            let theme = new eui.Theme("resource/default.thm.json", this.stage);
            theme.addEventListener(eui.UIEvent.COMPLETE, () => {
                resolve();
            }, this);

        })
    }
    private gamelogic: gameclient.engine.Gamelogic = null;
    private snake: Snake = null;
    private aiSnakes: Snake[] = [];
    private candy: Candy = null;
    private check: Check = null;
    private control: Control = null;
    private textfield: egret.TextField;
    /**
     * 创建场景界面
     * Create scene interface
     */
    protected createGameScene(): void {
        let gamelogic = new gameclient.engine.Gamelogic();
        this.addChild(gamelogic);
        gamelogic.addEventListener("loginSuccess", this.init, this);
        this.gamelogic = gamelogic;

    }
    //initiate
    private init(){
        // create background
        let bg = new BG(Params.stageSize, Params.stageSize);
        this.addChild(bg);

        // create ui layer
        let ui = new UI();
        this.addChild(ui);

        // create candy
        let candy = new Candy();
        this.addChild(candy);
        this.candy = candy;

        // create player snake
        let snake = new Snake();
        snake.setNickname(Params.nickname);
        this.addChild(snake);
        this.snake = snake;

        // create some ai snake in scene
        for(let i=0;i<3;i++){
            let point = Params.randomPoint();
            let aiSnake = new Snake(point.x, point.y, "test"+i);
            this.addChild(aiSnake);
            this.aiSnakes.push(aiSnake);
        }

        // add control and check pattern
        let control = new Control();
        this.control = control;

        let check = new Check();
        this.check = check;

        // start frame event
        this.addEventListener(egret.Event.ENTER_FRAME, this.onFrame, this);

        // refresh score rank list
        let rankTimer = new egret.Timer(1000);
        rankTimer.addEventListener(egret.TimerEvent.TIMER, this.rankLength, this);
        rankTimer.start();

    }

    // control the snake to move by every ENTER_FRAME
    private onFrame(){
        let control = this.control;
        let check = this.check;
        
        // check head at edge and eats candy
        control.moveSnake(this.snake, Params.angle, Params.isSpeedUp);
        check.check(this.snake, this.candy);
        check.chekcOtherSnake(this.aiSnakes, this.snake);

        // check every ai snake
        for(let i=0;i<3;i++){
            control.aiMopve(this.aiSnakes[i]);
            check.check(this.aiSnakes[i], this.candy);
            // save other snakes
            let otherSnake = [...this.aiSnakes];
            otherSnake.push(this.snake);
            otherSnake.slice(i, 1);
            check.chekcOtherSnake(otherSnake, this.aiSnakes[i]);
            // console.log(otherSnake);
            
        }
    }
    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
     */
    private createBitmapByName(name: string): egret.Bitmap {
        let result = new egret.Bitmap();
        let texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }
    /**
     * 描述文件加载成功，开始播放动画
     * Description file loading is successful, start to play the animation
     */
    private startAnimation(result: Array<any>): void {
        let parser = new egret.HtmlTextParser();

        let textflowArr = result.map(text => parser.parse(text));
        let textfield = this.textfield;
        let count = -1;
        let change = () => {
            count++;
            if (count >= textflowArr.length) {
                count = 0;
            }
            let textFlow = textflowArr[count];

            // 切换描述内容
            // Switch to described content
            textfield.textFlow = textFlow;
            let tw = egret.Tween.get(textfield);
            tw.to({ "alpha": 1 }, 200);
            tw.wait(2000);
            tw.to({ "alpha": 0 }, 200);
            tw.call(change, this);
        };

        change();
    }

    /**
     * 点击按钮
     * Click the button
     */
    private onButtonClick(e: egret.TouchEvent) {
        let panel = new eui.Panel();
        panel.title = "Title";
        panel.horizontalCenter = 0;
        panel.verticalCenter = 0;
        this.addChild(panel);
    }
    private rankLength(){
        let lenArray = []
        lenArray.push({name:this.snake.nickname, score:this.snake.getLength()});
        for(let i=0;i<this.aiSnakes.length;i++){
            lenArray.push({name: this.aiSnakes[i].nickname, score: this.aiSnakes[i].getLength()});
        }
        lenArray.sort((a, b)=>b.score-a.score);
        // 显示排行榜
        for (let i = 0; i < lenArray.length; i++) {
            // console.log(`第${i + 1}名：${lenArray[i].name}，分数：${lenArray[i].score}`);
        }
                
    }
}
