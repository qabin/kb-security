package com.bin.kong.security.server.service.blog;

import com.bin.kong.security.model.blog.entity.BlogInfo;

import java.util.List;

public interface IBlogInfoService {
    Integer insert(BlogInfo info);

    List<BlogInfo> selectList(BlogInfo info);

    Integer update(BlogInfo info);

}
