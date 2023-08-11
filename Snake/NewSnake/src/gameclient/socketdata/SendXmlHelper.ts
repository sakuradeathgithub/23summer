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
		//构造connect info字符串
		public static buildConnectXml(name: string): string {
			let res: string = "<ConnectInfo><root>"
				+ "<name><![CDATA[" + name + "]]></name>"
				+ "</root></ConnectInfo></over>";
			return res;
		}
		
		//构造game end info字符串
		public static buildGameEndXml(name: string, rank: number): string {
			let res: string = "<GameEndInfo><root>"
				+ "<name><![CDATA[" + name + "]]></name>"
				+ "<gamerank><![CDATA[" + rank + "]]></gamerank>"
				+ "</root></GameEndInfo></over>";
			return res;
		}
	}
}
