package com.bin.kong.security.dao.mapper.blog;

import com.bin.kong.security.model.blog.entity.BlogInfo;

import java.util.List;

public interface BlogInfoMapper {
    int deleteByPrimaryKey(Integer id);


    int insertSelective(BlogInfo record);

    BlogInfo selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(BlogInfo record);

    List<BlogInfo> selectList(BlogInfo info);
}
