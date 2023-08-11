package com.beiyou.test.facade;

import com.beiyou.test.ibatis.dao.UserDao;
import com.beiyou.test.ibatis.entity.User;
import com.beiyou.test.util.DAONameLink;
import com.ibatis.db.dao.DaoException;
import com.pwl.framework.db.ibatis.IbatisHelper;
import com.pwl.framework.exception.BaseException;
import com.pwl.framework.facade.BaseFacade;

public class UserFacade extends BaseFacade{

	private UserDao userDao;
	
	public UserFacade(){
		userDao = (UserDao) ((IbatisHelper) helper).getDao(DAONameLink.USER_DAO);
	}
	
	/**
	 * 閫氳繃id鍙栧緱user琛ㄨ褰�
	 * @param id
	 * @return
	 * @throws BaseException
	 */
	public User getUserByName(String name) throws BaseException
	{
		User user = null;
		try
		{
			helper.beginTransaction();
			user = userDao.getUserByName(name);
			helper.commit();
		} catch (DaoException ex)
		{
			helper.rollback();
			throw new BaseException(ex);
		}catch(Exception ex){
			helper.rollback();
			throw new BaseException(ex);
		}
		return user;
	}
	
}