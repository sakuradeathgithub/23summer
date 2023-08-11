package com.beiyou.test.ibatis.dao;

import com.beiyou.test.ibatis.entity.Record;
import com.ibatis.db.dao.DaoException;
import com.pwl.framework.db.ibatis.dao.BaseDao;

public class RecordDao extends BaseDao{

	public RecordDao(){
		super();
	}
	
	public void insertRecord(Record record) throws DaoException{
		this.executeQueryForObject("insertRecord", record);
	}
	public void updateRecord(Record record) throws DaoException{
		this.executeQueryForObject("updateRecord", record);
	}
}