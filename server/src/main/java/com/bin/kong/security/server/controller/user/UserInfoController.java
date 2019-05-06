package com.bin.kong.security.server.controller.user;

import com.bin.kong.security.contract.common.GenericResponse;
import com.bin.kong.security.contract.user.request.LoginRequest;
import com.bin.kong.security.contract.user.request.RegisterRequest;
import com.bin.kong.security.contract.user.response.LoginResponse;
import com.bin.kong.security.core.constants.CookieConstants;
import com.bin.kong.security.core.constants.ResponseConstants;
import com.bin.kong.security.core.constants.UserInfoConstants;
import com.bin.kong.security.core.enums.CookieTypeEnum;
import com.bin.kong.security.core.enums.EncryptTypeEnum;
import com.bin.kong.security.core.utils.PPAesUtils;
import com.bin.kong.security.core.utils.PPBase64Utils;
import com.bin.kong.security.core.utils.PPMd5Utils;
import com.bin.kong.security.core.utils.PPRsaUtils;
import com.bin.kong.security.model.user.entity.UserInfo;
import com.bin.kong.security.server.service.user.IUserInfoService;
import lombok.extern.slf4j.Slf4j;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.*;
import org.apache.shiro.session.Session;
import org.apache.shiro.subject.Subject;
import org.springframework.http.MediaType;
import org.springframework.util.ObjectUtils;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Date;


@RestController
@Slf4j
public class UserInfoController {
    @Resource
    private IUserInfoService userInfoService;

