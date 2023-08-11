package com.beiyou.test.ibatis.dao;

import com.beiyou.test.ibatis.entity.User;
import com.ibatis.db.dao.DaoException;
import com.pwl.framework.db.ibatis.dao.BaseDao;


public class UserDao extends BaseDao{

	public UserDao(){
		super();
	}
	
	public User getUserByName(String name) throws DaoException{
		return (User)this.executeQueryForObject("getUserByName", name);
	}
	
}
