class Snake extends egret.DisplayObjectContainer{

    //用于存储蛇位置，身体数据
    public position:egret.Point[] = null;
    public body:egret.Shape[] = null;
    public dragonbonesMC = null;

    public nickname:string = null;
    public nickTitle:egret.TextField = null;

    public stateDeath = false;

    //蛇 圆参数
    private headR = 20;
    private bodyR = 15;

    constructor(x: number = 200, y: number = 500, nickname: string = "null"){
        super();
        this.position = [];
        this.body = [];
        this.init(x, y);
        this.nickname = nickname; 
    }

    //init snake at (200, 500)
    private init(x:number, y:number){
        let headX = x;
        let headY = y;
        let headR = this.headR;
        let bodyR = this.bodyR;

        // 头部上方显示nickname
        let title = new egret.TextField();
        title.text = this.nickname;
        title.x = headX;
        title.y = headY - 100;
        title.textColor = 0x22ffff;
        title.alpha = 0.8;
        this.addChild(title);
        this.nickTitle = title;

        //加入蛇头
        let head = Params.createCircle(headX, headY, headR,0x000000, 0);
        head.anchorOffsetX = headR;
        head.anchorOffsetY = headR;
        this.position.push(new egret.Point(headX, headY));
        this.body.push(head);

        //加入蛇头动画    
        let dragonbonesData = RES.getRes("liruolingxiao_dbbin");
        let textureData = RES.getRes("liruolingxiao_json");
        let texture = RES.getRes("liruolingxiao_png");
        let factory = new dragonBones.EgretFactory();

        //解析并添加龙骨数据
        factory.parseDragonBonesData(dragonbonesData);
        factory.parseTextureAtlasData(textureData, texture);

        //创建龙骨动画实例
        let armatureName = "MovieClip";
        let animationName = "1";
        this.dragonbonesMC = factory.buildArmatureDisplay(armatureName);
        let dragonbonesMC = this.dragonbonesMC;
        dragonbonesMC.x =  headX;
        dragonbonesMC.y = headY;
        dragonbonesMC.size = headR;
        dragonbonesMC.anchorOffsetX = headR/2;
        dragonbonesMC.anchorOffsetY = headR/2;
        dragonbonesMC.invalidUpdate = true;
        dragonbonesMC.rotation = 90;

        //添加到舞台，并播放
        dragonbonesMC.animation.play(animationName);
        this.addChild(dragonbonesMC);

        //加入蛇身
        for(let i=0;i<7;i++){
            let x = headX-25*(i+1);
            let y = headY;
            let body = Params.createCircle(0, 0, bodyR, Params.randomColor(), 0.8);
            body.x = x;
            body.y = y;
            body.anchorOffsetX = bodyR/2;
            body.anchorOffsetY = bodyR/2;
            this.position.push(new egret.Point(x, y));
            this.body.push(body);
        }
        this.loadSnake();

    }

    //把蛇加入场景
    public loadSnake(){
        let body = this.body;
        for(let i=0;i<body.length;i++){
            this.addChild(body[i]);        
        }
    }

    // when eat candy, add one body
    public addBody(){
        if(this.stateDeath) return;
        let bodyR = 15;
        let body = this.body;
        let tbody = Params.createCircle(0, 0, bodyR, Params.randomColor(), 0.8);
        let dx = body[body.length-2].x - body[body.length-1].x;
        let dy = body[body.length-2].y - body[body.length-1].y;       
        let angle = Math.atan2(dy, dx);
        tbody.x = body[body.length-1].x + 25 * Math.cos(angle);
        tbody.y = body[body.length-1].y + 25 * Math.sin(angle);
        tbody.anchorOffsetX = bodyR/2;
        tbody.anchorOffsetY = bodyR/2;
        this.position.push(new egret.Point(tbody.x, tbody.y));
        this.body.push(tbody);
        this.addChild(tbody);
        // console.log("body length +1："+this.getLength());
        
    }

    public getLength(): number{
        return this.body.length;
    }
    public setNickname(nickname:string){
        this.nickname = nickname;
    }

    public onDeath(){
        this.removeChildren();
        this.body = [];
        this.position = [];
    }

    public respawn(){
        this.stateDeath = false;
        let point = Params.randomPoint();
        this.init(point.x, point.y);

    }

}