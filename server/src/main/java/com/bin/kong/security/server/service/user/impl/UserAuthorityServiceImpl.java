package com.bin.kong.security.server.service.user.impl;


import com.bin.kong.security.core.constants.UserInfoConstants;
import com.bin.kong.security.model.user.entity.UserInfo;
import com.bin.kong.security.server.service.user.IUserAuthorityService;
import com.bin.kong.security.server.service.user.IUserInfoService;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.session.Session;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import javax.annotation.Resource;

@Service
public class UserAuthorityServiceImpl implements IUserAuthorityService {

    @Resource
    private IUserInfoService userInfoService;


    /**
     * 获取用户DTO
     *
     * @return
     */
    @Override
    public void setCurrentUserToSession() {
        Session session = SecurityUtils.getSubject().getSession();
        String login_name = (String) session.getAttribute(UserInfoConstants.CURRENT_USER_NAME);
        if (!StringUtils.isEmpty(login_name)) {
            UserInfo userInfo = userInfoService.findByName(login_name);
            session.setAttribute(UserInfoConstants.CURRENT_USER, userInfo);
        }
    }

}
