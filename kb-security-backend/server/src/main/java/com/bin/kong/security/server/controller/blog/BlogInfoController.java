package com.bin.kong.security.server.controller.blog;

import com.bin.kong.security.contract.common.GenericResponse;
import com.bin.kong.security.core.constants.ResponseConstants;
import com.bin.kong.security.model.blog.entity.BlogInfo;
import com.bin.kong.security.server.service.blog.IBlogInfoService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.util.Date;
import java.util.List;

@RestController
@Slf4j
public class BlogInfoController {
    @Resource
    private IBlogInfoService blogInfoService;

    /**
     * 获取博客列表
     *
     * @return
     */
    @RequestMapping(value = "/blogs", method = RequestMethod.GET)
    public GenericResponse searchList() {

        GenericResponse response = new GenericResponse();

        try {
            List<BlogInfo> blogInfoList = blogInfoService.selectList(BlogInfo.builder().build());
            response.setData(blogInfoList);
            response.setStatus(ResponseConstants.SUCCESS_CODE);
        } catch (Exception e) {
            log.error("查询博客列表异常：" + e);
            response.setStatus(ResponseConstants.FAIL_CODE);
        }
        return response;
    }

    /**
     * 添加博客
     *
     * @param info
     * @return
     */
    @RequestMapping(value = "/blog", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public GenericResponse insert(@RequestBody BlogInfo info, HttpServletRequest request) {
        GenericResponse response = new GenericResponse();

        try {
            Integer count = null;
            if (request.getMethod().toUpperCase().equals(HttpMethod.POST.name())) {
                count = blogInfoService.insert(BlogInfo.builder()
                        .content(info.getContent())
                        .title(info.getTitle())
                        .create_time(new Date())
                        .update_time(new Date())
                        .build());
            } else if (request.getMethod().toUpperCase().equals(HttpMethod.PATCH.name())) {
                count = blogInfoService.update(BlogInfo.builder()
                        .update_time(new Date())
                        .title(info.getTitle())
                        .content(info.getContent())
                        .id(info.getId())
                        .build());
            }
            response.setStatus(ResponseConstants.SUCCESS_CODE);
            response.setData(count);
        } catch (Exception e) {
            log.error("添加博客异常：" + e);
            response.setStatus(ResponseConstants.FAIL_CODE);
        }
        return response;
    }
}
