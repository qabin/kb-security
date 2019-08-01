package com.bin.kong.security.server.controller;

import com.bin.kong.security.core.constants.CookieConstants;
import com.bin.kong.security.core.constants.UserInfoConstants;
import com.bin.kong.security.core.utils.PPBase64Utils;
import com.bin.kong.security.model.user.entity.UserInfo;
import com.bin.kong.security.server.service.user.IUserInfoService;
import lombok.extern.slf4j.Slf4j;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.session.Session;
import org.springframework.util.ObjectUtils;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;

@RestController
@Slf4j
public class BaseController {
    @Resource
    private IUserInfoService userInfoService;

    protected UserInfo getUserInfo() {
        return (UserInfo) SecurityUtils.getSubject().getSession().getAttribute(UserInfoConstants.CURRENT_USER);
    }


    /**
     * 获取登录用户信息
     *
     * @param request
     * @return
     */
    protected UserInfo getUserInfo(HttpServletRequest request) {
        Session session = SecurityUtils.getSubject().getSession();
        UserInfo userInfo = null;
        Cookie[] cookies = request.getCookies();
        for (Cookie cookie : cookies) {
            if (cookie.getName().equals(CookieConstants.ID_SESSION)) {
                userInfo = userInfoService.get(Integer.valueOf(cookie.getValue()));
            } else if (cookie.getName().equals(CookieConstants.BASE64_ID_SESSION)) {
                userInfo = userInfoService.get(Integer.valueOf(PPBase64Utils.decodeBase64(cookie.getValue())));
            }
        }
        if (ObjectUtils.isEmpty(userInfo))
            userInfo = (UserInfo) session.getAttribute(UserInfoConstants.CURRENT_USER);

        return userInfo;
    }

}
