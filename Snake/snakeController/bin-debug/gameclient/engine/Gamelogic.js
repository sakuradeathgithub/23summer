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
var gameclient;
(function (gameclient) {
    var engine;
    (function (engine) {
        var Gamelogic = (function (_super) {
            __extends(Gamelogic, _super);
            function Gamelogic() {
                var _this = _super.call(this) || this;
                _this.gameSocket = null;
                _this.stringBuffer = ""; //数据缓冲区
                _this.loginUI = null;
                _this.controlUI = null;
                _this.nickname = null;
                var loginUI = _this.loginUI;
                if (loginUI == null) {
                    loginUI = new engine.LoginUI();
                    _this.addChild(loginUI);
                    // click to connect server
                    _this.clickConnectBtn();
                    loginUI.addInButtonEventListener(egret.TouchEvent.TOUCH_TAP, _this.clickLoginBtn, _this);
                    _this.loginUI = loginUI;
                    _this.addEventListener("loginSuccess", _this.changeUI, _this);
                    _this.addEventListener("loginSuccess", _this.startControl, _this);
                }
                return _this;
            }
            // change screen children
            Gamelogic.prototype.changeUI = function (event) {
                this.removeChild(this.loginUI);
                // add nick name title and buttons
                var controlUI = new gameclient.engine.ControlUI(this.nickname);
                this.addChild(controlUI);
                this.controlUI = controlUI;
            };
            // start send control info to server, add one frame event
            Gamelogic.prototype.startControl = function () {
                var timer = new egret.Timer(100);
                timer.addEventListener(egret.TimerEvent.TIMER, this.control, this);
                timer.start();
            };
            Gamelogic.prototype.control = function () {
                var angle = engine.Joystick.angle.toString();
                var state = engine.Button.isSpeedUp;
                var sendXml = gameclient.socketdata.SendXmlHelper.buildGameDataXml(angle, state); //构造活跃信息xml
                this.sendXmlToServer(sendXml); //发送xml文档到服务器
                console.log("send to server: " + angle + " " + state);
            };
            Gamelogic.prototype.clickConnectBtn = function () {
                var url = "localhost";
                var port = 8205;
                // websocket
                var gameSocket = this.gameSocket;
                if (gameSocket != null) {
                    this.disposeGameSocket();
                }
                gameSocket = new egret.WebSocket(); //构造socket
                this.gameSocket = gameSocket;
                gameSocket.addEventListener(egret.Event.CLOSE, this.closeHandler, this); //socket关闭
                gameSocket.addEventListener(egret.Event.CONNECT, this.connectHandler, this); //socket连接
                gameSocket.addEventListener(egret.IOErrorEvent.IO_ERROR, this.ioErrorHandler, this); //socket ioError
                gameSocket.addEventListener(egret.ProgressEvent.SOCKET_DATA, this.webSocketDataHandler, this); //接收数据
                gameSocket.connect(url, port); //链接socket 
            };
            Gamelogic.prototype.clickLoginBtn = function (event) {
                var username = this.loginUI.username;
                var password = this.loginUI.password;
                var sendXml = gameclient.socketdata.SendXmlHelper.buildUserLoginXml(username, password); //构造活跃信息xml
                this.sendXmlToServer(sendXml); //发送xml文档到服务器
                console.log("login info sended");
            };
            // 服务器发送过来的数据
            Gamelogic.prototype.webSocketDataHandler = function (event) {
                this.socketDataHandler(this.gameSocket.readUTF());
            };
            // 服务器发送过来的数据
            Gamelogic.prototype.socketDataHandler = function (str) {
                str = gameclient.util.ChatUtil.trim(str);
                if (str != "") {
                    var stringBuffer = this.stringBuffer;
                    stringBuffer += str;
                    var index = stringBuffer.indexOf("</over>"); //查找结束符号
                    while (index != -1) {
                        var distr = stringBuffer.substring(0, index);
                        stringBuffer = stringBuffer.substring(index + 7, stringBuffer.length);
                        this.gameDataHelper(distr); //把数据转交个游戏数据分析方法处理
                        index = stringBuffer.indexOf("</over>"); //查找结束符号
                    }
                    this.stringBuffer = stringBuffer;
                }
            };
            /**
             * 释放Socket连接
             */
            Gamelogic.prototype.disposeGameSocket = function () {
                // 测试：websocket
                var gameSocket = this.gameSocket;
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
                    gameSocket.close(); //关闭连接
                    this.gameSocket = null;
                }
            };
            //连接关闭
            Gamelogic.prototype.closeHandler = function (event) {
                console.log("连接关闭");
            };
            //socket连接成功
            Gamelogic.prototype.connectHandler = function (event) {
                console.log("连接成功");
                var sendXml = gameclient.socketdata.SendXmlHelper.buildConnectXml("Control"); //构造活跃信息xml
                this.sendXmlToServer(sendXml); //发送xml文档到服务器
            };
            //连接失败
            Gamelogic.prototype.ioErrorHandler = function (event) {
                console.log("连接失败");
            };
            //发送数据到服务器端
            Gamelogic.prototype.sendXmlToServer = function (xmlStr) {
                //websocket
                var gameSocket = this.gameSocket;
                if (gameSocket != null && gameSocket.connected == true) {
                    // this.gameSocket.writeUTFBytes(xmlStr + "\n");
                    gameSocket.writeUTF(xmlStr + "\n");
                    gameSocket.flush(); //对套接字输出缓冲区中积累的所有数据进行刷新
                }
            };
            /**
             * 登录返回信息
             */
            /* 游戏数据分析方法
            * 游戏数据处理类,该类中发现如果回来的数据为本类处理的数据
            * 则处理数据,如果是GameLogicEngine类处理的数据,就把数据传送给GameLogicEngine类的gameDataHelper方法
            */
            Gamelogic.prototype.gameDataHelper = function (xmlStr) {
                // egret.log(xmlStr);
                var tempList = gameclient.socketdata.XmlDataHelper.dateHelper(xmlStr); //解析数据,返回数据组数,如果该数组为null,表示不能解析成功
                if (tempList != null) {
                    if (tempList[0] == "LoginSuccess") {
                        console.log("login result: " + tempList[1]);
                        this.nickname = tempList[2];
                        if (tempList[1] == 1) {
                            egret.Event.dispatchEvent(this, "loginSuccess");
                        }
                    }
                }
            };
            return Gamelogic;
        }(egret.DisplayObjectContainer));
        engine.Gamelogic = Gamelogic;
        __reflect(Gamelogic.prototype, "gameclient.engine.Gamelogic");
    })(engine = gameclient.engine || (gameclient.engine = {}));
})(gameclient || (gameclient = {}));
//# sourceMappingURL=Gamelogic.js.map