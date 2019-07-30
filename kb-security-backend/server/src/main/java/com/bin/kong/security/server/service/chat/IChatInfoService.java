package com.bin.kong.security.server.service.chat;

import com.bin.kong.security.model.chat.entity.ChatInfo;
import com.bin.kong.security.model.chat.search.ChatInfoSearch;

import java.util.List;

public interface IChatInfoService {
    Integer insert(ChatInfo info);

    List<ChatInfo> searchList(ChatInfoSearch search);


    List<ChatInfo> searchListNoSafe(ChatInfoSearch search);

    Integer searchCount(ChatInfoSearch search);

    Integer chatPraise(Integer id);

    ChatInfo get(Integer id);

    Integer delete(Integer id);
}
