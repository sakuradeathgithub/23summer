package com.beiyou.testsocket.common.xml;

public class QbanKillTextSendXmlHelper {

	public QbanKillTextSendXmlHelper() {
		// TODO Auto-generated constructor stub
	}
	
	/*
	 * 瀛楃涓茬粨鏉熸爣蹇�
	 */
	private static String lastStr = "</over>";
	
	
	/**
	 * 鍙戦�佺櫥褰曠粨鏋�
	 * @param success
	 * @return String
	 */
	public static String buildLoginSuccessXml(int success, String nickname){
		String xmlHead = "<LoginSuccess>";
		String xmlFoot = "</LoginSuccess>";
		StringBuffer result = new StringBuffer();
		result.append("<root>");
		result.append("<success>" + success+ "</success>");
		result.append("<nickname>" + nickname+ "</nickname>");
		result.append("</root>");
		return xmlHead + result.toString() + xmlFoot+lastStr;
	}
	public static String buildGameDataXml(String angle, String state){
		String xmlHead = "<GameData>";
		String xmlFoot = "</GameData>";
		StringBuffer result = new StringBuffer();
		result.append("<root>");
		result.append("<angle>" + angle+ "</angle>");
		result.append("<state>" + state+ "</state>");
		result.append("</root>");
		return xmlHead + result.toString() + xmlFoot+lastStr;
	}
}
