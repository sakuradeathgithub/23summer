package com.beiyou.testsocket.handler;

import java.io.ByteArrayInputStream;
import java.io.InputStream;
import java.io.UnsupportedEncodingException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.mina.core.buffer.IoBuffer;
import org.apache.mina.core.service.IoHandlerAdapter;
import org.apache.mina.core.session.IdleStatus;
import org.apache.mina.core.session.IoSession;
import org.dom4j.Document;
import org.dom4j.io.SAXReader;

import com.beiyou.test.facade.RecordFacade;
import com.beiyou.test.facade.UserFacade;
import com.beiyou.test.ibatis.entity.User;
import com.beiyou.testsocket.common.xml.QbanKillTextSendXmlHelper;
import com.beiyou.testsocket.common.xml.QbanKillTextXmlHelper;
import com.beiyou.testsocket.websocket.WebSocketCodecPacket;

public class QbanKillTextIOHandler extends IoHandlerAdapter {
	
	public Map<String, IoSession> sessions = new HashMap<>();
	
	public QbanKillTextIOHandler() {
		
	}
	
	// 鎺ユ敹璇锋眰淇℃伅
//	public void messageReceived(IoSession session, Object message) throws Exception {
////		System.out.println("message received from: "+sessions.containsValue(session));
//		// 娴嬭瘯锛歐ebSocket
//		boolean isRemoteWebSocket = session.containsAttribute("isWEB") && (true==(Boolean)session.getAttribute("isWEB"));
//		// 瑙ｆ瀽鎺ユ敹娑堟伅
//		String str = null;
//        if(isRemoteWebSocket == false){// 鏅�歴ocket锛屽垯鍙互鐩存帴璇诲彇鏁版嵁
//        	str = message.toString();
//		}else{// 鏄痺ebsocket锛屽垯浠嶪oBuffer涓鍙栦俊鎭�
//			IoBuffer buffer = (IoBuffer)message;
//			int bufferLength = buffer.limit();
//	        byte[] b = new byte[bufferLength];
//	        buffer.get(b);
//	        str = new String(b, "utf-8");
//		}
////        System.out.println("str="+str);
//        
//		// 瑙ｆ瀽鎺ユ敹娑堟伅
////        String str = message.toString();
//		if (str == null || "".equals(str.trim()) == true || str.indexOf("</over>") != -1) {
//			return;
//		}
//		Document doc = null;
//		try {
//			SAXReader saxReader = new SAXReader(false);
//        	saxReader.setFeature("http://apache.org/xml/features/disallow-doctype-decl", true);
//        	saxReader.setFeature("http://xml.org/sax/features/external-general-entities", false);
//        	saxReader.setFeature("http://xml.org/sax/features/external-parameter-entities", false);
//            InputStream inputStream = new ByteArrayInputStream(str.trim().getBytes("UTF-8"));
//			doc = saxReader.read(inputStream);
//		} catch (Exception ex) {
//			return;
//		}
//		
//		List<String> list = QbanKillTextXmlHelper.gameDateHelper(doc);
//		if(list != null){// 瑙ｆ瀽瀹屾瘯锛屽垎鍙戝鐞�
//			gameDateStreamHelper(list ,session);
//		}else{
////			logger.info("涓㈠純鍖卻tr="+str);
//		}
//	}
	
public void messageReceived(IoSession session, Object message) throws Exception {	
//		System.out.println("message received from: "+sessions.containsValue(session));
		boolean isRemoteWebSocket = session.containsAttribute("isWEB") && (true==(Boolean)session.getAttribute("isWEB"));
		
		String str = null;
        if(isRemoteWebSocket == false){
        	str = message.toString();
		}else{
			IoBuffer buffer = (IoBuffer)message;
			int bufferLength = buffer.limit();
	        byte[] b = new byte[bufferLength];
	        buffer.get(b);
	        str = new String(b, "utf-8");
		}
        
        int index = str.indexOf("</over>");
        String buffer = str.trim();
        while(index != -1) {
        	String subMessage = buffer.substring(0, index);
        	buffer = buffer.substring(index+7);
        	index = buffer.indexOf("</over>");
			if (subMessage == null || "".equals(subMessage.trim()) == true || subMessage.indexOf("</over>") != -1) {
				continue;
			}
			// 解码字符串
			Document doc = null;
			try {
				SAXReader saxReader = new SAXReader(false);
	        	saxReader.setFeature("http://apache.org/xml/features/disallow-doctype-decl", true);
	        	saxReader.setFeature("http://xml.org/sax/features/external-general-entities", false);
	        	saxReader.setFeature("http://xml.org/sax/features/external-parameter-entities", false);
	            InputStream inputStream = new ByteArrayInputStream(subMessage.trim().getBytes("UTF-8"));
				doc = saxReader.read(inputStream);
			} catch (Exception ex) {
				return;
			}
			
			List<String> list = QbanKillTextXmlHelper.gameDateHelper(doc);
			if(list != null){
				// 执行查询函数
				gameDateStreamHelper(list ,session);
			}else{
	//			logger.info("涓㈠純鍖卻tr="+str);
			}
			
        }
	}
	
