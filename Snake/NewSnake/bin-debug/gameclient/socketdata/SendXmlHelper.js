var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
//////////////////////////////////////////////////////////////////////////////////////
//
//  发送数据的构造器
//
//////////////////////////////////////////////////////////////////////////////////////
var gameclient;
(function (gameclient) {
    var socketdata;
    (function (socketdata) {
        var SendXmlHelper = (function () {
            function SendXmlHelper() {
            }
            //构造登录字符串
            SendXmlHelper.buildUserLoginXml = function (userName, pwl) {
                var res = "<UserLogin><root>"
                    + "<userName><![CDATA[" + userName + "]]></userName>"
                    + "<passWord><![CDATA[" + pwl + "]]></passWord>"
                    + "</root></UserLogin></over>";
                return res;
            };
            //构造connect info字符串
            SendXmlHelper.buildConnectXml = function (name) {
                var res = "<ConnectInfo><root>"
                    + "<name><![CDATA[" + name + "]]></name>"
                    + "</root></ConnectInfo></over>";
                return res;
            };
            //构造game end info字符串
            SendXmlHelper.buildGameEndXml = function (name, rank) {
                var res = "<GameEndInfo><root>"
                    + "<name><![CDATA[" + name + "]]></name>"
                    + "<gamerank><![CDATA[" + rank + "]]></gamerank>"
                    + "</root></GameEndInfo></over>";
                return res;
            };
            return SendXmlHelper;
        }());
        socketdata.SendXmlHelper = SendXmlHelper;
        __reflect(SendXmlHelper.prototype, "gameclient.socketdata.SendXmlHelper");
    })(socketdata = gameclient.socketdata || (gameclient.socketdata = {}));
})(gameclient || (gameclient = {}));
//# sourceMappingURL=SendXmlHelper.js.map