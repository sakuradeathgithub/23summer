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
        var LoginUI = (function (_super) {
            __extends(LoginUI, _super);
            function LoginUI() {
                var _this = _super.call(this) || this;
                _this.connectBtn = null;
                var connectBtn = _this.connectBtn;
                if (connectBtn == null) {
                    connectBtn = new eui.Button();
                    connectBtn.label = "连接websocket";
                    _this.addChild(connectBtn);
                    connectBtn.x = 250;
                    connectBtn.y = 250;
                    _this.connectBtn = connectBtn;
                }
                return _this;
            }
            LoginUI.prototype.addConnectBtnEventListener = function (eventName, eventFun, eventObject) {
                this.connectBtn.addEventListener(eventName, eventFun, eventObject);
            };
            return LoginUI;
        }(egret.DisplayObjectContainer));
        engine.LoginUI = LoginUI;
        __reflect(LoginUI.prototype, "gameclient.engine.LoginUI");
    })(engine = gameclient.engine || (gameclient.engine = {}));
})(gameclient || (gameclient = {}));
//# sourceMappingURL=LoginUI.js.map