    /**
     * 登录接口
     *
     * @param request
     * @return
     */
    @RequestMapping(value = "/login", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public GenericResponse login(@RequestBody LoginRequest request, HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse) {
        GenericResponse response = new GenericResponse();
        Subject subject = SecurityUtils.getSubject();
        response.setStatus(ResponseConstants.FAIL_CODE);
        UserInfo info = userInfoService.findByName(request.getLogin_name());
        if (info.getId() == null || info.getId() <= 0) {
            response.setMessage("账号不存在");
            response.setStatus(ResponseConstants.STATUS_WRONG_PWD);
            return response;
        }
        UsernamePasswordToken token = new UsernamePasswordToken(request.getLogin_name(), encrypPwd(info.getEncrypt_type(), request.getLogin_pwd()));
        try {
            //登录验证
            subject.login(token);
            LoginResponse loginResponse = LoginResponse.builder()
                    .token(subject.getSession().getId()).login_name(request.getLogin_name()).build();
            response.setStatus(ResponseConstants.SUCCESS_CODE);

            if (request.getCookie_type() == CookieTypeEnum.ID.getCode()) {
                //登录成功   设置ID_COOKIE
                addCookieAndDelSession(httpServletRequest, httpServletResponse, CookieConstants.ID_SESSION, String.valueOf(info.getId()), request.getHttp_only());
            }

            if (request.getCookie_type() == CookieTypeEnum.BASE64_ID.getCode()) {
                //登录成功   设置BASE64_ID_COOKIE
                addCookieAndDelSession(httpServletRequest, httpServletResponse, CookieConstants.BASE64_ID_SESSION, PPBase64Utils.encodeBase64(info.getId().toString()), request.getHttp_only());
            }

            if (request.getCookie_type() == CookieTypeEnum.SESSION_ID.getCode()) {
                //登录成功   设置BASE64_ID_COOKIE
                addCookieAndDelSession(httpServletRequest, httpServletResponse, CookieConstants.KB_SECURITY_SESSIONID, SecurityUtils.getSubject().getSession().getId() == null ? null : (String) SecurityUtils.getSubject().getSession().getId(), request.getHttp_only());
            }

            response.setMessage("登录成功");
            response.setData(loginResponse);
        } catch (UnknownAccountException e) {
            response.setMessage("账号不存在");
            response.setStatus(ResponseConstants.STATUS_WRONG_PWD);
        } catch (IncorrectCredentialsException e) {
            response.setMessage("用户名/密码不正确");
            response.setStatus(ResponseConstants.STATUS_WRONG_PWD);
        } catch (LockedAccountException e) {
            response.setMessage("账号已锁定");
            response.setStatus(ResponseConstants.STATUS_OTHER);
        } catch (AuthenticationException e) {
            response.setMessage("登录异常:" + e.toString());
            response.setStatus(ResponseConstants.STATUS_OTHER);
        }
        return response;

    }

    /**
     * 添加cookie
     *
     * @param response
     * @param name
     * @param value
     */
    private void addCookieAndDelSession(HttpServletRequest request, HttpServletResponse response, String name, String value, Boolean httpOnly) {
        Cookie cookie = new Cookie(name, null);
        cookie.setHttpOnly(httpOnly);
        cookie.setPath("/");
        cookie.setValue(value);
        response.addCookie(cookie);
        // 删除非本次的cookie
        if (null != request.getCookies())
            for (Cookie requestCookie : request.getCookies()) {
                if (requestCookie.getName().contains("SESSION") && !requestCookie.getName().equals(name)) {
                    Cookie session = new Cookie(requestCookie.getName(), null);
                    session.setMaxAge(0);
                    session.setPath("/");
                    session.setValue(null);
                    response.addCookie(session);
                }
            }
    }

    /**
     * 删除session
     *
     * @param request
     * @param response
     */
    private void delSession(HttpServletRequest request, HttpServletResponse response) {
        Cookie session = new Cookie(CookieConstants.KB_SECURITY_SESSIONID, null);
        session.setMaxAge(0);
        session.setPath("/");
        session.setValue(null);
        response.addCookie(session);
    }

    /**
     * 退出接口
     *
     * @return
     */
    @RequestMapping(value = "/logout", method = RequestMethod.GET)
    public GenericResponse logout(HttpServletRequest request, HttpServletResponse response) {
        GenericResponse genericResponse = new GenericResponse();
        try {
            SecurityUtils.getSubject().logout();
            if (request.getCookies() != null)
                for (Cookie cookie : request.getCookies()) {
                    if (cookie.getName().equals(CookieConstants.ID_SESSION) || cookie.getName().equals(CookieConstants.BASE64_ID_SESSION)) {
                        cookie.setMaxAge(0);
                        cookie.setValue(null);
                        cookie.setPath("/");
                        response.addCookie(cookie);
                    }
                }
            genericResponse.setStatus(ResponseConstants.SUCCESS_CODE);
            genericResponse.setMessage("退出成功");
        } catch (Exception e) {
            log.error("退出异常：" + e.getCause());
            genericResponse.setStatus(ResponseConstants.FAIL_CODE);
        }
        return genericResponse;

    }

    /**
     * 获取用户信息
     *
     * @return
     */
    @RequestMapping(value = "/user/info", method = RequestMethod.GET)
    public GenericResponse get_user_info(HttpServletRequest request, HttpServletResponse response) {
        GenericResponse genericResponse = new GenericResponse();
        try {
            Session session = SecurityUtils.getSubject().getSession();

            UserInfo userInfo = null;
            Cookie[] cookies = request.getCookies();
            for (Cookie cookie : cookies) {
                if (cookie.getName().equals(CookieConstants.ID_SESSION)) {
                    userInfo = userInfoService.get(Integer.valueOf(cookie.getValue()));
                    delSession(request, response);
                } else if (cookie.getName().equals(CookieConstants.BASE64_ID_SESSION)) {
                    userInfo = userInfoService.get(Integer.valueOf(PPBase64Utils.decodeBase64(cookie.getValue())));
                    delSession(request, response);
                }
            }
            if (ObjectUtils.isEmpty(userInfo))
                userInfo = (UserInfo) session.getAttribute(UserInfoConstants.CURRENT_USER);
            if (userInfo != null && userInfo.getId() != null) {
                genericResponse.setData(userInfo);
                genericResponse.setStatus(ResponseConstants.SUCCESS_CODE);
                genericResponse.setMessage("获取用户信息成功");
            } else {
                genericResponse.setStatus(ResponseConstants.STATUS_UNLOGIN);
                genericResponse.setMessage("未获取到登录信息");
            }
        } catch (Exception e) {
            genericResponse.setStatus(ResponseConstants.FAIL_CODE);
        }
        return genericResponse;

    }

    /**
     * 注册
     *
     * @param request
     * @return
     */
    @RequestMapping(value = "/register", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public GenericResponse register_user_info(@RequestBody RegisterRequest request) {
        GenericResponse response = new GenericResponse();
        try {
            UserInfo userInfo = userInfoService.findByName(request.getLogin_name());
            if (userInfo.getId() != null) {
                response.setStatus(ResponseConstants.FAIL_CODE);
                response.setMessage("账号已存在！");
                return response;
            }

            Integer count = userInfoService.insert(UserInfo.builder()
                    .login_name(request.getLogin_name())
                    .login_pwd(encrypPwd(request.getEncrypt_type(), request.getLogin_pwd()))
                    .create_time(new Date())
                    .encrypt_type(request.getEncrypt_type())
                    .update_time(new Date())
                    .build());

            //注册成功后，自动登录
            UsernamePasswordToken token = new UsernamePasswordToken(request.getLogin_name(), encrypPwd(request.getEncrypt_type(), request.getLogin_pwd()));
            SecurityUtils.getSubject().login(token);

            response.setStatus(ResponseConstants.SUCCESS_CODE);
            response.setData(count);
        } catch (Exception e) {
            response.setStatus(ResponseConstants.FAIL_CODE);
            response.setMessage("账号注册异常！");
        }
        return response;
    }

    /**
     * 获取加密后的密码
     *
     * @param encrypType
     * @param pwd
     * @return
     */
    private String encrypPwd(Integer encrypType, String pwd) {
        switch (EncryptTypeEnum.getByCode(encrypType)) {
            case NO_ENCRYPT:
                return pwd;
            case BASE64:
                return PPBase64Utils.encodeBase64(pwd);
            case MD5:
                return PPMd5Utils.encodeMd5(pwd);
            case AES:
                return PPAesUtils.encodeAES(pwd);
            case RSA:
                return PPRsaUtils.encodeRsaByPriKey(pwd, PPRsaUtils.KB_SECURITY_PRIVATE_KEY);
            default:
                return null;
        }
    }
}
