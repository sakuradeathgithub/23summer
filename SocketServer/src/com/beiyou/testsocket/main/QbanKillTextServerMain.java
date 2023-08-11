package com.beiyou.testsocket.main;

import java.net.InetSocketAddress;

import org.apache.mina.core.service.IoAcceptor;
import org.apache.mina.core.session.IdleStatus;
import org.apache.mina.filter.codec.ProtocolCodecFilter;
import org.apache.mina.filter.logging.LoggingFilter;
import org.apache.mina.transport.socket.nio.NioSocketAcceptor;

import com.beiyou.testsocket.handler.QbanKillTextIOHandler;
import com.beiyou.testsocket.websocket.WebSocketCodecFactory;
import com.pwl.framework.configure.GameCoreConfig;

public class QbanKillTextServerMain {

	
	private static QbanKillTextIOHandler killIOHandler = null;
	
	public QbanKillTextServerMain() {
	}

	/**
	 * @param args
	 */
	public static void main(String[] args) {
		int port = 8205;
		try{
			String databaseFile = "D:\\snakeWork\\SocketServer\\src\\database.properties";
			String daoFile = "D:\\snakeWork\\SocketServer\\src\\dao.xml";
			String logFile = "D:\\snakeWork\\SocketServer\\src\\log4j.xml";
			GameCoreConfig.configGame(databaseFile, daoFile, logFile);
		}catch(Exception ex){
			//
		}
		IoAcceptor acceptor = new NioSocketAcceptor();

		acceptor.getFilterChain().addLast("logger", new LoggingFilter());
//		acceptor.getFilterChain().addLast("codec", new ProtocolCodecFilter(new TextLineCodecFactory(Charset.forName("UTF-8"))));
		acceptor.getFilterChain().addLast("codec", new ProtocolCodecFilter(new WebSocketCodecFactory()));// 娴嬭瘯锛歸ebsocket

		killIOHandler = new QbanKillTextIOHandler();
		
		acceptor.setHandler(killIOHandler);
		acceptor.getSessionConfig().setReadBufferSize(1024);
		acceptor.getSessionConfig().setWriteTimeout(120);//璁剧疆鍐欒秴鏃朵负120绉�
		acceptor.getSessionConfig().setIdleTime(IdleStatus.BOTH_IDLE, 15*60);//璁剧疆15鍒嗛挓鍚庤秴鏃�
		try{
			acceptor.bind(new InetSocketAddress(port));
		}catch(Exception ex){
//			logger.error(ex);
		}

	}
}
