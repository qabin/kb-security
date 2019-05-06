package com.bin.kong.security.dao.mapper.chat;

import com.bin.kong.security.model.chat.entity.ChatInfo;
import com.bin.kong.security.model.chat.search.ChatInfoSearch;

import java.util.List;

public interface ChatInfoMapper {
    int deleteByPrimaryKey(Integer id);


    int insertSelective(ChatInfo record);

    ChatInfo selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(ChatInfo record);


    List<ChatInfo> searchList(ChatInfoSearch search);

    List<ChatInfo> searchListNoSafe(ChatInfoSearch search);


    Integer searchCount(ChatInfoSearch search);

    Integer chatPraise(Integer id);
}
