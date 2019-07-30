package com.bin.kong.security.server.service.blog.impl;

import com.bin.kong.security.dao.mapper.blog.BlogInfoMapper;
import com.bin.kong.security.model.blog.entity.BlogInfo;
import com.bin.kong.security.server.service.blog.IBlogInfoService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

@Service
public class BlogInfoServiceImpl implements IBlogInfoService {
    @Resource
    private BlogInfoMapper mapper;

    @Override
    public Integer insert(BlogInfo info) {
        return mapper.insertSelective(info);
    }

    @Override
    public List<BlogInfo> selectList(BlogInfo info) {
        return mapper.selectList(info);
    }

    @Override
    public Integer update(BlogInfo info) {
        return mapper.updateByPrimaryKeySelective(info);
    }
}
