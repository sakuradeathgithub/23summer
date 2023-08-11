//////////////////////////////////////////////////////////////////////////////////////
//
//  发送数据的构造器
//
//////////////////////////////////////////////////////////////////////////////////////
module gameclient.socketdata {
	export class SendXmlHelper {
		public constructor() {

		}

		//构造登录字符串
		public static buildUserLoginXml(userName: string, pwl: string): string {
			let res: string = "<UserLogin><root>"
				+ "<userName><![CDATA[" + userName + "]]></userName>"
				+ "<passWord><![CDATA[" + pwl + "]]></passWord>"
				+ "</root></UserLogin></over>";
			return res;
		}
		//game data 字符串
		public static buildGameDataXml(angle: string, state: string): string {
			let res: string = "<GameData><root>"
				+ "<angle><![CDATA[" + angle + "]]></angle>"
				+ "<state><![CDATA[" + state + "]]></state>"
				+ "</root></GameData></over>";
			return res;
		}
		//connect info  字符串
		public static buildConnectXml(name:string): string {
			let res: string = "<ConnectInfo><root>"
				+ "<name><![CDATA[" + name + "]]></name>"
				+ "</root></ConnectInfo></over>";
			return res;
		}

	}
}
