package com.bin.kong.security.server.controller.chat;

import com.alibaba.fastjson.JSON;
import com.bin.kong.security.contract.common.GenericResponse;
import com.bin.kong.security.core.constants.ResponseConstants;
import com.bin.kong.security.core.constants.UserInfoConstants;
import com.bin.kong.security.core.enums.UserTypeEnum;
import com.bin.kong.security.model.chat.entity.ChatInfo;
import com.bin.kong.security.model.chat.search.ChatInfoSearch;
import com.bin.kong.security.model.user.entity.UserInfo;
import com.bin.kong.security.server.controller.BaseController;
import com.bin.kong.security.server.service.chat.IChatInfoService;
import lombok.NonNull;
import lombok.extern.slf4j.Slf4j;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.session.Session;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.util.*;

@RestController
@Slf4j
public class ChatInfoController extends BaseController {
    @Resource
    private IChatInfoService chatInfoService;
    @Value("${security.sql.filter:#{false}}")
    private Boolean sqlFilterOpen;

    /**
     * 添加chatinfo
     *
     * @param info
     * @return
     */
    @RequestMapping(value = "/chatinfos", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public GenericResponse add_chat(@RequestBody ChatInfo info, HttpServletRequest request) {
        GenericResponse response = new GenericResponse();
        try {
            info.setCreate_time(new Date());
            UserInfo userInfo = super.getUserInfo(request);
            info.setLogin_name(userInfo.getLogin_name());
            info.setUser_id(userInfo.getId());
            Integer count = chatInfoService.insert(info);
            response.setData(count);
            response.setStatus(ResponseConstants.SUCCESS_CODE);
        } catch (Exception e) {
            response.setStatus(ResponseConstants.FAIL_CODE);
            log.error("添加chatinfo异常：" + e.getCause());
        }
        return response;
    }

    /**
     * 操作chatinfo
     *
     * @param id
     * @return
     */
    @RequestMapping(value = "/chatinfos/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public GenericResponse ajax_get_chat_info_detail(@PathVariable("id") Integer id) {
        GenericResponse response = new GenericResponse();
        try {
            ChatInfo chatInfo = chatInfoService.get(id);
            response.setData(chatInfo);
            response.setStatus(ResponseConstants.SUCCESS_CODE);
        } catch (Exception e) {
            response.setStatus(ResponseConstants.FAIL_CODE);
            log.error("操作chatInfo异常：" + e.getCause());
        }
        return response;
    }


    /**
     * 操作chatinfo
     *
     * @param id
     * @return
     */
    @RequestMapping(value = "/chatinfos/{id}", method = RequestMethod.DELETE, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public GenericResponse ajax_delete_chat_info_detail(@PathVariable("id") @NonNull Integer id) {
        GenericResponse response = new GenericResponse();
        try {
            Integer count = chatInfoService.delete(id);
            response.setData(count);
            response.setStatus(ResponseConstants.SUCCESS_CODE);
        } catch (Exception e) {
            response.setStatus(ResponseConstants.FAIL_CODE);
            log.error("操作chatInfo异常：" + e.getCause());
        }
        return response;
    }


    /**
     * 搜索chatinfo 列表
     *
     * @param searchKey
     * @param type
     * @param pageNum
     * @return
     */
    @RequestMapping(value = "/chatinfos/search", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public GenericResponse search_chat_list(@RequestParam String searchKey, @RequestParam(required = false) Integer type, @RequestParam Integer pageNum, @RequestParam(required = false) Boolean openSqlHack, @RequestParam(required = false) Boolean all_chat, HttpServletRequest httpServletRequest) {
        GenericResponse response = new GenericResponse();
        try {
            ChatInfoSearch search = ChatInfoSearch.builder()
                    .pageNum(pageNum)
                    .searchKey(searchKey)
                    .type(type)
                    .build();
            UserInfo userInfo = super.getUserInfo(httpServletRequest);
            if (userInfo.getUser_type() == UserTypeEnum.USER.getCode() && null != all_chat && all_chat) {
                search.setUser_id(userInfo.getId());
            }

            List<ChatInfo> chatInfoList = new ArrayList<>();

            //根据安全开关判断 是否走不安全的代码逻辑
            if (openSqlHack != null && openSqlHack && !sqlFilterOpen) {
                chatInfoList = chatInfoService.searchListNoSafe(search);
            } else {
                chatInfoList = chatInfoService.searchList(search);
            }

            Integer count = chatInfoService.searchCount(search);

            Map<String, Object> resultMap = new HashMap<>();
            resultMap.put("count", count);
            resultMap.put("dataList", chatInfoList);
            response.setStatus(ResponseConstants.SUCCESS_CODE);
            response.setData(resultMap);
        } catch (Exception e) {
            response.setStatus(ResponseConstants.FAIL_CODE);
            if (openSqlHack != null && openSqlHack) {
                response.setMessage(JSON.toJSONString(e.getCause()));
            }
            log.error("搜索chatinfo列表异常：" + e.getCause());
        }
        return response;

    }

    /**
     * 点赞
     *
     * @param id
     * @return
     */
    @RequestMapping(value = "/chat/praise", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public GenericResponse chat_praise(@RequestParam Integer id) {
        GenericResponse response = new GenericResponse();
        Session session = SecurityUtils.getSubject().getSession();
        UserInfo userInfo = (UserInfo) session.getAttribute(UserInfoConstants.CURRENT_USER);
        if (userInfo != null) {

            Integer count = chatInfoService.chatPraise(id);
            response.setStatus(ResponseConstants.SUCCESS_CODE);
            response.setData(count);
        } else {
            response.setStatus(ResponseConstants.FAIL_CODE);
            response.setMessage("请登录后再操作！");
        }
        return response;
    }

}
