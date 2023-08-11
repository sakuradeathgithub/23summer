module gameclient.engine{
    export class Gamelogic extends egret.DisplayObjectContainer{
        private gameSocket: egret.WebSocket = null;

        private stringBuffer: string = "";//数据缓冲区

        private loginUI: LoginUI = null;

        public constructor(){
            super();

            let loginUI = this.loginUI;
            if(loginUI == null) {
                loginUI = new LoginUI();
                this.addChild(loginUI);
                // add connect button and login success button
                loginUI.addConnectBtnEventListener(egret.TouchEvent.TOUCH_TAP, this.clickConnectBtn, this);
                loginUI.addConnectBtnEventListener("loginSuccess", this.onLoginSuccess, this);
                
            }
        }

        // try to connect the server, continue moniter server info
        private clickConnectBtn(event: egret.Event): void {
            //test code
            egret.Event.dispatchEvent(this, "loginSuccess");
            //
            let url = "localhost";
            let port = 8205;

            // websocket
            let gameSocket = this.gameSocket;
            if (gameSocket != null) {// 如果已经打开了Socket 则先关闭
                this.disposeGameSocket();
            }
            gameSocket = new egret.WebSocket(); //构造socket
            this.gameSocket = gameSocket;
            gameSocket.addEventListener(egret.Event.CLOSE, this.closeHandler, this); //socket关闭
            gameSocket.addEventListener(egret.Event.CONNECT, this.connectHandler, this); //socket连接
            gameSocket.addEventListener(egret.IOErrorEvent.IO_ERROR, this.ioErrorHandler, this);//socket ioError
            gameSocket.addEventListener(egret.ProgressEvent.SOCKET_DATA, this.webSocketDataHandler, this); //接收数据
            gameSocket.connect(url, port);//链接socket

        }

        // after login successfully, change scene
        private onLoginSuccess(){
            this.removeChild(this.loginUI);
            console.log("remove login ui");
            
            // start world timer
            let time = new Time();
            this.addChild(time);
            time.startGame();
            
            // game end event listener
            time.addEventListener("GameEnd", ()=>{
                // send game end info to update database
                let sendXml: string = socketdata.SendXmlHelper.buildGameEndXml(this.name, 1);//构造活跃信息xml
                this.sendXmlToServer(sendXml);//发送xml文档到服务器
            }, this);
                    
        }

        // 服务器发送过来的数据
        private webSocketDataHandler(event: egret.ProgressEvent): void {
            this.socketDataHandler(this.gameSocket.readUTF());
            console.log("get game data from server");
            
        }

        // 服务器发送过来的数据
        private socketDataHandler(str: string): void {
            str = util.ChatUtil.trim(str);
            if (str != "") {
                let stringBuffer = this.stringBuffer;
                stringBuffer += str;
                let index: number = stringBuffer.indexOf("</over>");//查找结束符号
                while (index != -1) {
                    let distr: string = stringBuffer.substring(0, index);
                    stringBuffer = stringBuffer.substring(index + 7, stringBuffer.length);
                    this.gameDataHelper(distr);//把数据转交个游戏数据分析方法处理
                    index = stringBuffer.indexOf("</over>");//查找结束符号
                }
                this.stringBuffer = stringBuffer;
            }
        }

        /**
         * 释放Socket连接
         */
        private disposeGameSocket(): void {
            // 测试：websocket
            let gameSocket = this.gameSocket;
            if (gameSocket != null) {
                if (gameSocket.hasEventListener(egret.Event.CLOSE)) {
                    gameSocket.removeEventListener(egret.Event.CLOSE, this.closeHandler, this);
                }
                if (gameSocket.hasEventListener(egret.Event.CONNECT)) {
                    gameSocket.removeEventListener(egret.Event.CONNECT, this.connectHandler, this);
                }
                if (gameSocket.hasEventListener(egret.IOErrorEvent.IO_ERROR)) {
                    gameSocket.removeEventListener(egret.IOErrorEvent.IO_ERROR, this.ioErrorHandler, this);
                }
                if (gameSocket.hasEventListener(egret.ProgressEvent.SOCKET_DATA)) {
                    gameSocket.removeEventListener(egret.ProgressEvent.SOCKET_DATA, this.webSocketDataHandler, this);
                }
                gameSocket.close();//关闭连接
                this.gameSocket = null;
            }
        }

        //连接关闭
        private closeHandler(event: egret.Event): void {
            console.log("连接关闭");
        }

        //socket连接成功
        private connectHandler(event: egret.Event): void {
            console.log("连接成功");

            // when connect successfully send name to server
            let sendXml: string = socketdata.SendXmlHelper.buildConnectXml("Snake");//构造活跃信息xml
            this.sendXmlToServer(sendXml);//发送xml文档到服务器
        }

        //连接失败
        private ioErrorHandler(event: egret.IOErrorEvent): void {
            console.log("连接失败");
        }

         //发送数据到服务器端
        private sendXmlToServer(xmlStr: string): void {
            //websocket
            let gameSocket = this.gameSocket;
            if (gameSocket != null && gameSocket.connected == true) {
                // this.gameSocket.writeUTFBytes(xmlStr + "\n");
                gameSocket.writeUTF(xmlStr + "\n");
                gameSocket.flush();//对套接字输出缓冲区中积累的所有数据进行刷新
            }
        }

        /**
		 * 登录返回信息
		 */
        private checkSuccess(success: string): void {
            console.log("登录结果=" + success);
            if(success == "1"){
                egret.Event.dispatchEvent(this, "loginSuccess");
            }
        }
        

        /* 游戏数据分析方法
		* 游戏数据处理类,该类中发现如果回来的数据为本类处理的数据
		* 则处理数据,如果是GameLogicEngine类处理的数据,就把数据传送给GameLogicEngine类的gameDataHelper方法
		*/
        private gameDataHelper(xmlStr: string): void {
            // egret.log(xmlStr);
            let tempList: Array<any> = socketdata.XmlDataHelper.dateHelper(xmlStr);//解析数据,返回数据组数,如果该数组为null,表示不能解析成功
            // console.log(tempList);
            if (tempList != null) {
                if (tempList[0] == "LoginSuccess") {//如果是登录信息
                    this.checkSuccess(tempList[1]);
                    Params.nickname = tempList[2];
                }else if(tempList[0] == "GameData"){
                    Params.angle = parseFloat(tempList[1]);
                    Params.isSpeedUp = tempList[2];
                      
                }
            }
        }
		
    }
}