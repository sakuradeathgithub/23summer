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
                _this.usernameInput = null;
                _this.passwordInput = null;
                _this.nicknameInput = null;
                _this.inButton = null;
                _this.upButton = null;
                _this.nickname = null;
                _this.username = null;
                _this.password = null;
                _this.stageWidth = 512;
                _this.init();
                return _this;
            }
            //initiate
            LoginUI.prototype.init = function () {
                // add a background picture
                var texture = RES.getRes("bg_jpg");
                var bg = new egret.Bitmap(texture);
                bg.alpha = 0.5;
                this.addChild(bg);
                // game title
                var title = new egret.TextField();
                title.text = "贪吃蛇 手柄端";
                title.x = this.stageWidth / 2;
                title.y = 100;
                title.anchorOffsetX = title.width / 2;
                title.textColor = 0x000000;
                title.size = 50;
                this.addChild(title);
                // enter nickname, unvisible and untouchable until touch sign up
                var nickname = new egret.TextField();
                nickname = new egret.TextField();
                nickname.type = egret.TextFieldType.INPUT;
                nickname.width = 300;
                nickname.height = 60;
                nickname.x = this.stageWidth / 2 - nickname.width / 2;
                nickname.y = 310;
                nickname.textColor = 0x000000;
                nickname.border = true;
                nickname.borderColor = 0x000000;
                nickname.size = 24;
                nickname.border = true;
                nickname.text = "输入昵称:";
                nickname.verticalAlign = egret.VerticalAlign.MIDDLE;
                nickname.visible = false;
                nickname.touchEnabled = false;
                this.nicknameInput = nickname;
                this.nicknameInput.addEventListener(egret.FocusEvent.FOCUS_IN, this.onFocusIn, this);
                this.addChild(this.nicknameInput);
                // enter username
                var username = new egret.TextField();
                username = new egret.TextField();
                username.type = egret.TextFieldType.INPUT;
                username.width = 300;
                username.height = 60;
                username.x = this.stageWidth / 2 - username.width / 2;
                username.y = 390;
                username.textColor = 0x000000;
                username.size = 24;
                username.border = true;
                username.text = "输入用户名:";
                username.verticalAlign = egret.VerticalAlign.MIDDLE;
                this.usernameInput = username;
                this.usernameInput.addEventListener(egret.FocusEvent.FOCUS_IN, this.onFocusIn, this);
                this.usernameInput.addEventListener(egret.FocusEvent.FOCUS_OUT, this.onFocusOut, this);
                this.addChild(this.usernameInput);
                // enter password
                var password = new egret.TextField();
                password = new egret.TextField();
                password.type = egret.TextFieldType.INPUT;
                password.width = 300;
                password.height = 60;
                password.x = this.stageWidth / 2 - password.width / 2;
                password.y = 470;
                password.textColor = 0x000000;
                password.size = 24;
                password.border = true;
                // password.displayAsPassword = true;//隐藏输入内容
                password.text = "输入密码:";
                password.verticalAlign = egret.VerticalAlign.MIDDLE;
                this.passwordInput = password;
                this.passwordInput.addEventListener(egret.FocusEvent.FOCUS_IN, this.onFocusIn, this);
                this.passwordInput.addEventListener(egret.FocusEvent.FOCUS_OUT, this.onFocusOut, this);
                this.addChild(this.passwordInput);
                // for sign in, should enter username and password
                var signIn = new egret.TextField();
                signIn.text = "登录";
                signIn.textAlign = egret.HorizontalAlign.CENTER;
                signIn.verticalAlign = egret.VerticalAlign.MIDDLE;
                signIn.width = 150;
                signIn.height = 60;
                signIn.x = this.stageWidth / 2 - signIn.width / 2 - 77;
                signIn.y = 550;
                //signIn.backgroundColor = 0x0000ff;
                signIn.border = true;
                signIn.borderColor = 0x000000;
                signIn.touchEnabled = true;
                this.inButton = signIn;
                // this.inButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onInClick, this);
                this.addChild(this.inButton);
                // for sign up, besides, should enter nickname
                var signUp = new egret.TextField();
                signUp.text = "注册";
                signUp.textAlign = egret.HorizontalAlign.CENTER;
                signUp.verticalAlign = egret.VerticalAlign.MIDDLE;
                signUp.width = 150;
                signUp.height = 60;
                signUp.x = this.stageWidth / 2 - signUp.width / 2 + 77;
                signUp.y = 550;
                //signUp.backgroundColor = 0x0000ff;
                signUp.border = true;
                signUp.borderColor = 0x000000;
                signUp.touchEnabled = true;
                this.upButton = signUp;
                // this.upButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onUpClick, this);
                this.addChild(this.upButton);
            };
            LoginUI.prototype.addInButtonEventListener = function (eventName, eventFun, eventObject) {
                this.inButton.addEventListener(eventName, eventFun, eventObject);
            };
            LoginUI.prototype.onFocusIn = function (event) {
                var target = event.currentTarget;
                if (target.text == "输入用户名:" || target.text == "输入昵称:"
                    || target.text == "输入密码:") {
                    target.text = "";
                }
                if (target == this.passwordInput) {
                    target.displayAsPassword = true;
                }
            };
            LoginUI.prototype.onFocusOut = function (event) {
                var target = event.currentTarget;
                if (target == this.usernameInput) {
                    this.username = target.text;
                }
                else if (target == this.passwordInput) {
                    this.password = target.text;
                }
                else {
                    this.nickname = target.text;
                }
            };
            return LoginUI;
        }(egret.DisplayObjectContainer));
        engine.LoginUI = LoginUI;
        __reflect(LoginUI.prototype, "gameclient.engine.LoginUI");
    })(engine = gameclient.engine || (gameclient.engine = {}));
})(gameclient || (gameclient = {}));
//# sourceMappingURL=LoginUI.js.map