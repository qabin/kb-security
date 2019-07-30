package com.bin.kong.security.server.service.user;

import com.bin.kong.security.model.user.entity.UserInfo;

import java.util.List;

public interface IUserInfoService {
    Integer insert(UserInfo userInfo);

    List<UserInfo> selectList(UserInfo userInfo);

    UserInfo findByName(String name);

    UserInfo get(Integer id);
}
