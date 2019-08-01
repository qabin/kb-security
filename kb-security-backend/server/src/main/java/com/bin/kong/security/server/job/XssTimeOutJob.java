package com.bin.kong.security.server.job;

import com.bin.kong.security.core.enums.XssStatusEnum;
import com.bin.kong.security.model.xss.entity.XssInfo;
import com.bin.kong.security.model.xss.search.XssInfoSearch;
import com.bin.kong.security.server.service.xss.IXssInfoService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.util.CollectionUtils;

import javax.annotation.Resource;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

@Component
@Slf4j
public class XssTimeOutJob {

    @Resource
    private IXssInfoService xssInfoService;

    @Async("threadExecutor")
    @Scheduled(cron = "0/5 * * * * ?")
    public void exec() {
        //超时5秒
        try {
            Calendar calendar = Calendar.getInstance();
            calendar.add(Calendar.SECOND, -5);
            Date closed_time = calendar.getTime();

            List<XssInfo> xssInfoList = xssInfoService.searchList(XssInfoSearch.builder()
                    .status(XssStatusEnum.CONNECTING.getCode())
                    .build());

            if (!CollectionUtils.isEmpty(xssInfoList)) {
                //超时处理逻辑
                for (XssInfo xssInfo : xssInfoList) {
                    if (xssInfo.getUpdate_time().getTime() < closed_time.getTime()) {
                        xssInfoService.update(XssInfo.builder()
                                .id(xssInfo.getId())
                                .update_time(new Date())
                                .status(XssStatusEnum.CLOSED.getCode())
                                .build());
                    }

                }
            }
        } catch (Exception e) {
            log.error("执行XssTimeOutJob异常：" + e);
        }
    }
}
