package com.bin.kong.security.dao.mapper.user;

import com.bin.kong.security.model.user.entity.UserInfo;

import java.util.List;

public interface UserInfoMapper {
    int deleteByPrimaryKey(Integer id);

    int insertSelective(UserInfo record);

    UserInfo selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(UserInfo record);

    List<UserInfo> selectList(UserInfo info);
}
