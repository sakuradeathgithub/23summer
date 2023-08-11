package com.beiyou.test.ibatis.entity;

import java.io.Serializable;

public class Record implements Serializable{
	private String uid;
	private String createtime;
	private String updatetime;
	private int gamerank;
	public String getUid() {
		return uid;
	}
	public void setUid(String uid) {
		this.uid = uid;
	}
	public String getCreatetime() {
		return createtime;
	}
	public void setCreatetime(String createtime) {
		this.createtime = createtime;
	}
	public String getUpdatetime() {
		return updatetime;
	}
	public void setUpdatetime(String updatetime) {
		this.updatetime = updatetime;
	}
	public int getGamerank() {
		return gamerank;
	}
	public void setGamerank(int gamerank) {
		this.gamerank = gamerank;
	}
}
