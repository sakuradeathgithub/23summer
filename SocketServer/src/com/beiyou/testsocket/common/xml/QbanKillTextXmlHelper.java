package com.beiyou.testsocket.common.xml;

import java.util.ArrayList;
import java.util.List;

import org.dom4j.Document;
import org.dom4j.Element;

public class QbanKillTextXmlHelper {

	public QbanKillTextXmlHelper() {
		// TODO Auto-generated constructor stub
	}
	
	/**
	 * 登录请求
	 * @param doc
	 * @return
	 */
	private static List<String> isUserLoginXml(Document doc){
		List<String> list = null;
		try{
            Element rootElement = doc.getRootElement();
			if ("UserLogin".equals(rootElement.getName()) == true) {
				list = new ArrayList<String>();
				list.add("UserLogin");
				List children = rootElement.elements();
				int size = children.size();
				
				for (int i = 0; i < size; i++) {
					Element child = (Element) children.get(i);
					list.add(child.element("userName").getText());
					list.add(child.element("passWord").getText());
				}
			}else if ("GameData".equals(rootElement.getName()) == true) {
				list = new ArrayList<String>();
				list.add("GameData");
				List children = rootElement.elements();
				int size = children.size();
				
				for (int i = 0; i < size; i++) {
					Element child = (Element) children.get(i);
					list.add(child.element("angle").getText());
					list.add(child.element("state").getText());
				}
			}else if ("ConnectInfo".equals(rootElement.getName()) == true) {
				list = new ArrayList<String>();
				list.add("ConnectInfo");
				List children = rootElement.elements();
				int size = children.size();
				
				for (int i = 0; i < size; i++) {
					Element child = (Element) children.get(i);
					list.add(child.element("name").getText());
				}
			}else if ("GameEndInfo".equals(rootElement.getName()) == true) {
				list = new ArrayList<String>();
				list.add("GameEndInfo");
				List children = rootElement.elements();
				int size = children.size();
				
				for (int i = 0; i < size; i++) {
					Element child = (Element) children.get(i);
					list.add(child.element("name").getText());
					list.add(child.element("gamerank").getText());
				}
			}
			
			
        } catch (Exception ex){
            list = null;
        }
		return list;
	}
	
	/**
	 * 数据解析处理
	 * @param doc
	 * @return List<String>
	 */
	public static List<String> gameDateHelper(Document doc){
		List<String> list = null;
		
		list = isUserLoginXml(doc);
		if(list != null && list.size() > 0){
			return list;
		}
		
		return null;
	}

}
