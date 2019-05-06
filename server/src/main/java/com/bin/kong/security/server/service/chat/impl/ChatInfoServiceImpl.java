package com.bin.kong.security.server.service.chat.impl;

import com.bin.kong.security.dao.mapper.chat.ChatInfoMapper;
import com.bin.kong.security.model.chat.entity.ChatInfo;
import com.bin.kong.security.model.chat.search.ChatInfoSearch;
import com.bin.kong.security.server.service.chat.IChatInfoService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

@Slf4j
@Service
public class ChatInfoServiceImpl implements IChatInfoService {
    @Resource
    private ChatInfoMapper mapper;

    @Override
    public Integer insert(ChatInfo info) {
        return mapper.insertSelective(info);
    }

    @Override
    public List<ChatInfo> searchList(ChatInfoSearch search) {
        return mapper.searchList(search);
    }

    @Override
    public List<ChatInfo> searchListNoSafe(ChatInfoSearch search) {
        return mapper.searchListNoSafe(search);
    }

    @Override
    public Integer searchCount(ChatInfoSearch search) {
        return mapper.searchCount(search);
    }

    @Override
    public Integer chatPraise(Integer id) {
        return mapper.chatPraise(id);
    }

    @Override
    public ChatInfo get(Integer id) {
        return mapper.selectByPrimaryKey(id);
    }

    @Override
    public Integer delete(Integer id) {
        return mapper.deleteByPrimaryKey(id);
    }
}
