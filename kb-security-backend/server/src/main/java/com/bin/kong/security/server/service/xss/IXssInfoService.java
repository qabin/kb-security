package com.bin.kong.security.server.service.xss;

import com.bin.kong.security.model.xss.entity.XssInfo;
import com.bin.kong.security.model.xss.search.XssInfoSearch;

import java.util.List;

public interface IXssInfoService {
    Integer insert(XssInfo info);

    XssInfo get(Integer id);

    List<XssInfo> searchList(XssInfoSearch search);

    Integer searchCount(XssInfoSearch search);

    Integer update(XssInfo info);
}