	//鍙戦�佷俊鎭悗璋冪敤鐨勫嚱鏁�
	public void messageSent(IoSession session, Object message) throws Exception {
		
	}

	//澶勭悊鏈姏鍑虹殑寮傚父
	public void exceptionCaught(IoSession session, Throwable cause) throws Exception {
		try{
			session.close(true);
		}catch(Throwable ex){
			ex.printStackTrace();
		}
	}
	
	//杩炴帴瓒呮椂
	public void sessionIdle(IoSession session, IdleStatus status) throws Exception {
		try{
			session.close(true);
		}catch(Throwable ex){
			ex.printStackTrace();
		}
	}
	
	//鍒涘缓浼氳瘽
	public void sessionCreated(IoSession session) throws Exception {
		System.out.println("=================session created "+session.getId()+"====================");
//		session.setAttribute("userId", "0");
//		String ipAndPort = session.getRemoteAddress().toString();
//		session.setAttribute("ip",ipAndPort.subSequence(1,ipAndPort.indexOf(":")));
//		session.setAttribute("sessionId", "");
	}

	//杩炴帴鎵撳紑璋冪敤鐨勫嚱鏁�
	public void sessionOpened(IoSession session) throws Exception {
		
	}

	//杩炴帴鍏抽棴璋冪敤鐨勫嚱鏁�
	public void sessionClosed(IoSession session) throws Exception {
		System.out.println("=================session closed "+session.getId()+"====================");
	}
		
	
	private void getUserLoginInfo(String userName, String passWord, IoSession session){
		int success = -1;
		String tempXml = "";
		UserFacade uFacade = new UserFacade();
		User user = uFacade.getUserByName(userName);
		if(user != null && user.getPassword().equals(passWord)){
			// login successfully
			success = 1;
			// insert game start time
			//RecordFacade rFacade = new RecordFacade();
			//rFacade.insertRecord(user.getNickname());
			System.out.println("Start time inserted to database");
		}else{
			success = 0;
		}
		
		tempXml = QbanKillTextSendXmlHelper.buildLoginSuccessXml(success, user.getNickname());
		
		IoBuffer buffer = null;
		try {
			buffer = IoBuffer.wrap((tempXml.toString()).getBytes("UTF-8"));
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}
		session.write(WebSocketCodecPacket.buildPacket(buffer));
		
		// login info forward to snake from controller
		if(this.sessions.containsKey("Snake")){
			try {
				buffer = IoBuffer.wrap((tempXml.toString()).getBytes("UTF-8"));
			} catch (UnsupportedEncodingException e) {
				e.printStackTrace();
			}
			sessions.get("Snake").write(WebSocketCodecPacket.buildPacket(buffer));
		}
	}
	
	// game data to control snake move
	private void getGameData(String angle, String state, IoSession session){
		// forward game data info
		String tempXml = "";		
		tempXml = QbanKillTextSendXmlHelper.buildGameDataXml(angle, state);		
		IoBuffer buffer = null;
		try {
			buffer = IoBuffer.wrap((tempXml.toString()).getBytes("UTF-8"));
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}
		// game data send to snake from control
		if(this.sessions.containsKey("Snake")){
			sessions.get("Snake").write(WebSocketCodecPacket.buildPacket(buffer));
		}
	}
	
	// create sessions map
	private void connectInfo(String name, IoSession session){
		if(this.sessions.containsKey(name)){
			this.sessions.replace(name, session);
		}else{
			this.sessions.put(name, session);
		}
		System.out.println(sessions);
	}
	
	// when game is end, update database
	private void gameEnd(String name, String gamerank, IoSession session){
		// insert game start time
		RecordFacade rFacade = new RecordFacade();
		rFacade.updateRecord(name, gamerank);
		System.out.println("End time inserted to database");
	}
	
	/**
	 * 娓告垙鏁版嵁瑙ｆ瀽鍣�
	 * 濡傛灉鏄湰绫诲鐞嗙殑鏁版嵁,鍒欐湰绫诲鐞�,濡傛灉涓嶆槸鍒欒浆浜ょ浉搴旂被澶勭悊
	 */
	private void gameDateStreamHelper(List<String> list, IoSession session){
		if(list != null && list.size() > 0){
			String tempStr = String.valueOf(list.get(0));
			if("UserLogin".equals(tempStr) == true){// 鍙栧緱鎵�鏈夋埧闂磋缁嗕俊鎭姹�
				getUserLoginInfo(list.get(1), list.get(2),  session);
			}else if("GameData".equals(tempStr) == true){
				getGameData(list.get(1), list.get(2), session);
			}else if("ConnectInfo".equals(tempStr) == true){
				connectInfo(list.get(1), session);
			}else if("GameEndInfo".equals(tempStr) == true){
				gameEnd(list.get(1), list.get(2), session);
			}
		}
	}
}
