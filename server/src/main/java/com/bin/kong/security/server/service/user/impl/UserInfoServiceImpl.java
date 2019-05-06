package com.bin.kong.security.server.service.user.impl;

import com.bin.kong.security.dao.mapper.user.UserInfoMapper;
import com.bin.kong.security.model.user.entity.UserInfo;
import com.bin.kong.security.server.service.user.IUserInfoService;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import javax.annotation.Resource;
import java.util.List;

@Service
public class UserInfoServiceImpl implements IUserInfoService {
    @Resource
    private UserInfoMapper mapper;

    @Override
    public Integer insert(UserInfo userInfo) {
        return mapper.insertSelective(userInfo);
    }

    @Override
    public List<UserInfo> selectList(UserInfo userInfo) {
        return mapper.selectList(userInfo);
    }


    @Override
    public UserInfo findByName(String name) {
        List<UserInfo> userInfoList = mapper.selectList(UserInfo.builder()
                .login_name(name).build());
        if (CollectionUtils.isEmpty(userInfoList)) {
            return UserInfo.builder().build();
        } else {
            return userInfoList.get(0);
        }

    }

    @Override
    public UserInfo get(Integer id) {
        return mapper.selectByPrimaryKey(id);
    }
}
