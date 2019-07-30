package com.bin.kong.security.dao.mapper.xss;

import com.bin.kong.security.model.xss.entity.XssInfo;
import com.bin.kong.security.model.xss.search.XssInfoSearch;

import java.util.List;

public interface XssInfoMapper {
    int deleteByPrimaryKey(Integer id);


    int insertSelective(XssInfo record);

    XssInfo selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(XssInfo record);

    List<XssInfo> searchList(XssInfoSearch search);

    Integer searchCount(XssInfoSearch search);

}
