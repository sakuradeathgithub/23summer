package com.beiyou.test.action;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;

import com.beiyou.test.facade.UserFacade;
import com.beiyou.test.ibatis.entity.User;
import com.pwl.framework.action.BaseAction;
import com.pwl.framework.exception.BaseException;

public class UserLoginAction extends BaseAction {

	@Override
	public ActionForward process(ActionMapping arg0, ActionForm arg1, HttpServletRequest arg2, HttpServletResponse arg3)
			throws BaseException {
		
//		UserFacade uFacade = new UserFacade();
//		
//		User user = uFacade.getUserById(1);
//		
//		String username = user.getUsername();
//		String password = user.getPassword();
//		
//		System.out.println("username=" + username);
//		System.out.println("password=" + password);
		return null;
	}
	
	
}
