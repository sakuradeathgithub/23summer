package com.beiyou.test.facade;

import java.time.LocalDateTime;

import com.beiyou.test.ibatis.dao.RecordDao;
import com.beiyou.test.ibatis.entity.Record;
import com.beiyou.test.util.DAONameLink;
import com.ibatis.db.dao.DaoException;
import com.pwl.framework.db.ibatis.IbatisHelper;
import com.pwl.framework.exception.BaseException;
import com.pwl.framework.facade.BaseFacade;

public class RecordFacade extends BaseFacade{

	private RecordDao recordDao;
	
	public RecordFacade(){
		recordDao = (RecordDao) ((IbatisHelper) helper).getDao(DAONameLink.RECORD_DAO);
	}
	
	/**
	 * 閫氳繃id鍙栧緱user琛ㄨ褰�
	 * @param id
	 * @return
	 * @throws BaseException
	 */
	// relying on using time
	public Record insertRecord(String name) throws BaseException
	{
		Record record = new Record();
		record.setUid(name);
		record.setCreatetime(LocalDateTime.now().toString());
		try
		{
			helper.beginTransaction();
			recordDao.insertRecord(record);
			helper.commit();
		} catch (DaoException ex)
		{
			helper.rollback();
			throw new BaseException(ex);
		}catch(Exception ex){
			helper.rollback();
			throw new BaseException(ex);
		}
		return record;
	}
	public Record updateRecord(String name, String gamerank) throws BaseException
	{
		Record record = new Record();		
		record.setUid(name);
		record.setUpdatetime(LocalDateTime.now().toString());
		record.setGamerank(Integer.parseInt(gamerank));
		try
		{
			helper.beginTransaction();
			recordDao.updateRecord(record);
			helper.commit();
		} catch (DaoException ex)
		{
			helper.rollback();
			throw new BaseException(ex);
		}catch(Exception ex){
			helper.rollback();
			throw new BaseException(ex);
		}
		return record;
	}
	
}
